import instance from "../singleton.js"
import posedProblem from "../Collections/posedProblem.js"
import aysnc from "../aysnc.js";

class levelSelectComponent {

    /**難易度の選択更新処理 */
    update() {

        //レベルが選択されていない場合処理をしない
        if (instance.getMathLevel === instance.getApplicationMathLevel.noSelect) return;

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
            instance.setState = instance.getApplicationState.title;
            instance.setMathLevel = instance.getApplicationMathLevel.noSelect;
            levelSelect.querySelector("h2").textContent = "levelSelect";

            //選択しを消す
            const areaParent = document.querySelector(".selectAreaAndCategory");
            const inners = document.querySelectorAll(".selectAreaButtonInner");

            //一つずつ取り出して削除する
            inners.forEach(inner => areaParent.removeChild(inner));

            console.clear();

            //更新
            instance.checkApplicationState();
        });

        // ランダムボタンをクリックしたときの処理
        randomButton.addEventListener("click", () => {
            // true/falseの切り替え
            instance.setIsShuffleOrder = !instance.getIsShuffleOrder;

            // ランダムボタンの縁の色の変更するためのクラス取得
            const levelSelectSidebarElement = levelSelect.querySelectorAll("li");
            const levelSelectRandomButton = levelSelectSidebarElement[1];

            //ランダムの縁の変更
            levelSelectRandomButton.classList.toggle("btn-outline-secondary");
            levelSelectRandomButton.classList.toggle("btn-outline-success");
        });

        //選択s
        areaInners.addEventListener("click", (e) => {

            //動的に確保
            const areaInnerElement = e.target.closest(".selectAreaButtonInner");
            const problemAnswerTitle = document.querySelector(".problemAnswer").querySelector(".areaAndCategory");
            const targetClassName = levelSelect.querySelector("nav").className;
            const mathLevel = document.querySelector(".levelSelect").querySelector("h2").textContent;
            const problemCollection = instance.getProblemCollection(targetClassName);
            const areaName = areaInnerElement.querySelector(".area").textContent;

            //ランダムボタンが押されている場合次の処理に進
            if (instance.getIsShuffleOrder === true) {

                //テーマの取得
                problemTheme = areaName;

                //問題の作成
                this.#generateProblem(problemTheme, problemCollection, true);

                //次の変更
                const problemTitle = `${mathLevel} / ${problemTheme}`;
                problemAnswerTitle.textContent = problemTitle;

                //stateの更新
                instance.setState = instance.getApplicationState.problemAnswer;
                instance.checkApplicationState();
            }
            else if (instance.getIsShuffleOrder === false) {

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

                        //stateの更新
                        instance.setState = instance.getApplicationState.problemAnswer;
                        instance.checkApplicationState();
                    })
                });
            }
        })
    }

    /**
        * 問題を生成する処理
        * @param {問題の範囲} problemTheme 
        * @param {問題を格納する変数} problemCollection 
        * @param {シャッフルしているかのフラグ} isShuffleOrder 
        */
    async #generateProblem(problemTheme, problemCollection, isShuffleOrder = false) {

        //problemCollectionに存在しているデータを全て取得
        const problemCollectionPosedProblemList = problemCollection.getPosedProblemList || {};

        //指定したオブジェクトが存在しない場合問題内容を格納
        if (!(problemTheme in problemCollectionPosedProblemList)) {

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
                    await this.loadJsonDataAsync(json).then(result =>
                        problemArray.push(result))
                }

                //全ての要素を一つの配列に格納する配列
                const singleProblemArray = [];

                //全ての要素を一つの配列に変換
                for (const problem of problemArray) {

                    //型が文字列の場合
                    if (typeof problem === "string") continue;

                    //全ての要素を一つに格納
                    for (const p of problem.questions)
                        singleProblemArray.push(p);
                }

                //全ての問題を格納した配列の長さを取得
                const singleProblemArrayLength = singleProblemArray.length;

                //問題を格納する変数をの内部を削除
                problemArray.splice(0);

                //内部にnameとquestionを生成
                problemArray.push(nameKey.name)

                /**問題キーに格納するオブジェクト */
                const questions = [];

                //問題数の数だけ回してランダムな問題を取得
                for (let count = 0; count < instance.getSolveProblemNum; count++) {

                    //一致しない問題を格納するために無限ループ
                    while (true) {

                        //問題を抽出する
                        const problem = singleProblemArray[this.#getRandomInt(singleProblemArrayLength)]

                        //重複する問題が存在しているかをチェック
                        const isExistPosedProblemArray = problemArray.includes(problem);

                        //存在していない場合問題を格納
                        if (!isExistPosedProblemArray) {
                            questions.push(problem)
                            break;
                        }
                    }
                }

                //問題データを格納
                problemArray.push({ questions: questions })
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
                        await aysnc.loadJsonDataAsync(problemData).then(res => problemArray.push(res))
                    }
                }
            }

            //問題の内容を格納するオブジェクト
            const posedProblemList = [];

            //文字列以外の処理を繰り返す
            for (const problem of problemArray) {

                //型が文字列の場合処理をスキップ
                if (typeof problem === "string") continue;

                //問題のquestionデータを取得
                const q = problem.questions;

                //データを取得
                const posed = this.#setPosedProblem(q);

                //データをpush
                posedProblemList.push(posed);
            }

            //格納するデータのプッシュ
            problemCollectionPosedProblemList[problemTheme] = posedProblemList;
            problemCollection.setPosedProblemList = problemCollectionPosedProblemList;

            //格納する情報の取得
            const levelSelect = document.querySelector(".levelSelect");
            const targetClassName = levelSelect.querySelector("nav").className;

            //問題を格納    
            instance.setProblemCollection(targetClassName, problemCollection);
        }

        //問題を設定
        instance.setPosedProblemList = problemCollection.getPosedProblemList[problemTheme];
    }

    /**
        * 出題する問題の設定
        * @param {出題する問題の配列データ} problemArray 
        * @returns 格納されたデータを返却する
        */
    #setPosedProblem(problemArray) {

        //まとめた全ての要素
        const posedProblemList = [];

        //まとめられたブロックから一つずつの要素を取り出す
        for (const problem of problemArray) {

            //問題を格納するデータ要素
            const storagedProblem = new posedProblem();

            //問題の要素を取得して格納
            storagedProblem.setAnswer = problem.answer;
            storagedProblem.setExplanation = problem.explanation;
            storagedProblem.setQuestion = problem.question;
            storagedProblem.setChoices = problem.choices;

            //格納したデータを問題配列に格納
            posedProblemList.push(storagedProblem);
        }
        return posedProblemList;
    }

    /**
     * 0～指定した数字未満の数字を生成する
     * @param {最大値} max 
     * @returns ランダムなint型の整数
     */
    #getRandomInt = (max) => Math.floor(Math.random() * max);
}

export default new levelSelectComponent();