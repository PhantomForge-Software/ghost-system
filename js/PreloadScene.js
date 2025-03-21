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
        this.load.image('DF_9', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_9.png');
        this.load.image('DF_10', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_10.png');
        this.load.image('DF_11', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_11.png');
        this.load.image('DF_12', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_12.png');
        this.load.image('DF_13', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_13.png');
        this.load.image('DF_14', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_14.png');
        this.load.image('DF_15', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/DF_15.png');
        this.load.image('R_1', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_1.png');
        this.load.image('R_2', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_2.png');
        this.load.image('R_3', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_3.png');
        this.load.image('R_4', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_4.png');
        this.load.image('R_5', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_5.png');
        this.load.image('R_6', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_6.png');
        this.load.image('R_7', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_7.png');
        this.load.image('R_8', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_8.png');
        this.load.image('R_9', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_9.png');
        this.load.image('R_10', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_10.png');
        this.load.image('R_11', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_11.png');
        this.load.image('R_12', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_12.png');
        this.load.image('R_13', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_13.png');
        this.load.image('R_14', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_14.png');
        this.load.image('R_15', 'https://raw.githubusercontent.com/PhantomForge-Software/liefde-liegt/main/assets/img/R_15.png');
    }

    create() {
        this.scene.start('MainScene');
    }
}

export default PreloadScene;
