class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.image('DF_1', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_1.png');
        this.load.image('DF_2', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_2.png');
        this.load.image('DF_3', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_3.png');
        this.load.image('DF_4', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_4.png');
        this.load.image('DF_5', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_5.png');
        this.load.image('DF_6', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_6.png');
        this.load.image('DF_7', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_7.png');
        this.load.image('DF_8', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_8.png');
        this.load.image('R_1', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_1.png');
        this.load.image('R_2', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_2.jpeg');
        this.load.image('R_3', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_3.png');
        this.load.image('R_4', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_4.jpeg');
        this.load.image('R_5', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_5.jpeg');
        this.load.image('R_6', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_6.png');
        this.load.image('R_7', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_7.jpeg');
        this.load.image('R_8', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_8.jpeg');
    }

    create() {
        this.scene.start('MainScene');
    }
}

export default PreloadScene;
