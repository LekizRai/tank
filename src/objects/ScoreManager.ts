export default class ScoreManager {
    private static currentScore: number = 0
    private static highScore: number = 0
    private constructor() {}
    public static addScore(score: number): void {
        this.currentScore += score
    }

    public static updateHighScore(): void {
        if (this.highScore < this.currentScore) {
            this.highScore = this.currentScore
        }
        // window.localStorage.setItem('high-score', String(this.highScore))
    }

    public static getCurrentScore(): number {
        return this.currentScore
    }

    public static getHighScore(): number {
        return this.highScore
    }

    public static resetCurrentScore(): void {
        this.currentScore = 0
    }

    public static reset(): void {
        this.resetCurrentScore()
        this.highScore = 0
    }
}
