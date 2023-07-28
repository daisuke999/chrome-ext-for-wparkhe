// 
// device_switch.js
// 


// 
// デバイススイッチタブ押下時の処理
// 
export const addClickEventToDeviceSwitchBtn = (SETTINGS) => {

  const { DEVICE_SWITCH_ELM_CLASS_NAME, APP_PREFIX } = SETTINGS;

  const deviceSwitchBtns = document.getElementsByClassName(DEVICE_SWITCH_ELM_CLASS_NAME);
  for (const btn of deviceSwitchBtns) {
    btn.addEventListener("click", () => {
      const deviceVal = btn.dataset.device;
      if (deviceVal) {
        const panelMediaNameElms = document.getElementsByClassName(`${APP_PREFIX}_panel_mediaName`);
        for (const nameElm of panelMediaNameElms) {
          if (nameElm.dataset.device === deviceVal) {
            nameElm.classList.add("is_active");
          } else {
            nameElm.classList.remove("is_active");
          }
        } 
      }
    });
  }
}


// 
// 初回のみ：デバイススイッチの-active状況に合わせてmediaNameにis_active付与
// 
export const initMediaNameisActive = (SETTINGS) => {

  const { DEVICE_SWITCH_ELM_CLASS_NAME, APP_PREFIX } = SETTINGS;
  
  const deviceSwitchBtns = document.getElementsByClassName(DEVICE_SWITCH_ELM_CLASS_NAME);
  for (const btn of deviceSwitchBtns) {
    if (btn.classList.contains("-active")) {
      const deviceVal = btn.dataset.device;
      if (deviceVal) {
        const panelMediaNameElms = document.getElementsByClassName(`${APP_PREFIX}_panel_mediaName`);
        for (const nameElm of panelMediaNameElms) {
          if (nameElm.dataset.device === deviceVal) {
            nameElm.classList.add("is_active");
          }
        }
      }
    }
  }
}
