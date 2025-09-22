import { ProblemCollection } from "./components/problemCollection.js"
import { posedProblem } from "./components/posedProblem.js"


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
        this.#initOptions();

        //表示の設定
        this.#checkApplicationState();
    }

    /**非同期での初期化 */
    async #initAsync() {

        //非同期でファイルのパスデータの取得
        await this.loadJsonDataAsync(App.dataFilePath).then(res => {
            App.filePathList = res;
        });

        //名前のデータを取り出す
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

        //問題データが入っていない場合スキップ
        if (problemCollection == null)
            return;

        //配置する箱を取得
        const container = document.querySelector(".selectAreaAndCategory");

        //子要素が存在している場合消す
        if (container.hasChildNodes()) {

            //内部に存在している場合削除
            const inners = document.querySelectorAll(".selectAreaButtonInner");

            //一つずつ取り出して削除する
            inners.forEach(inner => container.removeChild(inner));
        }

        //ulの●ぽつを消す
        container.style.listStyle = "none"

        //データの抽出
        const categoryArray = problemCollection.getCategoryArray;
        const nameArray = problemCollection.getNameDataArray;

        // 一つずつ取り出して格納
        for (const category in categoryArray) {

            //長さと名前の取得
            const areaName = nameArray[category].name;
            const categories = nameArray[category].category;

            //liのタグを動的に作成
            const inner = document.createElement("li");

            //area全体のクラスを割り当てる
            inner.className = "selectAreaButtonInner";

            //ボタンのクラス
            const areaButton = document.createElement("div");
            areaButton.className = "btn btn-outline-secondary m-4 fs-3";

            //データを格納するdivタグを作成
            const area = document.createElement("div");

            //クラスの割り当て
            area.className = "area";

            //テキストの配置
            area.textContent = areaName;

            //範囲を入れる
            areaButton.appendChild(area);
            inner.appendChild(areaButton);

            //categoryのボタンを作成
            const categoryButtons = document.createElement("div");

            //categotyの親のクラスを作成
            categoryButtons.className = "selectCategoryButtonInner";

            //小門を非表示にする
            categoryButtons.style.display = "none";

            //カテゴリーを全て取り出して回す
            for (const category in categories) {

                //ボタンの設定
                const button = document.createElement("div");
                button.className = "btn btn-outline-secondary m-2 fs-6";

                //内部の小門を作成
                const innerCategory = document.createElement("div");
                innerCategory.className = "category";
                innerCategory.textContent = categories[category];

                //子に付ける
                button.appendChild(innerCategory);
                categoryButtons.appendChild(button);
            }

            //innerに配置
            inner.appendChild(categoryButtons);

            //liの情報をulタグに配置
            container.appendChild(inner);
        }
    }

    /**実行 */
    run() {

        //それぞれの処理の更新
        this.titleUpdate();
        this.levelSelectUpdate();
        this.problemAnswerUpdate();

        //表示するオブジェクトの処理
        this.#checkApplicationState();

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
                const json = App.filePathList[levelSelectNav.className]

                //データの長さを取得(大門)
                const jsonAreaLength = Object.keys(json).length;

                //小門の数を取得 keyとともに格納
                const categoryArray = {};
                for (const category in json)
                    categoryArray[category] = Object.keys(json[category]).length;

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
                this.#checkApplicationState();
            })
        });
    }

    /**難易度の選択更新処理 */
    levelSelectUpdate() {

        //レベルが選択されていない場合処理をしない
        if (this.#mathLevel === applicationMathLevel.noSelect)
            return;

        // 戻るボタンとランダムにするボタンを取得
        const levelSelect = document.querySelector(".levelSelect");
        const backButton = levelSelect.querySelector(".back");
        const randomButton = levelSelect.querySelector(".random");
        const areaInners = document.querySelector(".selectAreaAndCategory");

        //問題のテーマ
        let problemTheme = "";

        // 戻る処理
        backButton.addEventListener("click", () => {
            //タイトルにする　
            this.#state = applicationState.title;
            this.#mathLevel = applicationState.noSelect;
            levelSelect.querySelector("h2").textContent = "levelSelect";

            //選択しを消す
            const areaParent = document.querySelector(".selectAreaAndCategory");
            const inners = document.querySelectorAll(".selectAreaButtonInner");

            //一つずつ取り出して削除する
            inners.forEach(inner => {
                areaParent.removeChild(inner);
            });

            console.clear();

            //更新
            this.#checkApplicationState();
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

        //選択s
        areaInners.addEventListener("click", (e) => {

            //動的に確保
            const areaInnerElement = e.target.closest(".selectAreaButtonInner");
            const problemAnswerTitle = document.querySelector(".problemAnswer").querySelector(".areaAndCategory");
            const targetClassName = levelSelect.querySelector("nav").className;
            const mathLevel = document.querySelector(".levelSelect").querySelector("h2").textContent;
            const problemCollection = this.#getProblemCollection(targetClassName);
            const areaName = areaInnerElement.querySelector(".area").textContent;

            //ランダムボタンが押されている場合次の処理に進
            if (App.isShuffleOrder === true) {
                //テーマの取得
                problemTheme = areaName;

                //問題の作成
                this.#generateProblem(problemTheme, problemCollection, true);

                //次の変更
                const problemTitle = `${mathLevel} / ${problemTheme}`;
                problemAnswerTitle.textContent = problemTitle;

                //stateの更新
                this.#state = applicationState.problemAnswer;
                this.#checkApplicationState();
            }
            else if (App.isShuffleOrder === false) {

                //ボタンの表示
                const categoryButton = areaInnerElement.querySelector(".selectCategoryButtonInner");

                //詳細の表示画面
                if (categoryButton.style.display === "block")
                    categoryButton.style.display = "none";
                else if (categoryButton.style.display === "none")
                    categoryButton.style.display = "block";

                //innerのオブジェクトを取得
                const categories = categoryButton.querySelectorAll(".category");

                categories.forEach(category => {
                    category.addEventListener("click", () => {

                        //テーマの取得
                        problemTheme = category.textContent;

                        //次の変更
                        const problemTitle = `${mathLevel} / ${areaName} / ${problemTheme}`;
                        problemAnswerTitle.textContent = problemTitle;

                        //問題の作成
                        this.#generateProblem(problemTheme, problemCollection);

                        //stateの設定
                        this.#state = applicationState.problemAnswer;
                        this.#checkApplicationState();
                    })
                });
            }


        })
    }

    /**問題解答更新 */
    problemAnswerUpdate() {
        const problemAnswer = document.querySelector(".problemAnswer");
        const problemText = problemAnswer.querySelector(".problemText");
        const options = problemAnswer.querySelector(".options");
        const choices = options.querySelectorAll(".choices");

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

    /**
     * 問題を生成する処理
     * @param {問題の範囲} problemTheme 
     * @param {問題を格納する変数} problemCollection 
     * @param {シャッフルしているかのフラグ} isShuffleOrder 
     */
    async #generateProblem(problemTheme, problemCollection, isShuffleOrder = false) {

        //問題のjsonを取得
        const jsonData = problemCollection.getJsonData;
        const nameData = problemCollection.getNameDataArray;

        //名前のキー配列
        let nameKey;

        //問題のを管理する
        let problemData;

        // 問題内容を格納
        const problemArray = [];

        //ランダムでする場合
        if (isShuffleOrder === true) {

            // 一致するオブジェクトの取得
            for (const name in nameData) {

                //全部の中で問題の範囲と一致するものを取り出す
                if (nameData[name].name === problemTheme) {

                    // 問題の名前
                    nameKey = nameData[name];

                    // 問題のデータ
                    problemData = jsonData[name];
                }
            }

            //存在のキーのみを最初に保存
            problemArray.push(nameKey.name)

            //一つずつ取り出して問題を取得
            for (const problem in problemData) {
                const json = problemData[problem];
                await this.loadJsonDataAsync(json).then(result => {
                    problemArray.push(result);
                })
            }
        }
        else if (isShuffleOrder === false) {

            //大門を一つ一つ取り出してデータを格納
            for (const area in nameData) {

                //一つの範囲のキーを全て取得
                const keys = Object.keys(nameData[area].category)

                //結果をundefinedかどうかで取得
                const result = keys.find(key => nameData[area].category[key] === problemTheme)

                //結果が存在している場合
                if (result) {

                    //対象のjsonの範囲を取得
                    const targetAreaJsonData = jsonData[area];

                    //問題のデータを設定
                    problemData = targetAreaJsonData[result];

                    //nameを設定
                    problemArray.push(nameData[area].category[result])

                    //データを取得
                    await this.loadJsonDataAsync(problemData).then(res => {
                        problemArray.push(res);
                    })
                }
            }

        }

        //problemCollectionに存在しているデータを全て取得
        const problemCollectionProblemData = problemCollection.getProblemData;

        //指定したオブジェクトが存在しない場合問題内容を格納
        if (!problemCollectionProblemData.includes(problemArray)) {
            //格納するデータのプッシュ
            problemCollectionProblemData.push(problemArray);
            problemCollection.setProblemData = problemCollectionProblemData;
            const levelSelect = document.querySelector(".levelSelect");
            const targetClassName = levelSelect.querySelector("nav").className;
            this.#setProblemCollection(targetClassName, problemCollection);
        }

        console.log(problemArray)
    }

    /**
     * 出題する問題の設定
     * @param {出題する問題の配列データ} problemArray 
     */
    #setPosedProblem(problemArray) {

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

    /**出題する問題の格納配列 */
    static posedProblemList = [];

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