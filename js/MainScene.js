class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.cards = this.add.group();
        let cardWidth = window.innerWidth > 768 ? 300 : 100;
        let cardHeight = window.innerHeight > 768 ? 400 : 150;
        let cardImages = ['deepfake_1', 'deepfake_2', 'deepfake_3', 'deepfake_4', 'deepfake_5', 'deepfake_6', 'normal_1', 'normal_2', 'normal_3', 'normal_4', 'normal_5', 'normal_6', 'normal_7', 'normal_8'];
        let shuffledImages = Phaser.Utils.Array.Shuffle(cardImages.slice());

        for (let i = 0; i < 100; i++) {
            if (shuffledImages.length === 0) {
                shuffledImages = Phaser.Utils.Array.Shuffle(cardImages.slice());
            }
            let cardImage = shuffledImages.pop();
            let card = this.add.image(this.scale.width / 2, this.scale.height / 2, cardImage).setDisplaySize(cardWidth, cardHeight);
            card.setInteractive();
            this.input.setDraggable(card);
            this.cards.add(card);
        }

        this.leftHitbox = this.add.rectangle(this.scale.width * 0.1, this.scale.height / 2, this.scale.width * 0.5, this.scale.height, 0xff0000, 0.5).setOrigin(0.5, 0.5);
        this.rightHitbox = this.add.rectangle(this.scale.width * 0.9, this.scale.height / 2, this.scale.width * 0.5, this.scale.height, 0x00ff00, 0.5).setOrigin(0.5, 0.5);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.angle = (dragX - this.scale.width / 2) * 0.1;
        }, this);

        this.input.on('dragend', function (pointer, gameObject) {
            if (gameObject.x > this.scale.width * 0.5) {
                this.tweens.add({
                    targets: gameObject,
                    alpha: 0,
                    duration: 500,
                    onComplete: function () {
                        gameObject.destroy();
                    }
                });
            } else if (gameObject.x < this.scale.width * 0.5) {
                this.tweens.add({
                    targets: gameObject,
                    alpha: 0,
                    duration: 500,
                    onComplete: function () {
                        gameObject.destroy();
                    }
                });
            } else {
                gameObject.x = this.scale.width / 2;
                gameObject.y = this.scale.height / 2;
                gameObject.angle = 0;
            }
        }, this);
    }

    update() {
    }
}

export default MainScene;
