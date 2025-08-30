// import { JsonHandler } from "./components/jsonHandler.js"
import { ProblemCollection } from "./components/problemCollection.js"
// import { ProblemManager } from "./components/problemManager.js"
// import { TitleManager } from "./components/titleManager.js";
// import { ProblemAnserManager } from "./components/problemAnswerManager.js";
// import { FinishManager } from "./components/FinishManager.js";

/**アプリケーションの状態 */
export const applicationState = Object.freeze({
    noSelect: "",
    title: "title",
    levelSelect: "levelSelect",
    problemAnswer: "problemAnswer",
    finish: "finish",
});

/**数学のレベル */
export const applicationMathLevel = Object.freeze({
    noSelect: "",
    highSchool: "hs",
    university: "univ"
})


/**
 * 実行クラス
 */
export class App {

    /**コンストラクタ */
    constructor() {

        //非同期で初期化処理
        this.#initAsync();

        // 最初の画面
        this.#checkApplicationState();
    }

    /**非同期での初期化 */
    async #initAsync() {

        //非同期でデータの取得
        await this.loadJsonDataAsync(App.dataFilePath).then(res => {
            App.filePathList.push(res);
        });
    }

    /**実行 */
    run() {

        switch (App.state) {
            case applicationState.title:
                break;
        }
        this.titleUpdate()

        this.#checkApplicationState();

    }


    /**タイトル画面の更新処理 */
    titleUpdate() {

        // タイトルのオブジェクトを全て取得
        const titleSection = document.querySelector(".title");
        const titleSectionObjects = titleSection.querySelectorAll("div");

        //どちらの数学をするか選択
        titleSectionObjects.forEach(object => {
            object.addEventListener("click", () => {
                //レベルの選択
                App.mathLevel = object.className;

                //状態の遷移
                App.state = applicationState.levelSelect;

                //レベルレベル
                const levelSelectTitleText = document.querySelector(".levelSelect").querySelector("h2");

                // levelSelectの表示タイトルの変更
                if (App.mathLevel == applicationMathLevel.highSchool)
                    // 名前の変更
                    levelSelectTitleText.textContent = "高校数学";

                else if (App.mathLevel == applicationMathLevel.university)
                    levelSelectTitleText.textContent = "大学数学";

                // 更新
                this.#checkApplicationState();
            })
        });
    }


    /**難易度の選択更新処理 */
    levelSelectUpdate() {

        //レベルが選択されていない場合処理をしない
        if (App.mathLevel == "")
            return;

        // 戻るボタンとランダムにするボタンを取得
        const backButton = document.querySelector(".back");
        const randomButton = document.querySelector(".random");
        const levelSelectTitleText = document.querySelector(".levelSelect");

        // 動的にAreaとcategoryを作成する
        // this.#initAreaAndCategory("");

        // 戻る処理
        backButton.addEventListener("click", () => {

            //タイトルにする　
            App.state = applicationState.title;
            App.mathLevel = applicationState.noSelect;
            levelSelectTitleText.querySelector("h2").textContent = "levelSelect";

            //更新
            // this.checkState();
        });

        // ランダムボタンをクリックしたときの処理
        randomButton.addEventListener("click", () => {

            // true/falseの切り替え
            App.isRandomProblem = !App.isRandomProblem;

            // ランダムボタンの縁の色の変更するためのクラス取得
            const levelSelectSidebarElement = levelSelectTitleText.querySelectorAll("li");
            const levelSelectRandomButton = levelSelectSidebarElement[1];

            //ランダムの縁の変更
            levelSelectRandomButton.classList.toggle("btn-outline-secondary");
            levelSelectRandomButton.classList.toggle("btn-outline-success");

            console.log("問題生成ランダム:" + App.isRandomProblem);
        })
    }

    /**
     * jsonのデータを読み込むデータ
     * @param {読み込むファイルのパス} filePath 
     * @returns jsonデータ
     */
    async loadJsonDataAsync(filePath) {
        try {
            //データの取得
            const json = await fetch(filePath);

            //レスポンスを取得
            const res = await json.json();

            //取得したデータの返却
            return res;
        }
        catch (err) {
            console.error("json Error" + err);
        }
    }

    static async getJsonParseObject(json) {
        return json.then(res => res).catch(err => {
            console.error(err);
        })
    }


    /**アプリケーションのすべての状態を管理する */
    #checkApplicationState() {

        // アプリケーション内のsection要素をすべて取得
        const appSections = Array.from(document.querySelectorAll("section"));

        //全てを一回表示状態にする
        appSections.forEach(section => {
            section.style.display = "block";
        })

        /**stateと不一致するオブジェクトを取得 */
        const disActiveStates = appSections.filter(item => item.className != App.state);

        /**一致しないオブジェクトは非表示にする */
        disActiveStates.forEach(disActiveState => {
            disActiveState.style.display = "none";
        })

        console.log("現在表示state:" + App.state);
    }


    /**データのすべてのファイルパス */
    static dataFilePath = "../data/dataFiles.json";

    /**アプリケーションの状態 */
    static state = applicationState.title;

    static mathLevel = applicationMathLevel.NoSelect;

    /**問題をランダムにするかのフラグ */
    static isShuffleOrder = false;

    /**ファイルのパスを格納する配列 */
    static filePathList = [];

    /**高校数学の情報を格納する変数 */
    #hs = new ProblemCollection();

    /**大学数学の情報を格納する変数 */
    #univ = new ProblemCollection();

}

const app = new App();
app.run();


// this.titleManager.update();


// /**問題を管理するマネージャー */
// titleManager = new TitleManager();

// /**問題を管理するための */
// problemManager = new ProblemManager();

// /**問題解答の管理 */
// problemAnswerManager = new ProblemAnserManager();

// finish = new FinishManager();