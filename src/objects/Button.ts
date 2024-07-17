export default class Button extends Phaser.GameObjects.Container {
    private texture: Phaser.GameObjects.Image
    private text: Phaser.GameObjects.BitmapText
    private isDown: boolean

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        text?: string,
        textSize?: number
    ) {
        super(scene, x, y)
        this.isDown = false
        this.texture = this.scene.add.image(0, 0, texture).setInteractive()
        this.text = this.scene.add.bitmapText(0, 0, 'font', '', 70, 1)

        this.add(this.texture)
        this.add(this.text)

        if (text) {
            if (textSize) {
                this.setText(text, textSize)
            } else {
                this.setText(text)
            }
        }

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

    public setText(text: string, textSize?: number): void {
        this.text.setText(text)
        if (textSize) {
            this.text.setFontSize(textSize)
        }
        this.text.setX(-this.text.width / 2)
        this.text.setY(-this.text.height / 2.5)
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
