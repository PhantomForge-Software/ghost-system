class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.score = 0;
        this.totalCards = 8;
        this.cardsSwiped = 0;
        this.results = []; // Toegevoegd om de resultaten van elke kaart bij te houden
    }

    create() {
        // Groep voor kaarten aanmaken
        this.cards = this.add.group();

        // Dynamische kaartgrootte op basis van schermgrootte
        let cardWidth = window.innerWidth > 768 ? 300 : 150;
        let cardHeight = window.innerHeight > 768 ? 400 : 200;

        // Kaart afbeeldingen definiëren
        let cardImages = [
            'deepfake_1', 'deepfake_2', 'deepfake_3', 'deepfake_4', 'deepfake_5', 'deepfake_6', 'deepfake_7', 'deepfake_8',
            'normal_1', 'normal_2', 'normal_3', 'normal_4', 'normal_5', 'normal_6', 'normal_7', 'normal_8'
        ];

        // Willekeurige volgorde maken
        let shuffledImages = Phaser.Utils.Array.Shuffle(cardImages.slice()).slice(0, this.totalCards);

        // Groene en rode zone (voor swipe richting)
        this.greenZone = this.add.rectangle(this.scale.width * 0.9, this.scale.height / 2, 50, this.scale.height, 0x00ff00, 0.5).setOrigin(0.5);
        this.redZone = this.add.rectangle(this.scale.width * 0.1, this.scale.height / 2, 50, this.scale.height, 0xff0000, 0.5).setOrigin(0.5);

        // Kaarten maken
        shuffledImages.forEach((cardImage) => {
            let card = this.add.image(this.scale.width / 2, this.scale.height / 2, cardImage)
                .setDisplaySize(cardWidth, cardHeight)
                .setInteractive();

            // Kaarttype bepalen op basis van de naam
            card.cardType = cardImage.includes('deepfake') ? 'deepfake' : 'real';

            // Kaart draggable maken
            this.input.setDraggable(card);
            this.cards.add(card);
        });

        // Drag event - tijdens het slepen
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;

            // Licht kantelen voor een realistisch effect
            gameObject.angle = (dragX - this.scale.width / 2) * 0.1;
        });

        // Drag event - loslaten
        this.input.on('dragend', (pointer, gameObject) => {
            if (gameObject.x > this.scale.width * 0.7) {
                // Rechts geswipet → "real"
                this.handleSwipe(gameObject, 'real');
            } else if (gameObject.x < this.scale.width * 0.3) {
                // Links geswipet → "deepfake"
                this.handleSwipe(gameObject, 'deepfake');
            } else {
                // Terug naar het midden als niet genoeg geswipet
                this.resetCard(gameObject);
            }
        });
    }

    handleSwipe(card, guess) {
        // Resultaten bijhouden (goed of fout)
        let isCorrect = (guess === card.cardType); // Is de gok juist?
        this.results.push({ image: card.texture.key, guess: guess, correct: isCorrect }); // Opslaan of de gok juist was

        // Verhoog de score als de gok correct was
        if (isCorrect) {
            this.score++;
        }

        // Toon visuele feedback met de afbeelding en of het goed of fout was
        this.showFeedback(card, guess, isCorrect);

        this.cardsSwiped++;

        // Snelle animatie om kaart weg te swipen
        this.tweens.add({
            targets: card,
            x: guess === 'real' ? this.scale.width + 200 : -200,
            alpha: 0,
            duration: 200, // Animatie korter gemaakt
            onComplete: () => {
                card.destroy(); // Kaart verwijderen
                if (this.cardsSwiped === this.totalCards) {
                    this.showResult(); // Resultaat tonen als alle kaarten weg zijn
                }
            }
        });
    }

    resetCard(card) {
        // Kaart animeren terug naar het midden
        this.tweens.add({
            targets: card,
            x: this.scale.width / 2,
            y: this.scale.height / 2,
            angle: 0,
            duration: 150
        });
    }

    showFeedback(card, guess, isCorrect) {
        // Voeg feedback toe onder de afbeelding
        const feedbackText = `${guess.toUpperCase()} - ${isCorrect ? 'Correct' : 'Fout'}`;
        
        let feedbackImage = this.add.image(card.x, card.y + 150, card.texture.key)
            .setDisplaySize(100, 100)  // Kleine afbeelding van de kaart
            .setAlpha(0.7); // Doorzichtige afbeelding voor visuele feedback

        let feedbackLabel = this.add.text(card.x, card.y + 200, feedbackText, {
            font: '20px Arial',
            fill: isCorrect ? '#00ff00' : '#ff0000'
        }).setOrigin(0.5);

        // Animatie van feedback verschuiven naar beneden
        this.tweens.add({
            targets: [feedbackImage, feedbackLabel],
            y: card.y + 250,
            duration: 500,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                feedbackImage.destroy();
                feedbackLabel.destroy();
            }
        });
    }

    showResult() {
        // Resultaat berekenen en tonen
        const accuracy = ((this.score / this.totalCards) * 100).toFixed(1);

        let resultHTML = `
            <h3>Resultaat:</h3>
            <p>Score: ${this.score}/${this.totalCards} (${accuracy}%)</p>
            <p>Kans om gescamd te worden: ${100 - accuracy}%</p>
            <h4>Details van je antwoorden:</h4>
            <ul>
        `;

        // Toon details van elke kaart (goed/fout en afbeelding)
        this.results.forEach(result => {
            resultHTML += `
                <li>
                    <img src="${result.image}.jpg" alt="${result.image}" width="100">
                    <span>${result.guess} - ${result.correct ? 'Correct' : 'Fout'}</span>
                </li>
            `;
        });

        resultHTML += `</ul>
            <button id="refresh-btn" class="btn btn-primary mt-3">Opnieuw proberen</button>
        `;

        document.getElementById('result').innerHTML = resultHTML;

        // Knop event listener voor refresh
        document.getElementById('refresh-btn').addEventListener('click', () => {
            location.reload();
            //this.scene.restart(); // Scene herstarten
        });

        // Overgebleven kaarten verwijderen
        this.cards.children.iterate((card) => {
            card.destroy();
        });
    }
}

export default MainScene;
