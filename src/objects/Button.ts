export default class Button extends Phaser.GameObjects.Container {
    private texture: Phaser.GameObjects.Image
    private text: Phaser.GameObjects.Text
    private isDown: boolean

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, text: string) {
        super(scene, x, y)
        this.isDown = false
        this.texture = this.scene.add.image(0, 0, texture).setInteractive()
        this.text = this.scene.add.text(0, 0, text)

        this.add(this.texture)
        this.add(this.text)

        this.scene.add.existing(this)

        this.texture.on('pointerover', () => {
            this.isDown = false
        })
        this.texture.on('pointerout', () => {
            this.isDown = false
        })
        this.texture.on('pointerdown', () => {
            this.isDown = true
        })
    }

    public onOver(callback: () => void): void {
        this.texture.on('pointerover', callback)
    }

    public onOut(callback: () => void): void {
        this.texture.on('pointerout', callback)
    }

    public onDown(callback: () => void): void {
        this.texture.on('pointerdown', callback)
    }

    public onUp(callback: () => void): void {
        this.texture.on('pointerup', callback)
    }

    public onClick(callback: () => void): void {
        this.texture.on('pointerup', () => {
            if (this.isDown) {
                this.isDown = false
                callback()
            }
        })
    }
}
