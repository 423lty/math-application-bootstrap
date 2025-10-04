import instance from "../singleton.js"

class finishComponent {
    /**終了時の処理 */
    update = () => {

        //クリックした時の処理
        document.addEventListener("click", (e) => {

            //クリックされた要素を取得
            const onclickButton = e.target;

            //指定した要素に一致市内場合処理をスキップ
            if (this.#buttons.includes(onclickButton))
                this.#finishButtonEvent(onclickButton.className);
        })
    }

    /**
    * 終了の処理中にボタンを押したときの処理
    * @param {任意のボタン要素} onclickButtonClassName 
    */
    #finishButtonEvent = (onclickButtonClassName) => {

        //指定したオブジェクトを取得
        const handler = this.#handler[onclickButtonClassName]

        //存在する場合のみ実行
        if (handler)
            handler();

        //遷移
        instance.checkApplicationState();
    }

    /**指定したhandlerで実行 */
    #handler = {
        returnTitle() {
            instance.setState = instance.getApplicationState.title
        },
        returnProblemSelect() {
            instance.setState = instance.getApplicationState.levelSelect;
        },
        answerProblemAgain() {
            instance.setState = instance.getApplicationState.problemAnswer;
        }

    }

    //それぞれのボタンを取得
    #buttons = [
        document.querySelector(".returnTitle"),
        document.querySelector(".returnProblemSelect"),
        document.querySelector(".answerProblemAgain")
    ]

}

export default new finishComponent();