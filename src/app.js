const applicationState = Object.freeze({
    title: "title",
    levelSelect: "levelSelect",
    problemAnswer: "problemAnswer",
    finish: "finish",
});

/**
 * 実行クラス
 */
class App {

    #state = applicationState.title;

    /**高校数学の情報を格納する変数 */
    static hsJsonDatas = [];

    /**大学数学の情報を格納する変数 */
    static univJsonDatas = [];

    /**コンストラクタ */
    constructor() {
        //jsonファイルのすべてのリンクを取得
        this.#loadDataFile();

        //現在の状態を取得反映
        this.checkState();

    }

    /**実行中の処理 */
    run() {
        switch (this.#state) {
            case applicationState.title:
                this.titleUpdate();
                break;
            case applicationState.levelSelect:
                this.levelSelectUpdate();
                break;
            case applicationState.problemAnswer:
                this.problemAnswerUpdate();
                break;
            case applicationState.finish:
                this.finishUpdate();
                break;

        }
    }

    /**状態のチェック */
    checkState() {
        // アプリケーション内のsection要素をすべて取得
        const appSections = Array.from(document.querySelectorAll("section"));

        /**stateと不一致するオブジェクトを取得 */
        const disActiveStates = appSections.filter(item => item.className != this.#state);

        /**一致しないオブジェクトは非表示にする */
        disActiveStates.forEach(disActiveState => {
            disActiveState.style.display = "none";
        })
    }

    /**タイトル画面の更新処理 */
    titleUpdate() {
    }

    /**難易度の選択更新処理 */
    levelSelectUpdate(){

    }

    /**問題回答処理の更新処理 */
    problemAnswerUpdate(){

    }

    /**終了時の更新処理 */
    finishUpdate(){

    }

    /**
     * データを読み込む非同期関数
     */
    async #loadDataFile() {
        try {
            const fileLists = await fetch("../data/dataFiles.json");
            const urlLists = await fileLists.json();
            console.log(urlLists);
        } catch (err) {
            console.error(`json取得エラー : ${err}`);
        }
    }


}

const app = new App();
app.run();