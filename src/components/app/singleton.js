import { ProblemCollection } from "../problemCollection.js"
import { posedProblem } from "../posedProblem.js"

class singletonAppObject {

    /**singletonAppのインスタンスを保持 */
    static #instance = null

    constructor() {
        if (singletonAppObject.#instance)
            return singletonAppObject.#instance
        singletonAppObject.#instance = this;
    }

    /**シングルトンのオブジェクトを取得 */
    get getInstance() {
        /**インスタンスを実行されていない場合インスタンス */
        if (singletonAppObject.#instance === null)
            singletonAppObject.#instance = new singletonAppObject();

        return singletonAppObject.#instance;
    }

    /**
      * 問題を格納するオブジェクトを取得するメソッド
      * @param {*} className 
      * @returns 指定した問題を格納するメソッドを返却
      */
    getProblemCollection = (className) => this.#problemCollections[className] ??= new ProblemCollection()

    /**
     * 指定したオブジェクトにデータを設定する
     * @param {データを格納する対象} className 
     * @param {格納するデータ} setObject 
     */
    setProblemCollection(className, setObject) {
        if (className in this.#problemCollections)
            this.#problemCollections[className] = setObject;
    }

    /**アプリケーションのすべての状態を管理する */
    checkApplicationState() {

        // アプリケーション内のsection要素をすべて取得
        const appSections = Array.from(document.querySelectorAll("section"));

        //全てを一回表示状態にする
        appSections.forEach(section => {
            section.style.display = "block";
        })

        /**stateと不一致するオブジェクトを取得 */
        const disActiveStates = appSections.filter(item => item.className != this.#state);

        /**一致しないオブジェクトは非表示にする */
        disActiveStates.forEach(disActiveState => {
            disActiveState.style.display = "none";
        })

        console.log("現在表示state:" + this.#state);
    }

    /**アプリの状態を管理するgetter */
    get getApplicationState() {
        Object.freeze({
            noSelect: "noSelect",
            title: "title",
            levelSelect: "levelSelect",
            problemAnswer: "problemAnswer",
            finish: "finish",
        });
    }

    /**アプリの数学のレベルを管理するオブジェクト */
    get getApplicationMathLevel() {
        Object.freeze({
            noSelect: "noSelect",
            highSchool: "hs",
            university: "univ"
        })
    }

    /**アプリケーションの状態 初期状態をtitleにする*/
    #state = applicationState.title;

    /**数学のレベル */
    #mathLevel = applicationMathLevel.NoSelect;

    /**問題をランダムにするかのフラグ */
    #isShuffleOrder = false;

    /**出題する問題の格納配列 */
    #posedProblemList = [];

    /**問題の正答を管理する場所 */
    #posedAnswer = -1;

    /**解説を管理する変数 */
    #explanation = "";

    /**ファイルのパスを格納する配列 */
    #filePathList = [];

    /**全ての名前を格納するリスト型配列 */
    #nameDataList = [];

    /**問題回答時に最初にボタンをクリックしたかどうか */
    #isFirstProblemAnswerButtonClicked = false;

    /**情報を格納するコレクション */
    #problemCollections = {
        [applicationMathLevel.highSchool]: new ProblemCollection(),
        [applicationMathLevel.university]: new ProblemCollection()
    }

    /**アプリケーションの状態を取得する */
    get getState() { return this.#state; }

    /**アプリケーションの状態を設定する */
    set setState(state) { this.#state = state; }

    /**数学のレベルを取得する */
    get getMathLevel() { return this.#mathLevel; }

    /**数学のレベルを設定する */
    set setMathLevel(mathLevel) { this.#mathLevel = mathLevel; }

    /**問題をランダムにするかのフラグを取得する */
    get getIsShuffleOrder() { return this.#isShuffleOrder; }

    /**問題をランダムにするかのフラグを設定する */
    set setIsShuffleOrder(isShuffleOrder) { this.#isShuffleOrder = isShuffleOrder; }

    /**出題する問題の格納配列を取得する */
    get getPosedProblemList() { return this.#posedProblemList; }

    /**出題する問題の格納配列を設定する */
    set setPosedProblemList(posedProblemList) { this.#posedProblemList = posedProblemList; }

    /**出題する問題の格納配列を取得する */
    get getPosedAnswer() { return this.#posedAnswer; }

    /**出題する問題の格納配列を設定する */
    set setPosedAnswer(posedAnswer) { this.#posedAnswer = posedAnswer; }

    /**アプリケーションの状態を取得する */
    get getExplanation() { return this.#explanation; }

    /**アプリケーションの状態を設定する */
    set setExplanation(explanation) { this.#explanation = explanation; }

    /**アプリケーションの状態を取得する */
    get getFilePathList() { return this.#filePathList; }

    /**アプリケーションの状態を設定する */
    set setFilePathList(filePathList) { this.#filePathList = filePathList; }

    /**アプリケーションの状態を取得する */
    get getNameDataList() { return this.#nameDataList; }

    /**アプリケーションの状態を設定する */
    set setNameDataList(nameDataList) { this.#nameDataList = nameDataList; }

    /**アプリケーションの状態を取得する */
    get getIsFirstProblemAnswerButtonClicked() { return this.#isFirstProblemAnswerButtonClicked; }

    /**アプリケーションの状態を設定する */
    set setIsFirstProblemAnswerButtonClicked(isFirstProblemAnswerButtonClicked) { this.#isFirstProblemAnswerButtonClicked = isFirstProblemAnswerButtonClicked; }

    /**データのすべてのファイルパス */
    get dataFilePath() { return "../data/problemDataFiles.json" }
    get nameDataFilePath() { return "../data/nameDataFiles.json" }

    /**選択しの数 */
    get getOptionsNum() { return 4 }

    /**解く問題数 */
    get getSolveProblemNum() { return 10 }

    /**正答率 */
    get getAnswerRate() { return 0 }

    /**正答率の補正 */
    get getAnswerRateCorrect() { return 100 }

    /**正解の動画のパスを保管する変数 */
    get getCorrectAnswerVideoPath() { return "../video/seikai.mp4" }

    /**不正解の動画のパスを保管する変数 */
    get getIncorrectAnswerVideoPath() { return "../video/fuseikai.mp4" }
}

export default new singletonAppObject();