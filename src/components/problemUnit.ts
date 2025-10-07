export default interface problemUnit {

    /**選択肢を格納する変数 */
    choices: number[];

    /**問題の内容を格納する変数 */
    question: string;

    /**解説の内容を格納する変数 */
    explanation: string;

    /**回答を格納する変数 */
    answer: number;
}