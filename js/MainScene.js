class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.score = 0;
        this.totalCards = 10;
        this.cardsSwiped = 0;
        this.results = [];
    }

    create() {
        this.cards = this.add.group();

        // ✅ Dynamische grootte voor kaarten, behoud beeldverhouding
        let cardWidth = Math.min(this.scale.width * 0.7, 300);
        let cardHeight = cardWidth * 1.5;

        // ✅ Kaart afbeeldingen definities
        let cardImages = [
            'DF_1', 'DF_2', 'DF_3', 'DF_4', 'DF_5', 'DF_6', 'DF_7', 'DF_8',
            'R_1', 'R_2', 'R_3', 'R_4', 'R_5', 'R_6', 'R_7', 'R_8'
        ];
        let shuffledImages = Phaser.Utils.Array.Shuffle(cardImages).slice(0, this.totalCards);

        shuffledImages.forEach((cardImage) => {
            let card = this.add.image(this.scale.width / 2, this.scale.height / 2, cardImage)
                .setDisplaySize(cardWidth, cardHeight)
                .setInteractive();

            card.cardType = cardImage.includes('DF') ? 'DF' : 'real';

            this.input.setDraggable(card);
            this.cards.add(card);
        });

        // ✅ "Echt" en "Nep" knoppen onderaan maken
        // Knop voor "echt" (nu links)
        this.fakeButton = this.add.text(this.scale.width * 0.8, this.scale.height - 50, 'Echt', {
            fontSize: '32px',
            backgroundColor: '#00ff00',
            color: '#000',
            padding: { x: 20, y: 10 },
            borderRadius: 10
        }).setOrigin(0.5).setInteractive();

        // Knop voor "nep" (nu rechts)
        this.realButton = this.add.text(this.scale.width * 0.2, this.scale.height - 50, 'Nep', {
            fontSize: '32px',
            backgroundColor: '#ff0000',
            color: '#000',
            padding: { x: 20, y: 10 },
            borderRadius: 10
        }).setOrigin(0.5).setInteractive();



        // ✅ Swipe detectie en knop vergroting
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.angle = (dragX - this.scale.width / 2) * 0.1;

            // Knop vergroten afhankelijk van swipe richting
            if (dragX > this.scale.width * 0.7) {
                this.fakeButton.setScale(1.5);
                this.realButton.setScale(1);
            } else if (dragX < this.scale.width * 0.3) {
                this.realButton.setScale(1.5);
                this.fakeButton.setScale(1);
            } else {
                this.fakeButton.setScale(1);
                this.realButton.setScale(1);
            }
        });

        // ✅ Swipe verwerking bij loslaten
        this.input.on('dragend', (pointer, gameObject) => {
            if (gameObject.x > this.scale.width * 0.7) {
                this.handleSwipe(gameObject, 'real');
            } else if (gameObject.x < this.scale.width * 0.3) {
                this.handleSwipe(gameObject, 'DF');
            } else {
                this.resetCard(gameObject);
            }

            // Terug naar originele grootte
            this.fakeButton.setScale(1);
            this.realButton.setScale(1);
        });
    }

    handleSwipe(card, guess) {
        let isCorrect = (guess === card.cardType);
        this.results.push({ 
            image: card.texture.key, 
            guess, 
            correct: isCorrect, 
            type: card.cardType 
        });

        if (isCorrect) this.score++;
        this.cardsSwiped++;

        // ✅ Snelle animatie om kaart weg te swipen
        this.tweens.add({
            targets: card,
            x: guess === 'real' ? this.scale.width + 200 : -200,
            alpha: 0,
            duration: 200,
            onComplete: () => {
                card.destroy();
                if (this.cardsSwiped === this.totalCards) this.showResult();
            }
        });
    }

    resetCard(card) {
        this.tweens.add({
            targets: card,
            x: this.scale.width / 2,
            y: this.scale.height / 2,
            angle: 0,
            duration: 150
        });
    }

    showResult() {
        const accuracy = ((this.score / this.totalCards) * 100).toFixed(1);

        let resultHTML = `
            <h3>Resultaat:</h3>
            <p>Score: ${this.score}/${this.totalCards} (${accuracy}%)</p>
            <p>Kans om gescamd te worden: ${100 - accuracy}%</p>
            <h4>Details van je antwoorden:</h4>
            <ul>
        `;

        this.results.forEach(result => {
            resultHTML += `
                <li>
                    <img src="https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/${result.image}.png" alt="${result.image}" width="100">
                    <span>${result.guess} - ${result.correct ? 'Correct' : 'Fout'}</span>
                </li>
            `;
        });

        resultHTML += `</ul>
            <button id="refresh-btn" class="btn btn-primary mt-3">Opnieuw proberen</button>
        `;

        document.getElementById('result').innerHTML = resultHTML;

        document.getElementById('refresh-btn').addEventListener('click', () => {
            location.reload();
        });

        this.cards.children.iterate((card) => {
            card.destroy();
        });
    }
}

export default MainScene;
