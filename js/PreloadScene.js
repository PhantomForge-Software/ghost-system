class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.image('deepfake_1', '../assets/img/DF_1.png');
        this.load.image('deepfake_2', '../assets/img/DF_2.png');
        this.load.image('deepfake_3', '../assets/img/DF_3.png');
        this.load.image('deepfake_4', '../assets/img/DF_4.png');
        this.load.image('deepfake_5', '../assets/img/DF_5.png');
        this.load.image('deepfake_6', '../assets/img/DF_6.png');
        this.load.image('normal_1', '../assets/img/R_1.png');
        this.load.image('normal_2', '../assets/img/R_2.jpeg');
        this.load.image('normal_3', '../assets/img/R_3.png');
        this.load.image('normal_4', '../assets/img/R_4.jpeg');
        this.load.image('normal_5', '../assets/img/R_5.jpeg');
        this.load.image('normal_6', '../assets/img/R_6.png');
        this.load.image('normal_7', '../assets/img/R_7.jpeg');
        this.load.image('normal_8', '../assets/img/R_8.jpeg');
    }

    create() {
        this.scene.start('MainScene');
    }
}

export default PreloadScene;
