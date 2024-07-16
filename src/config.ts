import PreloadScene from './scenes/PreloadScene'
import GameplayScene from './scenes/GameplayScene'
import MenuScene from './scenes/MenuScene'
import PauseScene from './scenes/PauseScene'

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Tank',
    url: 'https://github.com/digitsensitive/phaser3-typescript',
    version: '0.0.1',
    width: 1200,
    height: 1600,
    zoom: 0.6,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game',
    scene: [PreloadScene, MenuScene, GameplayScene, PauseScene],
    input: {
        keyboard: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
        },
    },
    backgroundColor: '#000000',
    render: { antialias: true },
}

export default gameConfig
