import Bowser from 'bowser';
import MobileDetect from 'mobile-detect';
export class Browser {
  static isSafari() {
    return Browser.getBrowser() === 'Safari';
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

  static getAgentDesc = () => {
    const md = new MobileDetect(window.navigator.userAgent);

    return md;
  }
}
