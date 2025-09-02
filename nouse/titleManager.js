import { applicationState, applicationMathLevel, App } from "../src/app.js"

export class TitleManager {

    /**
     * 更新処理
     */
    update() {
        // タイトルのオブジェクトを全て取得
        const titleSection = document.querySelector(".title");
        const titleSectionObjects = titleSection.querySelector("div").querySelectorAll("div");

        //返却するobject
        let mathLevel = "";

        //クリックしたか
        let isClickMathLevel = false;

        //どちらの数学をするか選択
        titleSectionObjects.forEach(object => {
            object.addEventListener("click", () => {

                //レベルの選択
                App.mathLevel = object.className;

                App.state = applicationState.levelSelect;

                //レベルレベル
                const levelSelectTitleText = document.querySelector(".levelSelect").querySelector("h2");

                // levelSelectの表示タイトルの変更
                if (mathLevel == applicationMathLevel.highSchool)
                    levelSelectTitleText.textContent = "高校数学";

                else if (mathLevel == applicationMathLevel.university)
                    levelSelectTitleText.textContent = "大学数学";
            })
        });
    }
}