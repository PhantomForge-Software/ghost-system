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
            'DF_1', 'DF_2', 'DF_3', 'DF_4', 'DF_5', 'DF_6', 'DF_7', 'DF_8', 'DF_9', 'DF_10', 'DF_11', 'DF_12', 'DF_13', 'DF_14', 'DF_15',
            'R_1', 'R_2', 'R_3', 'R_4', 'R_5', 'R_6', 'R_7', 'R_8', 'R_9', 'R_10', 'R_11', 'R_12', 'R_13', 'R_14','R_15'
        ];
        let shuffledImages = Phaser.Utils.Array.Shuffle(cardImages).slice(0, this.totalCards);

        shuffledImages.forEach((cardImage) => {
            let card = this.add.image(this.scale.width / 2, this.scale.height / 2, cardImage)
                .setDisplaySize(cardWidth, cardHeight)
                .setInteractive();

            // Kaarttype bepalen op basis van de naam
            card.cardType = cardImage.includes('DF') ? 'DeepFake' : 'echt';

            this.input.setDraggable(card);
            this.cards.add(card);
        });

        // ✅ "Echt" en "Nep" knoppen onderaan maken
        // Knop voor "echt"
        this.fakeButton = this.add.text(this.scale.width * 0.8, this.scale.height - 50, 'Echt', {
            fontSize: '32px',
            backgroundColor: '#00ff00',
            color: '#000',
            padding: { x: 20, y: 10 },
            borderRadius: 10
        }).setOrigin(0.5).setInteractive();

        // Knop voor "nep"
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
                // Rechts geswipet → "real"
                this.handleSwipe(gameObject, 'echt');
            } else if (gameObject.x < this.scale.width * 0.3) {
                // Links geswipet → "DF"
                this.handleSwipe(gameObject, 'DeepFake');
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

         // ✅ Feedback tonen na swipe
        this.showFeedback(card, guess, isCorrect);

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

    showFeedback(card, guess, isCorrect) {
        // ✅ Combineer tekst en icoon in één string
        const feedbackText = `${isCorrect ? '✅' : '❌'}`;
        
        // ✅ Posities in het midden van het scherm
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
    
        // ✅ Kleine afbeelding van de kaart voor feedback (geplaatst in het midden)
        let feedbackImage = this.add.image(centerX, centerY - 50, card.texture.key)
            .setDisplaySize(100, 100) // Kleinere versie van de kaart
            .setAlpha(0.7); // Doorzichtig
        
        // ✅ Feedbacktekst met correcte styling (geplaatst in het midden)
        let feedbackLabel = this.add.text(centerX, centerY + 50, feedbackText, {
            font: '32px Arial',
            fill: isCorrect ? '#00ff00' : '#ff0000', // Groen of rood afhankelijk van correctheid
            align: 'center'
        }).setOrigin(0.5);
    
        // ✅ Tijdelijke feedback (verdwijnt na 1 seconde)
        this.time.delayedCall(800, () => {
            feedbackImage.destroy();
            feedbackLabel.destroy();
        });
    }
    

    showResult() {
        const accuracy = ((this.score / this.totalCards) * 100).toFixed(1);
        const scamChance = 100 - accuracy;

        let resultHTML = `
            <h3>Resultaat:</h3>
            <p>Score: ${this.score}/${this.totalCards} (${accuracy}%)</p>
            <p id="scam-chance" class="${scamChance > 40 ? 'scam-chance-animation' : scamChance >= 30 ? 'warning-chance-animation' : 'safe-chance-animation'}" style="color: ${scamChance > 40 ? 'red' : scamChance >= 30 ? 'yellow' : 'green'}; font-size: 24px;">Kans om gescamd te worden: ${scamChance}%</p>
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

        if (scamChance > 40) {
            const scamChanceElement = document.getElementById('scam-chance');
            scamChanceElement.classList.add('scam-chance-animation');

            // Add red lights on the sides
            const leftLight = document.createElement('div');
            leftLight.className = 'red-light left-light';
            document.body.appendChild(leftLight);

            const rightLight = document.createElement('div');
            rightLight.className = 'red-light right-light';
            document.body.appendChild(rightLight);
        } else if (scamChance >= 30) {
            const scamChanceElement = document.getElementById('scam-chance');
            scamChanceElement.classList.add('warning-chance-animation');

            // Add yellow lights on the sides
            const leftLight = document.createElement('div');
            leftLight.className = 'yellow-light left-light';
            document.body.appendChild(leftLight);

            const rightLight = document.createElement('div');
            rightLight.className = 'yellow-light right-light';
            document.body.appendChild(rightLight);
        } else {
            const scamChanceElement = document.getElementById('scam-chance');
            scamChanceElement.classList.add('safe-chance-animation');

            // Add green lights on the sides
            const leftLight = document.createElement('div');
            leftLight.className = 'green-light left-light';
            document.body.appendChild(leftLight);

            const rightLight = document.createElement('div');
            rightLight.className = 'green-light right-light';
            document.body.appendChild(rightLight);
        }

        document.getElementById('refresh-btn').addEventListener('click', () => {
            location.reload();
        });

        this.cards.children.iterate((card) => {
            card.destroy();
        });
    }
}

export default MainScene;
