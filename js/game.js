import PreloadScene from './PreloadScene.js';
import MainScene from './MainScene.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [PreloadScene, MainScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'game-container'
};

const game = new Phaser.Game(config);
