// build.js
const fs = require('fs');

// HTML / CSS / JS を読み込む
let html = fs.readFileSync('./index.html', 'utf8');
let css = fs.readFileSync('./style.css', 'utf8');
let js = fs.readFileSync('./src/main.js', 'utf8');

// CSS を <style> に埋め込む
html = html.replace('</head>', `<style>${css}</style></head>`);

// JS を <script> に埋め込む
html = html.replace('</body>', `<script>${js}</script></body>`);

// 1つの HTML に書き出す
fs.writeFileSync('./build/index.html', html);

console.log('single.html を作成しました');
