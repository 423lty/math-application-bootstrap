import instance from "../singleton.js"

class finishComponent {
    /**終了時の処理 */
    update() {

        //それぞれのボタンを取得
        const buttons = [
            document.querySelector(".returnTitle"),
            document.querySelector(".returnProblemSelect"),
            document.querySelector(".answerProblemAgain")
        ]

        //クリックした時の処理
        document.addEventListener("click", (e) => {

            //クリックされた要素を取得
            const onclickButton = e.target;

            //指定した要素に一致市内場合処理をスキップ
            if (buttons.includes(onclickButton)) {
                console.log("hit:", onclickButton.className);
                this.#finishButtonEvent(onclickButton.className);
            }
        })
    }

    /**
        * 終了の処理中にボタンを押したときの処理
        * @param {任意のボタン要素} onclickButtonClassName 
        */
    #finishButtonEvent(onclickButtonClassName) {

        //タイトルに戻る場合
        if (onclickButtonClassName === "returnTitle") {
            //stateの状態を変更
            instance.setState = instance.getApplicationState.title;
            instance.checkApplicationState();
        }
        else {
            //タイトルに戻らずに問題をサイド解く場合
            if (onclickButtonClassName === "returnProblemSelect") {
                // this.levelSelectUpdate();
                //stateの状態を変更
                instance.setState = instance.getApplicationState.levelSelect;
                instance.checkApplicationState();
            }
            else if (onclickButtonClassName === "answerProblemAgain") {
                instance.setState = instance.getApplicationState.problemAnswer;
                instance.checkApplicationState();
            }
        }
    }
}

export default new finishComponent();