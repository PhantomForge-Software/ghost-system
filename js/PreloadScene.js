class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.image('deepfake_1', '..\\assets\\img\\deepfake_1.png');
        this.load.image('deepfake_2', '..\\assets\\img\\deepfake_2.png');
        this.load.image('deepfake_3', '..\\assets\\img\\deepfake_3.png');
        this.load.image('deepfake_4', '..\\assets\\img\\deepfake_4.png');
        this.load.image('deepfake_5', '..\\assets\\img\\deepfake_5.png');
        this.load.image('deepfake_6', '..\\assets\\img\\deepfake_6.png');
        this.load.image('normal_1', '..\\assets\\img\\normal_1.png');
        this.load.image('normal_2', '..\\assets\\img\\normal_2.png');

    }

    create() {
        this.scene.start('MainScene');
    }
}

export default PreloadScene;
