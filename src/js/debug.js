// 
// debug.js
// 


// 
// アプリ情報 コンソール出力
// 
export const consoleLogAppInfo = (manifest_json) => {
  console.log(`${manifest_json.name} v${manifest_json.version}`);
}


// 
// プロセス情報 コンソール出力
// 
export const consoleLogProcess = (str) => {
  console.log(`-> ${str}`);
}


// 
// デバッグ用 コンソール出力
// 
export const consoleLogDebug = (data, strProcess = undefined) => {
  if (strProcess !== undefined) {
    // プロセス用テキストあり
    consoleLogProcess(strProcess);
    console.log(data);
  } else {
    // プロセス用テキストなし
    console.log(data);
  }
}
