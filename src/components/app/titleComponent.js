import instance from "./singleton.js"

class titleComponent {

    /**タイトル画面の更新処理 */
    update() {

        // タイトルのオブジェクトを全て取得
        const titleSection = document.querySelector(".title");
        const titleSectionObjects = titleSection.querySelectorAll("div div");

        //どちらの数学をするか選択
        titleSectionObjects.forEach(object => {
            object.addEventListener("click", () => {

                //レベルの選択
                instance.setMathLevel = object.className;

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
                const json = instance.getFilePathList[levelSelectNav.className]

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
                instance.setProblemCollection(levelSelectNav.className, problemCollection);

                //stateの状態を変更
                instance.setState = instance.getApplicationState.levelSelect;

                // 動的にAreaとcategoryを作成する
                this.#initAreaAndCategory(problemCollection);

                // 更新
                instance.checkApplicationState();
            })
        });
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

}

export default new titleComponent();