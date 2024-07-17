import consts from '../consts/consts'

export default class TransitionScene extends Phaser.Scene {
    private leftDoor: Phaser.GameObjects.Image
    private rightDoor: Phaser.GameObjects.Image

    constructor() {
        super('transition')
    }

    public preload(): void {}
    public create(): void {
        this.leftDoor = this.add.image(-consts.GAME_WIDTH, 0, 'door').setOrigin(0)
        this.rightDoor = this.add.image(consts.GAME_WIDTH, 0, 'door').setOrigin(0)
    }

    public doTransition(): void {
        this.add.tween({
            targets: this.leftDoor,
            x: -consts.GAME_WIDTH / 2,
            duration: 600,
            ease: Phaser.Math.Easing.Expo.In,
            onComplete: () => {
                this.add.tween({
                    targets: this.leftDoor,
                    x: -2000,
                    delay: 300,
                    duration: 600,
                    ease: Phaser.Math.Easing.Expo.In,
                })
            },
        })

        this.add.tween({
            targets: this.rightDoor,
            x: consts.GAME_WIDTH / 2,
            duration: 600,
            ease: Phaser.Math.Easing.Expo.In,
            onComplete: () => {
                this.add.tween({
                    targets: this.rightDoor,
                    x: 2000,
                    delay: 300,
                    duration: 600,
                    ease: Phaser.Math.Easing.Expo.In,
                })
            },
        })
    }
}
