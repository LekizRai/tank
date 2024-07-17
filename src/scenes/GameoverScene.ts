import GameoverUI from "../ui/GameoverUI"

export default class GameoverScene extends Phaser.Scene {
    private gameoverUI: GameoverUI
    constructor() {
        super('gameover')
    }

    public preload(): void {}
    public create(): void {
        this.gameoverUI = new GameoverUI(this, 0, 0)
    }
}
