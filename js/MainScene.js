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

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', function (pointer, gameObject) {
            if (gameObject.x > window.innerWidth * 0.75) {
                gameObject.destroy();
            } else if (gameObject.x < window.innerWidth * 0.25) {
                gameObject.destroy();
            } else {
                gameObject.x = window.innerWidth / 2;
                gameObject.y = window.innerHeight / 2;
            }
        });
    }

    update() {
        // Game loop logic here
    }
}

export default MainScene;
