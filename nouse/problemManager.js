export class ProblemManager {

    /**コンストラクタ */
    constructor() {
        // 親を生成
        const options = document.querySelector(".options");

        // 指定した回数文forを回して親に子を配置する
        for (let i = 0; i < ProblemManager.optionsNum; i++) {

            // 選択肢の生成
            const newOption = document.createElement("div");

            // クラスを付与
            newOption.className = "option btn btn-outline-secondary m-2";

            //初期のテキスト
            newOption.textContent = `選択肢:${i + 1}`;

            //親に子をつける
            options.appendChild(newOption);
        }
    }

    /**回答の選択肢の数 */
    static optionsNum = 4;
}