import aysnc from "./components/aysnc.js"
import instance from "./components/singleton.js"
import title from "./components/app/titleComponent.js"
import levelSelect from "./components/app/levelSelectComponent.js"
import problemAnswer from "./components/app/problemAnswerComponent.js"
import finish from "./components/app/finishComponent.js"

/**
 * 実行クラス
 */
class App {

    /**コンストラクタ */
    constructor() {

        //非同期で初期化処理
        this.#initAsync();

        // 選択肢の初期化
        this.#initOptions();

        //表示の設定
        instance.checkApplicationState();
    }

    /**非同期での初期化 */
    async #initAsync() {

        //非同期でファイルのパスデータの取得
        await aysnc.loadJsonDataAsync(instance.dataFilePath).then(res => instance.setFilePathList = res);

        //名前のデータを取り出す
        await aysnc.loadJsonDataAsync(instance.nameDataFilePath).then(res => instance.setNameDataList = res)
    }

    /** 選択肢の初期化,生成 */
    #initOptions = () => {

        // 親を生成
        const problemAnswer = document.querySelector(".problemAnswer");
        const options = problemAnswer.querySelector(".options");

        // 指定した回数文forを回して親に子を配置する
        for (let i = 0; i < instance.getOptionsNum; i++) {

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

        //選択支を非表示にする
        options.style.display = "none"
    }

    /**実行 */
    run = () =>
        this.#components.forEach(component => component.update())

    /**読み込むデータの配列 */
    #components = [
        title,
        levelSelect,
        problemAnswer,
        finish
    ];
}

/** 実行アプリケーションをインスタンス化*/
const app = new App();

/**実行 */
app.run();
