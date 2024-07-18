export default class GameEventEmitter extends Phaser.Events.EventEmitter {
    private static instance: GameEventEmitter

    private constructor() {
        super()
    }

    public static getInstance(): GameEventEmitter {
        if (!this.instance) {
            this.instance = new GameEventEmitter()
        }
        return this.instance
    }
}
