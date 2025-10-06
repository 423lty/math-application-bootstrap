export default class posedProblem {

    /**問題の情報を取得する */
    get getChoices(): number[] { return this.#choices; }

    /**jsonの情報を設定する */
    set setChoices(choices: number[]) { this.#choices = choices; }

    /**jsonの情報を取得する */
    get getQuestion(): string { return this.#question; }

    /**jsonの情報を設定する */
    set setQuestion(question: string) { this.#question = question; }

    /**大門の数の情報を取得する */
    get getExplanation(): string { return this.#explanation; }

    /**大門の情報を設定する */
    set setExplanation(explanation: string) { this.#explanation = explanation; }

    /**小門の情報を取得する */
    get getAnswer(): number { return this.#answer; }

    /**小門の情報を設定する */
    set setAnswer(answer: number) { this.#answer = answer; }

    /**選択しを格納する変数 */
    #choices: number[] = [];

    /**問題の内容を格納する変数 */
    #question: string = "";

    /**解説の内容を格納する変数 */
    #explanation: string = "";

    /**回答を格納する変数 */
    #answer: number = 0;
}