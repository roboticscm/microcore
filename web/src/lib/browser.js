import Bowser from 'bowser';
import UAParser from 'ua-parser-js';
export class Browser {
  static isSafari() {
    return Browser.getBrowser() === 'Safari';
  }

  static getLanguage(_window) {
    let locale = (_window || window).navigator.userLanguage || (_window || window).navigator.language;
    if (locale === "en") {
      return "en-US";
    } else if (locale === "vi") {
      return "vi-VN";
    }
    return locale;
  }

  static getLocale() {
    return (window.navigator.userLanguage || window.navigator.language || 'en').split('-')[0];
  }

  static getBrowser() {
    const browser = Bowser.getParser(window.navigator.userAgent).parsedResult;
    return browser.browser.name;
  }

  static getBrowserID = () => {
    let nav = window.navigator;
    let screen = window.screen;
    let guid = nav.mimeTypes.length + '';
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';

    return guid;
  };

  static getAgentDesc = (ua) => {
    const parse = new UAParser (ua);
    const result = parse.getResult();
    const desc = `${result.device.type || 'PC/Laptop'} - ${result.os.name} ${result.os.version} - ${result.browser.name} ${result.browser.version}` 
    return desc;
  }
}


export const extractDeviceDesc = (request) => {
  return Browser.getAgentDesc(request.headers.get('user-agent'))
}