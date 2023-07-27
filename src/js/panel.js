// 
// panel.js
// 
import { isColorVal, isNumVal, getDatasetDeviceVal } from '../js/utility.js'
import { consoleLogDebug } from '../js/debug.js'
 

// 
// outputStyleInformation
// 
export const outputStyleInformation = (results, SETTINGS) => {

  const { APP_PREFIX, IFRAME_WRAPPER_ELM_ID } = SETTINGS;

  // メディアクエリ、セレクタでまとめて出力する用
  const resultsMap = new Map();

  // メディアクエリ毎に登場セレクタを整理
  for (const item of results) {
    const { media, selector, property, value } = item;

    if (!resultsMap.has(media)) {
      resultsMap.set(media, []);
    }
    if (!resultsMap.get(media).includes(selector)) {
      resultsMap.get(media).push(selector);
    }
  }
  consoleLogDebug(resultsMap);
  // メディアクエリ、セレクタ毎に結果を出力
  const panelElm = document.createElement("div");
  panelElm.className = `${APP_PREFIX}_panel`;
  for (const [media, selectorArr] of resultsMap.entries()) {
    const mediaGrpElm = document.createElement("div");
    mediaGrpElm.className = `${APP_PREFIX}_panel_mediaGrp`;
    // メディア名 見出し要素 挿入
    const mediaHeadingElm = document.createElement("p");
    mediaHeadingElm.className = `${APP_PREFIX}_panel_mediaName`;
    mediaHeadingElm.textContent = media || "all";
    mediaHeadingElm.dataset.device = getDatasetDeviceVal(mediaHeadingElm.textContent);
    mediaHeadingElm.addEventListener("click", (e) => {
      // 見出し押下時 イベント
      const deviceVal = e.target.dataset.device;
      if (deviceVal) {
        // 対象のデバイスボタン押下
        const targetDeviceBtn = document.querySelector(`.arkp-deviceSwitch__btn[data-device="${deviceVal}"]`);
        targetDeviceBtn.dispatchEvent(new Event("click"));
        // 押下した見出しのみis_active付与
        const mediaHeadingElms = document.getElementsByClassName(`${APP_PREFIX}_panel_mediaName`);
        for (const headingElm of mediaHeadingElms) {
          headingElm.classList.remove("is_active");
        }
        e.target.classList.add("is_active");
      }
    });
    mediaGrpElm.appendChild(mediaHeadingElm);

    for (const selector of selectorArr) {
      // セレクタ名 見出し要素 挿入
      const selectorHedingElm = document.createElement("p");
      selectorHedingElm.className = `${APP_PREFIX}_panel_selectorName`;
      selectorHedingElm.textContent = selector || "none";
      mediaGrpElm.appendChild(selectorHedingElm);
      // メディアクエリ、セレクタが一致するもののみ抽出
      const targetArr = results.filter((item) => {
        return item["media"] === media && item["selector"] === selector;
      });
      const selectorBodyElm = document.createElement("div");
      selectorBodyElm.className = `${APP_PREFIX}_panel_selectorBody`;
      // セレクタ毎にまとめて出力
      for (const target of targetArr) {
        // プロパティグループ要素
        const propGrpElm = document.createElement("div");
        propGrpElm.className = `${APP_PREFIX}_panel_propGrp`;
        // プロパティ名要素
        const propNameElm = document.createElement("div");
        propNameElm.className = `${APP_PREFIX}_panel_propName`;
        propNameElm.textContent = target["property"];
        // プロパティ値要素
        const propValElm = document.createElement("div");
        propValElm.className = `${APP_PREFIX}_panel_propVal`;
        const propInputElm = createValInputElm(target["value"], APP_PREFIX);
        propValElm.appendChild(propInputElm);
        // プロパティグループ組み立て
        propGrpElm.appendChild(propNameElm);
        propGrpElm.appendChild(propValElm);
        // セクションボディに追加
        selectorBodyElm.appendChild(propGrpElm);
      }
      // メディアグループにセクションボディを追加
      mediaGrpElm.appendChild(selectorBodyElm);
    }
    // パネルにメディアグループを追加
    panelElm.appendChild(mediaGrpElm);
  }
  // 
  // 結果を出力
  // 
  const iframeContainerElm = document.createElement("div"); // iframeとpanelElmをまとめる要素
  iframeContainerElm.className = `${APP_PREFIX}_container`; // まとめる要素のclass名
  const iframeWrapperElm = document.getElementById(`${IFRAME_WRAPPER_ELM_ID}`); // iframeを包む一番外側の要素
  iframeWrapperElm.before(iframeContainerElm); // iframeの直前にiframeContainerElmを一旦配置した後に...
  iframeContainerElm.prepend(iframeWrapperElm); // iframeContainerElm > iframeWrapper のようにする
  iframeContainerElm.appendChild(panelElm); // その後、iframeContainerElm > iframeWrapperElm, panelElm とする
}


// 
// 引数で渡されたプロパティ値に応じてtypeを指定したinput要素を作成
// 
const createValInputElm = (value, APP_PREFIX) => {
  const valInputGrpElm = document.createElement("div");
  const valInputElm = document.createElement("input");
  const valCtrlElm = document.createElement("div");
  valInputGrpElm.className = `${APP_PREFIX}_panel_inputGrp`;
  valInputElm.className = `${APP_PREFIX}_panel_input`;
  valCtrlElm.className = `${APP_PREFIX}_panel_ctrl`;
  // inputId重複チェック用
  const inputIds = [];
  // value値によってtypeを変更
  if (isColorVal(value) !== '') {
    valInputElm.type = 'color';
    valInputElm.dataset.val = value;
  } else if (isNumVal(value) !== '') {
    valInputElm.type = 'text';
    const numUnitArr = isNumVal(value);
    const inputId = String(Math.random()).slice(2);
    valInputElm.dataset.id = inputId;
    valInputElm.dataset.num = numUnitArr[0];
    valInputElm.dataset.unit = numUnitArr[1];
    valInputElm.dataset.step = numUnitArr[2];
    // 増減ボタン作成
    const incrementBtn = document.createElement('button');
    const decrementBtn = document.createElement('button');
    incrementBtn.className = `${APP_PREFIX}_panel_ctrlBtn -inc`;
    decrementBtn.className = `${APP_PREFIX}_panel_ctrlBtn -dec`;
    incrementBtn.addEventListener("click", () => {
      updateInputVal(inputId, valInputElm.dataset.step);
    });
    decrementBtn.addEventListener("click", () => {
      updateInputVal(inputId, -1 * valInputElm.dataset.step);
    });
    valCtrlElm.appendChild(decrementBtn);
    valCtrlElm.appendChild(incrementBtn);
  } else {
    valInputElm.type = 'text';
  }
  // プロパティ値を設定
  valInputElm.value = value;
  // 要素組み立て
  valInputGrpElm.appendChild(valInputElm);
  valInputGrpElm.appendChild(valCtrlElm);
  return valInputGrpElm;
}


// 
// updateInputVal
// 
const updateInputVal = (inputId, step) => {
  // ここに指定されたinputId要素の値を更新する処理を書く
  const input = document.querySelector(`[data-id="${inputId}"]`);
  input.dataset.num = (parseInt(input.dataset.num) + parseInt(step)).toString();
  input.value = `${input.dataset.num}${input.dataset.unit}`;
  // inputイベント発火
  input.dispatchEvent(new Event("input"));
}


// 
// panel内のinput要素にイベントを設定
// 
export const addEventInputVal = (results, SETTINGS) => {

  const { APP_PREFIX } = SETTINGS;

  let timeoutId; // タイムアウトID

  const debounce = (func, delay) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };

  const inputs = document.querySelectorAll(`.${APP_PREFIX}_panel input`);
  consoleLogDebug(inputs);

  inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      consoleLogDebug("update!");

      debounce(() => {
        const { media, selector, property } = results[index];
        const newValue = input.value;
        const iframe = document.querySelector(IFRAME_ELM_SELECTOR);
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const styleElement = iframeDocument.getElementById(TARGET_INLINE_STYLE_ELM_ID);

        if (styleElement) {
          const styleSheet = styleElement.sheet;

          for (let i = 0; i < styleSheet.cssRules.length; i++) {
            const rule = styleSheet.cssRules[i];

            if (!media && rule.selectorText === selector) {
              // メディアクエリなしのプロパティを編集した場合
              rule.style.setProperty(property, newValue);
              break;
            } else if (rule.media && rule.media.mediaText === media) {
              // メディアクエリありのプロパティを編集した場合
              const mediaRules = rule.cssRules;
              for (let j = 0; j < mediaRules.length; j++) {
                const mediaRule = mediaRules[j];

                if (mediaRule.selectorText === selector) {
                  mediaRule.style.setProperty(property, newValue);
                  break;
                }
              }
            }
          }
        }
      }, 100); // 0.100秒のディレイを設定
    });
  });
};
