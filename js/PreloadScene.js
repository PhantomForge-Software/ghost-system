class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Load assets here
    }

    create() {
        this.scene.start('MainScene');
    }
}

export default PreloadScene;
