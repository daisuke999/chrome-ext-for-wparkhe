// 
// app.js
// 
import { consoleLogProcess } from './debug.js'


// 
// checkCurrentPage
// 
export const checkCurrentPage = (SETTINGS) => {

  const { PAGE_TITLE_ELM_SELECTOR, TARGET_PATTERN_GRP } = SETTINGS;

  // 
  // check：ページタイトルは存在するか？
  // 
  const pageTitleElm = document.querySelector(PAGE_TITLE_ELM_SELECTOR);
  if (!pageTitleElm) {
    consoleLogProcess("excluded pages");
    return false;
  }

  // 
  // check：ページタイトルの条件は満たしているか？（動作対象のパターンか？）
  // 
  const pageTitle = pageTitleElm.textContent;

  const patternGrpName = TARGET_PATTERN_GRP.find((grpName) => {
    return pageTitle.startsWith(grpName)
  });
  if (!patternGrpName) {
    consoleLogProcess("unsupported pattern");
    return false;
  }

  // 
  // 全てクリアならチェックOK
  // 
  return true;
}
