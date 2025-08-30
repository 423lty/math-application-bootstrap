export class objectData {

    /**コンストラクタ */
    constructor(){

    }

    /**jsonの情報を取得する */
    get getJsonData() {
        return this.#jsonDataArray;
    }

    /**jsonの情報を設定する */
    set setJsonData(jsonDataArray) {
        this.#jsonDataArray = jsonDataArray;
    }

    /**jsonの情報を取得する */
    get getProblemData() {
        return this.#problemDataArray;
    }

    /**jsonの情報を設定する */
    set setPoblemData(problemDataArray) {
        this.#problemDataArray = problemDataArray;
    }

    /**大門の数の情報を取得する */
    get getAreaNum() {
        return this.#areaNum;
    }

    /**大門の情報を設定する */
    set setAreaNum(areaNum) {
        this.#areaNum = areaNum;
    }

    /**小門の情報を取得する */
    get getCategoryArray() {
        return this.#categoryArray;
    }

    /**小門の情報を設定する */
    set setCategoryArray(categoryArray) {
        this.#categoryArray = categoryArray;
    }


    /**jsonの情報を格納する変数 */
    #jsonDataArray = [];

    /**問題の情報を格納する変数 */
    #problemDataArray = [];

    /**大門の数を格納する変数 */
    #areaNum = 0;

    /**大門の数だけ確保した配列に入っている配列 */
    #categoryArray = [];

}