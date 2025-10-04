import instance from "./singleton.js"

class problemAnswerComponent {

    /**問題解答更新 */
    update() {

        //それぞれのdocumentでデータを取得
        const problemAnswer = document.querySelector(".problemAnswer");
        const problemText = problemAnswer.querySelector(".problemText");
        const options = problemAnswer.querySelector(".options");
        const nextProblemButton = problemAnswer.querySelector(".nextProblemButton");
        const explanation = problemAnswer.querySelector(".explanation");
        const parentVideo = problemAnswer.querySelector(".parentVideo");
        const answerRateDocument = document.querySelector(".answerRate");

        // 現在の問題数をカウントする変数
        let count = 0;

        //問題を一回クリックした場合フラグを切り替える
        let isOneClickedAnswer = false;

        let isCorrectProblem = false

        //間違えた問題を格納する変数
        let mistakeProblem = [];

        //クリックした場合のイベント
        options.addEventListener("click", (e) => {

            //問題を回答開始していない場合処理をしない
            if (!instance.getIsFirstProblemAnswerButtonClicked) {
                // デフォルト動作を止める
                e.preventDefault();
                return;
            }

            //問題を解答時に一回解答していた場合スキップする
            if (isOneClickedAnswer) return;

            //すべての選択しを取得
            const choices = Array.from(problemAnswer.querySelectorAll(".choices"));

            //クリックしたオブジェクトを取得
            const choice = e.target.closest(".choices");

            //videoの要素を動的に作成 
            const video = document.createElement("video");

            //クラス名を付与
            video.className = "m-5 p-2 fw-bold fs-4";

            //video要素を設定
            video.height = 180;
            video.width = 320;
            video.muted = true;
            video.autoplay = true;

            //-1以外の場合
            if (choice) {

                //現在のインデックス番号を取得
                const index = choices.findIndex(c => c === choice);

                //問題を解答したフラグを変更
                isOneClickedAnswer = true;

                //問題に正解したかどうかを取得
                isCorrectProblem = (index === instance.getPosedAnswer);

                //動画の要素を付与する
                video.src = isCorrectProblem ? instance.getCorrectAnswerVideoPath : instance.getIncorrectAnswerVideoPath;

                //要素を親要素に付与する
                parentVideo.appendChild(video);

                //問題の解説を表示
                explanation.textContent = instance.getExplanation;
            }
        });

        //問題のスキップ
        nextProblemButton.addEventListener("click", () => {

            //問題解答開始のフラグを変更
            if (!instance.getIsFirstProblemAnswerButtonClicked) {
                instance.setIsFirstProblemAnswerButtonClicked = true
                return;
            }

            //問題の解答フラグを戻す
            isOneClickedAnswer = false;

            //子要素が存在するかどうかを確認する
            const hasChild = parentVideo.hasChildNodes();

            //parentVideoに子要素が存在している場合取り除く
            if (hasChild) parentVideo.removeChild(parentVideo.firstElementChild)

            //問題文の長さを上回るまで続ける
            if (instance.getPosedProblemList[0].length > count) {
                const choices = problemAnswer.querySelectorAll(".choices");

                //問題の解答の設定
                this.#setProblemAnswerText(problemText, choices, count);

                //問題数のカウント増加
                count++;

                // 問題の解説を非表示にする
                explanation.textContent = "";

                //スキップした場合も含み間違えた場合変数に格納
                if (!isCorrectProblem)
                    mistakeProblem.push(instance.getPosedProblemList[0][count]);
            }
            //終了時の処理
            else {
                //stateの状態を変更
                instance.setState = instance.getApplicationState.finish;

                //問題のカウントをリセット
                count = 0;

                //間違えた問題の長さを取得
                const mistakeProblemLength = mistakeProblem.length;

                //正答率を更新
                instance.setAnswerRate = this.#answerRate(mistakeProblemLength);

                //正答率の表示
                answerRateDocument.textContent = `正答率 : ${App.answerRate}%`;


                //間違えたオブジェクトの内部を消す
                mistakeProblem = [];

                // 更新
                instance.checkApplicationState();
            }

            // 回答の正答フラグを切る
            isCorrectProblem = false
        });

    }

    /**
     * 回答したときの正答率を算出する関数
     * @param {間違えた数} mistakeProblemLength 
     * @returns 正答率
     */
    #answerRate = (mistakeProblemLength) => mistakeProblemLength != 0 ? ((instance.getPosedProblemList[0].length - mistakeProblemLength) * instance.getAnswerRateCorrect) : instance.getAnswerRateCorrect;

    /**
     * 問題の答えなどを設定する関数
     * @param {問題文を管理するElement要素} problemText 
     * @param {選択しを管理するElement要素} choices 
     * @param {現在の出題番号目} i 
     */
    #setProblemAnswerText(problemText, choices, i) {

        //要素を詳しく取得する
        const posedProblem = App.posedProblemList[0][i];

        //問題文の設定
        problemText.textContent = posedProblem.getQuestion;

        //選択の設定
        if (choices.length === posedProblem.getChoices.length)
            posedProblem.getChoices.forEach((text, index) => choices[index].textContent = text);

        //解説
        instance.setExplanation = posedProblem.getExplanation;

        // 答え
        instance.getPosedAnswer = posedProblem.getAnswer;
        console.log(`答え : ${instance.getExplanation}`)
        console.log(`解説 : ${instance.getexplanation}`)
    }

}


export default new problemAnswerComponent()