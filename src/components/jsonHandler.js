export class JsonHandler {

    /**
     * jsonのデータを読み込むデータ
     * @param {読み込むファイルのパス} filePath 
     * @returns jsonデータ
     */
    static async loadJsonDataAsync(filePath) {
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

    static async getJsonParseObject(json) {
        return json.then(res => res).catch(err => {
            console.error(err);
        })
    }

}