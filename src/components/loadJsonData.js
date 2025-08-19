// JSONファイルを読み込む関数
export async function loadJsonArrayFromURLs(urls) {
    //結果を返却する変数
    const result = [];

    for (const url of urls) {
        try {
            //レスポンスを取得してjsonに変換
            const res = await fetch(url);
            const json = await res.json();

            //配列に格納
            result.push(json);

        } catch (err) {
            console.error(`json取得エラー${err}`);
        }
    }
    return result;
}
