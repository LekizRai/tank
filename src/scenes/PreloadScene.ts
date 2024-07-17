export default class PreloadScene extends Phaser.Scene {
    private loadingBar: Phaser.GameObjects.Graphics
    private progressBar: Phaser.GameObjects.Graphics

    constructor() {
        super('preload')
    }

    preload(): void {
        // set the background, create the loading and progress bar
        this.createLoadingGraphics()

        // pass value to change the loading bar fill
        this.load.on(
            'progress',
            (value: number) => {
                this.progressBar.clear()
                this.progressBar.fillStyle(0x88e453, 1)
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                )
            },
            this
        )

        // delete bar graphics, when loading complete
        this.load.on(
            'complete',
            () => {
                this.progressBar.destroy()
                this.loadingBar.destroy()
            },
            this
        )

        // load our package
        this.load.pack('preload', './assets/pack.json', 'preload')
        this.load.image('gun-1', './assets/images/gun-1.png')
        this.load.image('hull-1', './assets/images/hull-1.png')
        this.load.image('track-1', './assets/images/track-1.png')
        this.load.image('bullet-1', './assets/images/bullet-1.png')
        this.load.image('pause', './assets/images/pause.png')
        this.load.image('replay', './assets/images/replay.png')
        this.load.image('menu', './assets/images/menu.png')
        this.load.image('board', './assets/images/board-1.png')
        this.load.image('button', './assets/images/button.png')
    }

    public create(): void {
        this.scene.start('menu')
    }

    private createLoadingGraphics(): void {
        this.loadingBar = this.add.graphics()
        this.loadingBar.fillStyle(0xffffff, 1)
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        )
        this.progressBar = this.add.graphics()
    }
}
