import createGenericManager from "./genericManager";

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
    createElement<T extends Element>(selector: string, d: ParentNode = document): T {
        //生成
        const element = d.querySelector<T>(selector);

        //生成できなかった場合
        if (element === null) console.log(`error:${selector}`);

        //アサーション演算子をつけて返す
        return element!;
    }

    /**アプリケーションのすべての状態を管理する */
    checkApplicationState(): void {

        // アプリケーション内のsection要素をすべて取得
        const appSections = Array.from(document.querySelectorAll("section"));

        //全てを一回表示状態にする
        appSections.forEach(section => section.style.display = "block")

        /**stateと不一致するオブジェクトを取得 */
        const disActiveStates = appSections.filter(item => item.className != this.state);

        /**一致しないオブジェクトは非表示にする */
        disActiveStates.forEach(disActiveState => disActiveState.style.display = "none")

        //consoleのクリア
        console.clear(), console.log("現在表示state:" + this.state);
    }

    /**アプリケーションの数学のレベル */
    applicationMathLevel = createGenericManager({
        noSelect: "noSelect",
        highSchool: "hs",
        university: "univ"
    } as const);

    /**アプリケーションの状態管理 */
    applicationState = createGenericManager({
        noSelect: "noSelect",
        title: "title",
        levelSelect: "levelSelect",
        problemAnswer: "problemAnswer",
        finish: "finish",
    } as const);

    /**アプリケーションの状態 初期状態をtitleにする*/
    state = createGenericManager<String>(this.applicationState.title);

    /**数学のレベル */
    mathLevel = createGenericManager<String>(this.applicationMathLevel.noSelect);

    /**問題をランダムにするかのフラグ */
    isShuffleOrder = createGenericManager<Boolean>(false);

    /**問題を格納する */
    problemDataFile=createGenericManager();

    /**問題データ全てを格納しているjsonファイル */
    get problemDataFileJsonPath(): string { return "../data/problemDataFiles.json" }

    /**範囲とカテゴリーを格納しているjsonファイル */
    get nameDataJsonFilePath(): string { return "../data/nameDataFiles.json" }

    /**選択肢の数 */
    get getOptionsNum(): number { return 4 }

    /**解く問題数 */
    get getSolveProblemNum(): number { return 10 }

    /**正答率の補正 */
    get getAnswerRateCorrect(): number { return 10 }

    /**正解の動画のパスを保管する変数 */
    get getCorrectAnswerVideoPath(): string { return "../video/seikai.mp4" }

    /**不正解の動画のパスを保管する変数 */
    get getIncorrectAnswerVideoPath(): string { return "../video/fuseikai.mp4" }
}

export default new singletonAppObject();