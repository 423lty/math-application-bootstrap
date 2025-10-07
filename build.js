// build.js
import ts from "typescript";
import fs from "fs";
import path from "path";

// コンパイル対象
const filePath = path.resolve("src/main.ts");
const outDir = "dist";

// 出力ディレクトリ作成
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// TypeScriptをJavaScriptに変換
const tsCode = fs.readFileSync(filePath, "utf8");
const result = ts.transpileModule(tsCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});

// 出力ファイルに書き込み
fs.writeFileSync(path.join(outDir, "main.js"), result.outputText);
console.log("✅ TypeScriptをJavaScriptに変換しました。");
