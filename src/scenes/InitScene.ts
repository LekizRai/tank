export default class InitScene extends Phaser.Scene {
    constructor() {
        super('init')
    }

    public preload(): void {
        this.load.image("background", "./assets/images/bg.png")
        this.load.image('door', './assets/images/iron-wall.png')
    }

    public create(): void {
        // this.scene.launch('transition').bringToTop()
        this.scene.start('preload')
        this.scene.launch('transition')
    }
}
