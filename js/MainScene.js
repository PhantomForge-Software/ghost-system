class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.cards = this.add.group();
        for (let i = 0; i < 100; i++) {
            let card = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, 300, 400, 0x6666ff);
            card.setInteractive();
            this.input.setDraggable(card);
            this.cards.add(card);
        }

        // Create hitbox indicators closer to the cards
        this.leftHitbox = this.add.rectangle(this.scale.width * 0.1, this.scale.height / 2, this.scale.width * 0.5, this.scale.height, 0xff0000, 0.5).setOrigin(0.5, 0.5);
        this.rightHitbox = this.add.rectangle(this.scale.width * 0.9, this.scale.height / 2, this.scale.width * 0.5, this.scale.height, 0x00ff00, 0.5).setOrigin(0.5, 0.5);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', function (pointer, gameObject) {
            if (gameObject.x > this.scale.width * 0.8) {
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
            }
        }, this);
    }

    update() {
        // Game loop logic here
    }
}

export default MainScene;
