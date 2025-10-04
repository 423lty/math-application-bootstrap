export default class ProblemCollection {

    /**jsonの情報を取得する */
    get getJsonData() { return this.#jsonDataArray; }

    /**jsonの情報を設定する */
    set setJsonData(jsonDataArray) { this.#jsonDataArray = jsonDataArray; }

    /**問題の情報を取得する */
    get getProblemData() { return this.#problemDataArray; }

    /**jsonの情報を設定する */
    set setProblemData(problemDataArray) { this.#problemDataArray = problemDataArray; }

    /**jsonの情報を取得する */
    get getNameDataArray() { return this.#nameDataArray; }

    /**jsonの情報を設定する */
    set setNameDataArray(nameDataArray) { this.#nameDataArray = nameDataArray; }

    /**大門の数の情報を取得する */
    get getAreaNum() { return this.#areaNum; }

    /**大門の情報を設定する */
    set setAreaNum(areaNum) { this.#areaNum = areaNum; }

    /**小門の情報を取得する */
    get getCategoryArray() { return this.#categoryArray; }

    /**小門の情報を設定する */
    set setCategoryArray(categoryArray) { this.#categoryArray = categoryArray; }

    /**小門の情報を取得する */
    get getPosedProblemList() { return this.#posedProblemList; }

    /**小門の情報を設定する */
    set setPosedProblemList(posedProblemList) { this.#posedProblemList = posedProblemList; }

    /**jsonの情報を格納する変数 */
    #jsonDataArray = [];

    /**問題の情報を格納する変数 */
    #problemDataArray = [];

    /**名前やカテゴリーの格納配列 */
    #nameDataArray = [];

    /**大門の数を格納する変数 */
    #areaNum = 0;

    /**大門の数だけ確保した配列に入っている配列 */
    #categoryArray = {};

    /**問題の最終的なデータを保管する変数 */
    #posedProblemList = [];
}