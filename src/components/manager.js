export class Manager {

    /**大門の数の情報を取得する */
    get getMathLevel() {
        return this.#mathLevel;
    }

    /**大門の情報を設定する */
    set setMathLevel(mathLevel) {
        this.#mathLevel = mathLevel;
    }

    /**小門の情報を取得する */
    get getState() {
        return this.#state;
    }

    /**小門の情報を設定する */
    set setState(state) {
        this.#state = state;
    }

    //数学のれべるを管理
    #mathLevel = "";

    #state = "title";
}