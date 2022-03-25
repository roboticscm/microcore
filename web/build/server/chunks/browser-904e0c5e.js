var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import Bowser from "bowser";
const _Browser = class {
  static isSafari() {
    return _Browser.getBrowser() === "Safari";
  }
  static getLanguage() {
    let locale = window.navigator.userLanguage || window.navigator.language;
    if (locale === "en") {
      return "en-US";
    } else if (locale === "vi") {
      return "vi-VN";
    }
    return locale;
  }
  static getLocale() {
    return (window.navigator.userLanguage || window.navigator.language || "en").split("-")[0];
  }
  static getBrowser() {
    const browser = Bowser.getParser(window.navigator.userAgent).parsedResult;
    return browser.browser.name;
  }
};
let Browser = _Browser;
__publicField(Browser, "getBrowserID", () => {
  let nav = window.navigator;
  let screen = window.screen;
  let guid = nav.mimeTypes.length + "";
  guid += nav.userAgent.replace(/\D+/g, "");
  guid += nav.plugins.length;
  guid += screen.height || "";
  guid += screen.width || "";
  guid += screen.pixelDepth || "";
  return guid;
});
export { Browser as B };
