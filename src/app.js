import { ProblemCollection } from "./components/problemCollection.js"

/**アプリケーションの状態 */
export const applicationState = Object.freeze({
    noSelect: "noSelect",
    title: "title",
    levelSelect: "levelSelect",
    problemAnswer: "problemAnswer",
    finish: "finish",
});

/**数学のレベル */
export const applicationMathLevel = Object.freeze({
    noSelect: "noSelect",
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

        // 選択肢の初期化
        this.#initOptions()
    }

    /**非同期での初期化 */
    async #initAsync() {

        //非同期でデータの取得
        await this.loadJsonDataAsync(App.dataFilePath).then(res => {
            App.filePathList.push(res);
            // App.filePathList.push(res);
        });

        await this.loadJsonDataAsync(App.nameDataFilePath).then(res => {
            App.nameDataList = res;
        })
    }


    /**
     * 選択肢の初期化,生成
     */
    #initOptions() {

        // 親を生成
        const problemAnswer = document.querySelector(".problemAnswer");
        const options = problemAnswer.querySelector(".options");

        // 指定した回数文forを回して親に子を配置する
        for (let i = 0; i < App.optionsNum; i++) {

            // 選択肢の生成
            const newOption = document.createElement("div");

            // クラスを付与
            newOption.className = "option btn btn-outline-secondary m-2";

            // 内部の設定
            const inner = document.createElement("div");

            // 選択肢専用のクラス
            inner.className = "choices";

            //初期のテキスト
            inner.textContent = `選択肢:${i + 1}`;

            // 内部要素を選択肢クラスに配置
            newOption.appendChild(inner);

            //親に子をつける
            options.appendChild(newOption);
        }
    }


    /**
     * 取得したものによってデータの持ちを変える
     * @param {problemCollectionの要素} problemCollection 
     */
    #initAreaAndCategory(problemCollection) {


        if (problemCollection == null)
            return;

        //配置する箱を取得
        const container = document.querySelector(".selectAreaAndCategory");

        //データの抽出
        const jsonsData = problemCollection.getJsonData;
        const categoryArray = problemCollection.getCategoryArray;
        const nameArray = problemCollection.getNameDataArray;

        console.log(categoryArray)
        // 一つずつ取り出して格納
        jsonsData.forEach(jsons => {
            for (const category in categoryArray) {

                //長さと名前の取得
                const length = categoryArray[category];
                const areaName = nameArray[category].name;

                //liのタグを動的に作成
                const inner = document.createElement("li");

                //最初のクラスを割り当てる
                inner.className = "btn btn-outline-secondary m-2 fs-3";

                //データを格納するdivタグを作成
                const area = document.createElement("div");

                //クラスの割り当て
                area.className = "area";

                //テキストの配置
                // area.textContent = `範囲:${i + 1}`;
                area.textContent = areaName;

                //範囲を入れる
                inner.appendChild(area);

                // //カテゴリーの生成
                // const categorys = document.createElement("div");

                // //クラス名の設定
                // categorys.className = "categorys";

                console.log(jsons[category])
                console.log(length)
                console.log(areaName)

                container.appendChild(inner);
            }

        });

        //問題の数だけareaを付けるf
        // for (let i = 0; i < problemCollection.getAreaNum; i++) {

        //     //liのタグを動的に作成
        //     const inner = document.createElement("li");

        //     //最初のクラスを割り当てる
        //     inner.className = "btn btn-outline-secondary m-2 fs-3";

        //     //データを格納するdivタグを作成
        //     const area = document.createElement("div");

        //     //クラスの割り当て
        //     area.className = "area";

        //     //テキストの配置
        //     area.textContent = `範囲:${i + 1}`;

        //     //範囲を入れる
        //     inner.appendChild(area);

        //     //カテゴリーの生成
        //     const categorys = document.createElement("div");

        //     //クラス名の設定
        //     categorys.className = "categorys";

        //     //カテゴリーの数だけ回す

        //     container.appendChild(inner);
        // }
    }

    /**実行 */
    run() {

        //それぞれの処理の更新
        this.titleUpdate();
        this.levelSelectUpdate();

        //表示するオブジェクトの処理
        // this.#checkApplicationState();

    }


    /**タイトル画面の更新処理 */
    titleUpdate() {

        // タイトルのオブジェクトを全て取得
        const titleSection = document.querySelector(".title");
        const titleSectionObjects = titleSection.querySelectorAll("div div");


        //どちらの数学をするか選択
        titleSectionObjects.forEach(object => {
            object.addEventListener("click", () => {

                //レベルの選択
                this.#mathLevel = object.className;

                //状態の遷移
                this.#state = applicationState.levelSelect;

                //レベルのテキスト
                const levelSelect = document.querySelector(".levelSelect");

                // levelSelectの表示タイトルの変更
                const levelSelectText = levelSelect.querySelector("h2");
                levelSelectText.textContent = object.textContent;

                //クラスの付与
                const levelSelectNav = levelSelect.querySelector("nav");
                levelSelectNav.className = object.className;

                //problemCollectionを動的に確保して初期化
                const problemCollection = new ProblemCollection();

                //jsonのデータを抽出
                const json = App.filePathList.map(obj =>
                    obj[levelSelectNav.className]
                ).filter(Boolean);

                //データの長さを取得(大門)
                const jsonAreaLength = Object.keys(json[0]).length;

                //小門の数を取得 keyとともに格納
                const categoryArray = {};
                json.forEach(area => {
                    for (const category in area)
                        categoryArray[category] = Object.keys(area[category]).length;
                })

                //名前のデータ
                const nameDataArray = App.nameDataList[levelSelectNav.className];

                //抽出したデータを格納
                problemCollection.setJsonData = json;

                //データの格納
                problemCollection.setAreaNum = jsonAreaLength;

                //小門の大きさをkeyとともに格納
                problemCollection.setCategoryArray = categoryArray;

                //名前などを格納
                problemCollection.setNameDataArray = nameDataArray;

                //データを格納する
                this.#setProblemCollection(levelSelectNav.className, problemCollection);

                //stateの状態を変更
                this.#state = applicationState.levelSelect;

                // 動的にAreaとcategoryを作成する
                this.#initAreaAndCategory(problemCollection);
                // 更新
                // this.#checkApplicationState();
            })
        });
    }


    /**難易度の選択更新処理 */
    levelSelectUpdate() {

        //レベルが選択されていない場合処理をしない
        if (this.#mathLevel == applicationMathLevel.noSelect)
            return;

        // 戻るボタンとランダムにするボタンを取得
        const levelSelect = document.querySelector(".levelSelect");
        const targetClassName = levelSelect.querySelector("nav").className;
        const backButton = levelSelect.querySelector(".back");
        const randomButton = levelSelect.querySelector(".random");

        console.log(targetClassName)

        // 戻る処理
        backButton.addEventListener("click", () => {

            //タイトルにする　
            this.#state = applicationState.title;
            this.#mathLevel = applicationState.noSelect;
            levelSelect.querySelector("h2").textContent = "levelSelect";
            console.clear();
            //更新
            // this.#checkApplicationState();
        });

        // ランダムボタンをクリックしたときの処理
        randomButton.addEventListener("click", () => {

            // true/falseの切り替え
            App.isShuffleOrder = !App.isShuffleOrder;

            // ランダムボタンの縁の色の変更するためのクラス取得
            const levelSelectSidebarElement = levelSelect.querySelectorAll("li");
            const levelSelectRandomButton = levelSelectSidebarElement[1];

            //ランダムの縁の変更
            levelSelectRandomButton.classList.toggle("btn-outline-secondary");
            levelSelectRandomButton.classList.toggle("btn-outline-success");
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
        const disActiveStates = appSections.filter(item => item.className != this.#state);

        /**一致しないオブジェクトは非表示にする */
        disActiveStates.forEach(disActiveState => {
            disActiveState.style.display = "none";
        })

        console.log("現在表示state:" + this.#state);
    }

    /**
     * 問題を格納するオブジェクトを取得するメソッド
     * @param {*} className 
     * @returns 指定した問題を格納するメソッドを返却
     */
    #getProblemCollection(className) {
        if (className == applicationMathLevel.highSchool)
            return this.#hs;
        else if (className == applicationMathLevel.university)
            return this.#univ;
        return new ProblemCollection();
    }

    /**
     * 指定したオブジェクトにデータを設定する
     * @param {データを格納する対象} className 
     * @param {格納するデータ} setObject 
     */
    #setProblemCollection(className, setObject) {
        if (className == applicationMathLevel.highSchool)
            this.#hs = setObject;
        else if (className == applicationMathLevel.university)
            this.#univ = setObject;
    }


    /**データのすべてのファイルパス */
    static dataFilePath = "../data/problemDataFiles.json";
    static nameDataFilePath = "../data/nameDataFiles.json";

    /**アプリケーションの状態 */
    #state = applicationState.title;

    /**数学のレベル */
    #mathLevel = applicationMathLevel.NoSelect;

    /**問題をランダムにするかのフラグ */
    static isShuffleOrder = false;

    /**ファイルのパスを格納する配列 */
    static filePathList = [];

    /**全ての名前を格納するリスト型配列 */
    static nameDataList = [];

    /**選択しの数 */
    static optionsNum = 4;

    /**高校数学の情報を格納する変数 */
    #hs = new ProblemCollection();

    /**大学数学の情報を格納する変数 */
    #univ = new ProblemCollection();

}

const app = new App();
app.run();

// import { JsonHandler } from "./components/jsonHandler.js"
// import { ProblemManager } from "./components/problemManager.js"
// import { TitleManager } from "./components/titleManager.js";
// import { ProblemAnserManager } from "./components/problemAnswerManager.js";
// import { FinishManager } from "./components/FinishManager.js";

// this.titleManager.update();


// /**問題を管理するマネージャー */
// titleManager = new TitleManager();

// /**問題を管理するための */
// problemManager = new ProblemManager();

// /**問題解答の管理 */
// problemAnswerManager = new ProblemAnserManager();

// finish = new FinishManager();