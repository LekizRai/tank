import consts from '../consts/consts'
import GameEventEmitter from '../objects/GameEventEmitter'
import ScoreManager from '../objects/ScoreManager'
import PauseUI from '../ui/PauseUI'

export default class PauseScene extends Phaser.Scene {
    private pauseUI: PauseUI
    private currentScore: Phaser.GameObjects.BitmapText
    private eventEmitter: GameEventEmitter

    constructor() {
        super('pause')
    }

    public preload(): void {}
    public create(): void {
        this.pauseUI = new PauseUI(this, 0, 0)
        ScoreManager.resetCurrentScore()
        this.currentScore = this.add.bitmapText(
            consts.GAME_WIDTH / 2,
            50,
            'font',
            'SCORE: ' + String(ScoreManager.getCurrentScore()),
            50,
            1
        )
        this.eventEmitter = GameEventEmitter.getInstance()
        this.eventEmitter.on('enemydead', () => {
            this.currentScore.setText('SCORE: ' + String(ScoreManager.getCurrentScore()))
        })
    }
    public update(time: number, timeInterval: number): void {}
}
