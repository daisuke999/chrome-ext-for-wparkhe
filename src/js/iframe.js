// 
// iframe.js
// 
import { consoleLogProcess } from '../js/debug.js';

// 
// extractStyleInfoFromIframe
// 
export const extractStyleInfoFromIframe = async (SETTINGS) => {

  const { IFRAME_ELM_SELECTOR, TARGET_SELECTOR, TARGET_PREFIX, TARGET_INLINE_STYLE_ELM_ID } = SETTINGS;

  return new Promise((resolve, reject) => {
    const iframe = document.querySelector(IFRAME_ELM_SELECTOR);

    const getStyles = (rules, media = undefined) => {
      const results = [];

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const selectorText = rule.selectorText;
        if (selectorText && selectorText.includes(TARGET_SELECTOR)) {
          // メディアクエリなし
          const selector = selectorText;
          for (let j = 0; j < rule.style.length; j++) {
            const property = rule.style[j];
            if (property.includes(TARGET_PREFIX)) {
              const value = rule.style.getPropertyValue(property);
              results.push({ media, selector, property, value });
            }
          }
        } else if (!selectorText && rule.media && rule.cssRules) {
          // メディアクエリあり（再帰）
          const mediaText = rule.media.mediaText;
          const mediaResults = getStyles(rule.cssRules, mediaText);
          results.push(...mediaResults);
        }
      }
      return results;
    }

    const init = () => {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const styleElement = iframeDocument.getElementById(TARGET_INLINE_STYLE_ELM_ID);
      const styleSheet = styleElement.sheet;
      const rules = styleSheet.cssRules || styleSheet.rules;
      const results = getStyles(rules);
      resolve(results);
    }

    if (iframe) {
      consoleLogProcess("iframe loaded");
      init();
    } else {
      consoleLogProcess("iframe waiting...");

      iframe.onload = () => {
        consoleLogProcess("iframe onload");
        init();
      };
  
      iframe.onerror = () => {
        consoleLogProcess("iframe error!");
        reject(new Error('Failed to load iframe'));
      };
    }
  });
};
