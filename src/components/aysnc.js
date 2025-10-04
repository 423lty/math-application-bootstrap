class async {

    /**
    * jsonのデータを読み込むデータ
    * @param {読み込むファイルのパス} filePath 
    * @returns jsonデータ
    */
    async loadJsonDataAsync(filePath) {
        try {
            //データの取得
            const json = await fetch(filePath);

            //レスポンスを取得
            const res = await json.json();

            //取得したデータの返却
            return res;
        }
        catch (err) {
            console.error("json Error" + err);
        }
    }
}

export default new async();