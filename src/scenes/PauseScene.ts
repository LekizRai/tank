import consts from '../consts/consts'
import Button from '../objects/Button'
import PauseUI from '../ui/PauseUI'
import GameplayScene from './GameplayScene'

export default class PauseScene extends Phaser.Scene {
    private pauseUI: PauseUI
    // private settingUI: SettingUI

    constructor() {
        super('pause')
    }

    public preload(): void {}
    public create(): void {
        this.pauseUI = new PauseUI(this, 0, 0)
    }
    public update(time: number, timeInterval: number): void {}
}
