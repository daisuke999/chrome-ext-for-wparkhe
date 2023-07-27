// 
// debug.js
// 

// 
// アプリ情報 コンソール出力
// 
export const consoleLogAppInfo = (manifest_json) => {
  console.log(`${manifest_json.name} ${manifest_json.version}`);
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
export const consoleLogDebug = (data) => {
  console.log(data);
}
