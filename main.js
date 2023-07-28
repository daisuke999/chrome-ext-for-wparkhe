// 
// main.js
// 
import MANIFEST_JSON from './manifest.json'
import SETTING_JSON from './src/json/setting.json'
import { extractStyleInfoFromIframe } from './src/js/iframe.js'
import { outputStyleInformation, addEventInputVal, addPanelOpenCloseBtn } from './src/js/panel.js'
import { addClickEventToDeviceSwitchBtn, initMediaNameisActive } from './src/js/device_switch.js'
import { consoleLogAppInfo, consoleLogProcess } from './src/js/debug.js'
import './src/css/style.css'


// 
// app settings
// 
const APP_PREFIX = SETTING_JSON.app_prefix || "arkpExt";                                                            // アプリclass名用の接頭辞
const IFRAME_ELM_SELECTOR = SETTING_JSON.arkp_site.iframe_elm_selector || ".arkp-iframeWrapper__iframe";            // iframe要素のセレクタ名
const IFRAME_WRAPPER_ELM_ID = SETTING_JSON.arkp_site.iframe_wrapper_elm_id || "arkp-iframe";                        // iframeを包んでいる外側の要素のセレクタ名
const TARGET_INLINE_STYLE_ELM_ID = SETTING_JSON.ark_theme.inline_style_elm_id || "arkb-dynamic-styles";             // style（インライン）が定義されている要素のID
const DEVICE_SWITCH_ELM_CLASS_NAME = SETTING_JSON.arkp_site.device_switch_class_name || "arkp-deviceSwitch__btn";   // 配布サイトのデバイス切り替えスイッチ要素のclass
const TARGET_SELECTOR = SETTING_JSON.target_selector || ".arkp-";                                                   // 対象セレクタ
const TARGET_PREFIX = SETTING_JSON.target_prefix || "--";                                                           // 対象接頭辞

// 上記をオブジェクトへ
const SETTINGS = {
  APP_PREFIX,
  IFRAME_ELM_SELECTOR,
  IFRAME_WRAPPER_ELM_ID,
  TARGET_INLINE_STYLE_ELM_ID,
  DEVICE_SWITCH_ELM_CLASS_NAME,
  TARGET_SELECTOR,
  TARGET_PREFIX,
};


// 
// メイン処理
// 
const main = async () => {
  try {
    // 
    // アプリ情報 コンソール出力
    // 
    consoleLogAppInfo(MANIFEST_JSON);
    // 
    // スタイル情報取得
    // 
    const results = await extractStyleInfoFromIframe(SETTINGS);                 // iframeにアクセスし対象のスタイル情報を取得
    // 
    // 操作パネル生成
    // 
    outputStyleInformation(results, SETTINGS);                                  // 取得したスタイル情報を元に操作パネルを生成
    addEventInputVal(results, SETTINGS);                                        // 操作パネルのinput要素に値更新時のイベントを設定
    addPanelOpenCloseBtn(SETTINGS);                                             // 操作パネルの開閉ボタンと機能を追加
    // 
    // デバイススイッチ処理
    // 
    addClickEventToDeviceSwitchBtn(SETTINGS);                                   // イベント：デバイススイッチボタンクリック時 を追加
    initMediaNameisActive(SETTINGS);                                            // 初回のみ：デバイススイッチの選択状況に合わせてmediaNameにis_activeを付与
    // 
    // 処理成功
    // 
    consoleLogProcess("success!");
  } catch (error) {
    // 
    // エラー処理
    // 
    console.error(error);
  }
};


// 
// 実行
// 
main();
