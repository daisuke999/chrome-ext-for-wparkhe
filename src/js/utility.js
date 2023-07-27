// 
// util.js
// ユーティリティ関連処理
// 


export const isColorVal = (val) => {
  const keywordPattern = /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/;
  const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
  const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/;
  const hexPattern = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
  const hexaPattern = /^#[0-9a-fA-F]{8}$/;
  const hslPattern = /^hsl\(\s*\d+\s*,\s*[\d.]+\%\s*,\s*[\d.]+\%\s*\)$/;
  const hslaPattern = /^hsla\(\s*\d+\s*,\s*[\d.]+\%\s*,\s*[\d.]+\%\s*,\s*[\d.]+\s*\)$/;

  // パターンにマッチするか判定
  if (keywordPattern.test(val)) {
    return '事前定義済みキーワード値';
  } else if (rgbPattern.test(val)) {
    return 'RGB値';
  } else if (hexPattern.test(val)) {
    return '16進数値';
  } else if (rgbaPattern.test(val)) {
    return '透明度付きのRGB値';
  } else if (hexaPattern.test(val)) {
    return '透明度付きの16進数値';
  } else if (hslPattern.test(val)) {
    return 'HSL値';
  } else if (hslaPattern.test(val)) {
    return '透明度付きのHSL値';
  } else {
    return '';
  }
}


export const isNumVal = (val) => {
  const numericPattern = /^-?\d+(\.\d+)?$/;
  const unitPattern = /^-?\d+(\.\d+)?\s*[a-zA-Z%]+$/;
  // func: 値によってstep値を算出
  const calcStepVal = (num) => {
    if (Math.abs(num) < 1) {
      return 0.1;
    } else if (Math.abs(num) < 10) {
      return 1;
    } else {
      return 10;
    }
  }
  // 単位ありなしに応じて処理
  if (numericPattern.test(val) || unitPattern.test(val)) {
    const match = val.match(/^([\d.]+)(.*)$/);
    if (match) {
      const num = match[1];
      const unit = match[2].trim();
      // let step;
      return [num, unit, calcStepVal(num)];
    } else {
      return [val, '', calcStepVal(val)];
    }
  } else {
    return '';
  }
}


// 
// スタイルシートから取得したmedia値に応じてdata属性data-device用の値を取得
// 
export const getDatasetDeviceVal = (str) => {
  switch (str) {
    case "(min-width: 1000px)":
      return "pc";
    case "not all and (min-width: 1000px)":
      return "tab";
    case "not all and (min-width: 600px)":
      return "mb";
    default:
      return "";
  }
}
