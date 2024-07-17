type GameObjectHaveSize =
    | Phaser.GameObjects.Image
    | Phaser.GameObjects.Sprite
    | Phaser.GameObjects.Text
    | Phaser.GameObjects.Container
    | Phaser.GameObjects.Zone

const utils = {
    alignCenter: (
        obj1: GameObjectHaveSize,
        obj2: GameObjectHaveSize,
        offsetX: number = 0,
        offsetY: number = 0
    ) => {
        Phaser.Display.Align.In.Center(obj1, obj2, offsetX, offsetY)
    },

    alignLeftCenter: (
        obj1: GameObjectHaveSize,
        obj2: GameObjectHaveSize,
        offsetX: number = 0,
        offsetY: number = 0
    ) => {
        let leftGap: number = (obj2.width - obj2.displayWidth) / 2
        leftGap -= (obj1.width - obj1.displayWidth) / 2
        Phaser.Display.Align.In.LeftCenter(obj1, obj2, -Math.floor(leftGap) + offsetX, offsetY)
    },

    alignRightCenter: (
        obj1: GameObjectHaveSize,
        obj2: GameObjectHaveSize,
        offsetX: number = 0,
        offsetY: number = 0
    ) => {
        let rightGap: number = (obj2.width - obj2.displayWidth) / 2
        rightGap -= (obj1.width - obj1.displayWidth) / 2
        Phaser.Display.Align.In.RightCenter(obj1, obj2, -Math.floor(rightGap) + offsetX, offsetY)
    },
    alignTopCenter: (
        obj1: GameObjectHaveSize,
        obj2: GameObjectHaveSize,
        offsetX: number = 0,
        offsetY: number = 0
    ) => {
        let topGap: number = (obj2.height - obj2.displayHeight) / 2
        topGap -= (obj1.height - obj1.displayHeight) / 2
        Phaser.Display.Align.In.TopCenter(obj1, obj2, offsetX, -Math.floor(topGap) + offsetY)
    },
    alignBottomCenter: (
        obj1: GameObjectHaveSize,
        obj2: GameObjectHaveSize,
        offsetX: number = 0,
        offsetY: number = 0
    ) => {
        let bottomGap: number = (obj2.height - obj2.displayHeight) / 2
        bottomGap -= (obj1.height - obj1.displayHeight) / 2
        Phaser.Display.Align.In.BottomCenter(obj1, obj2, offsetX, -Math.floor(bottomGap) + offsetY)
    },
    alignTopLeft: (
        obj1: GameObjectHaveSize,
        obj2: GameObjectHaveSize,
        offsetX: number = 0,
        offsetY: number = 0
    ) => {
        let topGap: number = (obj2.height - obj2.displayHeight) / 2
        topGap -= (obj1.height - obj1.displayHeight) / 2
        let leftGap: number = (obj2.width - obj2.displayWidth) / 2
        leftGap -= (obj1.width - obj1.displayWidth) / 2
        Phaser.Display.Align.In.TopLeft(
            obj1,
            obj2,
            -Math.floor(leftGap) + offsetX,
            -Math.floor(topGap) + offsetY
        )
    },
    alignBottomLeft: (
        obj1: GameObjectHaveSize,
        obj2: GameObjectHaveSize,
        offsetX: number = 0,
        offsetY: number = 0
    ) => {
        let bottomGap: number = (obj2.height - obj2.displayHeight) / 2
        bottomGap -= (obj1.height - obj1.displayHeight) / 2
        let leftGap: number = (obj2.width - obj2.displayWidth) / 2
        leftGap -= (obj1.width - obj1.displayWidth) / 2
        Phaser.Display.Align.In.BottomLeft(
            obj1,
            obj2,
            -Math.floor(leftGap) + offsetX,
            -Math.floor(bottomGap) + offsetY
        )
    },
    alignTopRight: (
        obj1: GameObjectHaveSize,
        obj2: GameObjectHaveSize,
        offsetX: number = 0,
        offsetY: number = 0
    ) => {
        let topGap: number = (obj2.height - obj2.displayHeight) / 2
        topGap -= (obj1.height - obj1.displayHeight) / 2
        let rightGap: number = (obj2.width - obj2.displayWidth) / 2
        rightGap -= (obj1.width - obj1.displayWidth) / 2
        Phaser.Display.Align.In.TopRight(
            obj1,
            obj2,
            -Math.floor(rightGap) + offsetX,
            -Math.floor(topGap) + offsetY
        )
    },
    alignBottomRight: (
        obj1: GameObjectHaveSize,
        obj2: GameObjectHaveSize,
        offsetX: number = 0,
        offsetY: number = 0
    ) => {
        let bottomGap: number = (obj2.height - obj2.displayHeight) / 2
        bottomGap -= (obj1.height - obj1.displayHeight) / 2
        let rightGap: number = (obj2.width - obj2.displayWidth) / 2
        rightGap -= (obj1.width - obj1.displayWidth) / 2
        Phaser.Display.Align.In.BottomRight(
            obj1,
            obj2,
            -Math.floor(rightGap) + offsetX,
            -Math.floor(bottomGap) + offsetY
        )
    },
}

export default utils
