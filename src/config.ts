import PreloadScene from './scenes/PreloadScene'
import GameplayScene from './scenes/GameplayScene'
import MenuScene from './scenes/MenuScene'
import PauseScene from './scenes/PauseScene'
import consts from './consts/consts'
import InitScene from './scenes/InitScene'
import GameoverScene from './scenes/GameoverScene'
import TransitionScene from './scenes/TransitionScene'

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Tank',
    url: 'https://github.com/digitsensitive/phaser3-typescript',
    version: '0.0.1',
    width: consts.GAME_WIDTH,
    height: consts.GAME_HEIGHT,
    zoom: 0.6,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game',
    scene: [InitScene, PreloadScene, MenuScene, GameplayScene, PauseScene, GameoverScene, TransitionScene],
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
