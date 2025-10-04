export default class posedProblem {

    /**コピーコンストラクタ */
    constructor(p) {

        if (p instanceof posedProblem) {
            this.#question = p.getQuestion;
            this.#choices = [...p.getChoices];
            this.#explanation = p.getExplanation;
            this.#answer = p.getAnswer;
        }
    }

    /**問題の情報を取得する */
    get getChoices() { return this.#choices; }

    /**jsonの情報を設定する */
    set setChoices(choices) { this.#choices = choices; }

    /**jsonの情報を取得する */
    get getQuestion() { return this.#question; }

    /**jsonの情報を設定する */
    set setQuestion(question) { this.#question = question; }

    /**大門の数の情報を取得する */
    get getExplanation() { return this.#explanation; }

    /**大門の情報を設定する */
    set setExplanation(explanation) { this.#explanation = explanation; }

    /**小門の情報を取得する */
    get getAnswer() { return this.#answer; }

    /**小門の情報を設定する */
    set setAnswer(answer) { this.#answer = answer; }

    /**選択しを格納する変数 */
    #choices = [];

    /**問題の内容を格納する変数 */
    #question = "";

    /**解説の内容を格納する変数 */
    #explanation = "";

    /**回答を格納する変数 */
    #answer = 0;
}