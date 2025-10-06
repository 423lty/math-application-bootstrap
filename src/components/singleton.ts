import posedProblem from "./Collections/posedProblem.js";
import ProblemCollection from "./Collections/problemCollection.js"

class singletonAppObject {

    /**singletonAppのインスタンスを保持 */
    static #instance: singletonAppObject;

    /**コンストラクタ */
    constructor() {
        if (singletonAppObject.#instance) return singletonAppObject.#instance
        singletonAppObject.#instance = this;
    }

    /**シングルトンのオブジェクトを取得 */
    get getInstance(): singletonAppObject {
        /**インスタンスを実行されていない場合インスタンス */
        if (singletonAppObject.#instance === null)
            singletonAppObject.#instance = new singletonAppObject();

        //オブジェクトのインスタンスを返す
        return singletonAppObject.#instance;
    }

    /**
     * 要素を取得
     * @param selector 
     * @returns 
     */
    getElement<T extends Element>(selector: string, d: ParentNode = document): T {
        const element = d.querySelector<T>(selector);
        if (element === null) console.log(`err:${selector}`);
        return element!;
    }

    /**
      * 問題を格納するオブジェクトを取得するメソッド
      * @param {*} className 
      * @returns 指定した問題を格納するメソッドを返却
      */
    getProblemCollection = (className: string): ProblemCollection => this.#problemCollections[className] ??= new ProblemCollection()

    /**
     * 指定したオブジェクトにデータを設定する
     * @param {データを格納する対象} className 
     * @param {格納するデータ} setObject 
     */
    setProblemCollection(className: string, setObject: ProblemCollection): void {
        if (className in this.#problemCollections)
            this.#problemCollections[className] = setObject;
    }

    /**アプリケーションのすべての状態を管理する */
    checkApplicationState(): void {

        // アプリケーション内のsection要素をすべて取得
        const appSections = Array.from(document.querySelectorAll("section"));

        //全てを一回表示状態にする
        appSections.forEach(section => section.style.display = "block")

        /**stateと不一致するオブジェクトを取得 */
        const disActiveStates = appSections.filter(item => item.className != this.#state);

        /**一致しないオブジェクトは非表示にする */
        disActiveStates.forEach(disActiveState => disActiveState.style.display = "none")

        //consoleのクリア
        console.clear();

        console.log("現在表示state:" + this.#state);
    }

    /**アプリケーションの状態管理 */
    static applicationState = Object.freeze({
        noSelect: "noSelect",
        title: "title",
        levelSelect: "levelSelect",
        problemAnswer: "problemAnswer",
        finish: "finish",
    });

    /**アプリケーションの数学のレベル */
    static applicationMathLevel = Object.freeze({
        noSelect: "noSelect",
        highSchool: "hs",
        university: "univ"
    })

    /**アプリケーションの状態 初期状態をtitleにする*/
    #state: string = singletonAppObject.applicationState.title;

    /**数学のレベル */
    #mathLevel: string = singletonAppObject.applicationMathLevel.noSelect;

    /**問題をランダムにするかのフラグ */
    #isShuffleOrder: boolean = false;

    /**出題する問題の格納配列 */
    #posedProblemList: posedProblem[] = [];

    /**問題の正答を管理する場所 */
    #posedAnswer: number = -1;

    /**解説を管理する変数 */
    #explanation: string = "";

    /**ファイルのパスを格納する配列 */
    #filePathList: string[] = [];

    /**全ての名前を格納するリスト型配列 */
    #nameDataList: string[] = [];

    /**問題回答時に最初にボタンをクリックしたかどうか */
    #isFirstProblemAnswerButtonClicked: boolean = false;

    /**問題の政党率 */
    #answerRate: number = 0;

    /**情報を格納するコレクション */
    #problemCollections: { [key: string]: ProblemCollection } = {
        [singletonAppObject.applicationMathLevel.highSchool]: new ProblemCollection(),
        [singletonAppObject.applicationMathLevel.university]: new ProblemCollection()
    }

    /**アプリの状態を管理するgetter */
    get getApplicationState() { return singletonAppObject.applicationState; }

    /**アプリの数学のレベルを管理するオブジェクト */
    get getApplicationMathLevel() { return singletonAppObject.applicationMathLevel; }

    /**アプリケーションの状態を取得する */
    get getState(): string { return this.#state; }

    /**アプリケーションの状態を設定する */
    set setState(state: string) { this.#state = state; }

    /**数学のレベルを取得する */
    get getMathLevel(): string { return this.#mathLevel; }

    /**数学のレベルを設定する */
    set setMathLevel(mathLevel: string) { this.#mathLevel = mathLevel; }

    /**問題をランダムにするかのフラグを取得する */
    get getIsShuffleOrder(): boolean { return this.#isShuffleOrder; }

    /**問題をランダムにするかのフラグを設定する */
    set setIsShuffleOrder(isShuffleOrder: boolean) { this.#isShuffleOrder = isShuffleOrder; }

    /**出題する問題の格納配列を取得する */
    get getPosedProblemList(): posedProblem[] { return this.#posedProblemList; }

    /**出題する問題の格納配列を設定する */
    set setPosedProblemList(posedProblemList: posedProblem[]) { this.#posedProblemList = posedProblemList; }

    /**出題する問題の格納配列を取得する */
    get getPosedAnswer(): number { return this.#posedAnswer; }

    /**出題する問題の格納配列を設定する */
    set setPosedAnswer(posedAnswer: number) { this.#posedAnswer = posedAnswer; }

    /**アプリケーションの状態を取得する */
    get getExplanation(): string { return this.#explanation; }

    /**アプリケーションの状態を設定する */
    set setExplanation(explanation: string) { this.#explanation = explanation; }

    /**アプリケーションの状態を取得する */
    get getFilePathList(): string[] { return this.#filePathList; }

    /**アプリケーションの状態を設定する */
    set setFilePathList(filePathList: string[]) { this.#filePathList = filePathList; }

    /**アプリケーションの状態を取得する */
    get getNameDataList() { return this.#nameDataList; }

    /**アプリケーションの状態を設定する */
    set setNameDataList(nameDataList: string[]) { this.#nameDataList = nameDataList; }

    /**アプリケーションの状態を取得する */
    get getIsFirstProblemAnswerButtonClicked(): boolean { return this.#isFirstProblemAnswerButtonClicked; }

    /**アプリケーションの状態を設定する */
    set setIsFirstProblemAnswerButtonClicked(isFirstProblemAnswerButtonClicked: boolean) { this.#isFirstProblemAnswerButtonClicked = isFirstProblemAnswerButtonClicked; }

    /**データのすべてのファイルパス */
    get dataFilePath(): string { return "../data/problemDataFiles.json" }
    get nameDataFilePath(): string { return "../data/nameDataFiles.json" }

    /**選択しの数 */
    get getOptionsNum(): number { return 4 }

    /**解く問題数 */
    get getSolveProblemNum(): number { return 10 }

    /**正答率 */
    set setAnswerRate(answerRate: number) { this.#answerRate = answerRate }

    /**正答率 */
    get getAnswerRate(): number { return this.#answerRate }

    /**正答率の補正 */
    get getAnswerRateCorrect(): number { return 10 }

    /**正解の動画のパスを保管する変数 */
    get getCorrectAnswerVideoPath(): string { return "../video/seikai.mp4" }

    /**不正解の動画のパスを保管する変数 */
    get getIncorrectAnswerVideoPath(): string { return "../video/fuseikai.mp4" }
}

export default new singletonAppObject();