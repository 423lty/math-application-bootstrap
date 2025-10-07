import posedProblem from "../../remake/components/Collections/posedProblem.js";
import ProblemCollection from "../../remake/components/Collections/problemCollection.js"
import createGenericManager from "./genericManager.js";
import { MathStructureJson } from "../../remake/components/interface/jsonFilesInterface.js";
import { MathStructure } from "../../remake/components/interface/nameDataInterface.js";
import { QuestionData } from "../../remake/components/interface/problemInterface.js";

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
        console.clear();

        console.log("現在表示state:" + this.state);
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
    state = createGenericManager<String>(singletonAppObject.applicationState.title);

    /**数学のレベル */
    mathLevel = createGenericManager<String>(singletonAppObject.applicationMathLevel.noSelect);

    /**問題をランダムにするかのフラグ */
    isShuffleOrder = createGenericManager<Boolean>(false)

    /**問題データ全てを格納しているjsonファイル */
    get dataFilePath(): string { return "../data/problemDataFiles.json" }
    
    /**範囲とカテゴリーを格納しているjsonファイル */
    get nameDataFilePath(): string { return "../data/nameDataFiles.json" }

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