// import { loadJsonArrayFromURLs } from "./components/loadJsonData"

const applicationState = Object.freeze({
    title: "title",
    levelSelect: "levelSelect",
    problemAnswer: "problemAnswer",
    finish: "finish",
});

const applicationMathLevel = Object.freeze({
    highSchool: "hs",
    university: "univ"
})


/**
 * 実行クラス
 */
class App {

    // 現在の状態
    static state = applicationState.title;

    //問題をランダム出題にするかどうか
    static isRandomProblem = false;

    //数学の難易度
    #mathLevel = "";

    // 回答の選択肢の数
    static optionsNum = 4;

    static jsonDatas = Object;

    /**高校数学の情報を格納する変数 */
    static hsJsonDatas = [];

    /**大学数学の情報を格納する変数 */
    static univJsonDatas = [];

    /**コンストラクタ */
    constructor() {
        //jsonファイルのすべてのリンクを取得
        this.#loadDataFile();

        // 選択肢の個数divタグを生成
        this.#initOptions();

        //現在の状態を取得反映
        // this.checkState();
    }

    /**実行中の処理 */
    run() {

        this.titleUpdate();
        this.levelSelectUpdate();
        this.problemAnswerUpdate();
        this.finishUpdate();
    }

    /**状態のチェック */
    checkState() {
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

    /**タイトル画面の更新処理 */
    titleUpdate() {

        // タイトルのオブジェクトを全て取得
        const titleSection = document.querySelector(".title");
        const titleSectionObjects = titleSection.querySelectorAll("div");

        //どちらの数学をするか選択
        titleSectionObjects.forEach(object => {
            object.addEventListener("click", () => {
                //レベルの選択
                this.#mathLevel = object.className;

                //状態の遷移
                App.state = applicationState.levelSelect;

                //レベルレベル
                const levelSelectTitleText = document.querySelector(".levelSelect").querySelector("h2");

                // levelSelectの表示タイトルの変更
                if (this.#mathLevel == applicationMathLevel.highSchool)
                    levelSelectTitleText.textContent = "高校数学";
                else if (this.#mathLevel == applicationMathLevel.university)
                    levelSelectTitleText.textContent = "大学数学";

                //jsonのデータを取得

                this.#loacTargetData();

                // 更新
                // this.checkState();
            })


        });


    }

    /**難易度の選択更新処理 */
    levelSelectUpdate() {

        // 戻るボタンとランダムにするボタンを取得
        const backButton = document.querySelector(".back");
        const randomButton = document.querySelector(".random");
        const levelSelectTitleText = document.querySelector(".levelSelect");

        // 戻る処理
        backButton.addEventListener("click", () => {

            //タイトルにする　
            App.state = applicationState.title;
            this.#mathLevel = "";
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

    /**問題回答処理の更新処理 */
    problemAnswerUpdate() {

    }

    /**終了時の更新処理 */
    finishUpdate() {

    }

    /**
     * データを読み込む非同期関数
     */
    async #loadDataFile() {
        try {

            //データの一覧を取得
            const fileLists = await fetch("../data/dataFiles.json");

            //json形式にして取得
            const urls = await fileLists.json();

            // オブジェクトを返却する
            App.jsonDatas = urls;

        } catch (err) {
            console.error(`json取得エラー : ${err}`);
        }
    }


    async #loacTargetData() {

        // 何も選択をされていない場合返す
        if (this.#mathLevel == "")
            return;

        //選択した方のデータが格納されている場合返却
        if (this.#mathLevel == applicationMathLevel.highSchool && !App.hsJsonDatas
            || this.#mathLevel == applicationMathLevel.university && !App.univJsonDatas
        ) {
            console.log("データが格納されています")
            return;
        }

        //json形式のobjectを配列に変換
        const jsonDatasArray = Object.entries(App.jsonDatas)

        //jsonの指定された要素以外を取り除く
        const targetJsonDataArray = jsonDatasArray.filter(object => object[0] == this.#mathLevel);

        console.log(targetJsonDataArray);

        if (this.#mathLevel == applicationMathLevel.highSchool) {
            App.hsJsonDatas = targetJsonDataArray;
            console.log(App.hsJsonDatas);
        }

        if (this.#mathLevel == applicationMathLevel.university){
            App.univJsonDatas = targetJsonDataArray;
            console.log(App.univJsonDatas);
        }

        //
    }

    /**
     * 選択肢の初期化,生成
     */
    #initOptions() {
        // 親を生成
        const options = document.querySelector(".options");

        // 指定した回数文forを回して親に子を配置する
        for (let i = 0; i < App.optionsNum; i++) {

            // 選択肢の生成
            const newOption = document.createElement("div");

            // クラスを付与
            newOption.className = "option btn btn-outline-secondary m-2";

            //初期のテキスト
            newOption.textContent = `選択肢:${i + 1}`;

            //親に子をつける
            options.appendChild(newOption);
        }
    }

    #initCategory() {

    }
}

const app = new App();
app.run();