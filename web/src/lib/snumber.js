import { Browser } from './browser';
import vnNum2Words from 'vn-num2words';
export class SNumber {
  static toLocaleString(n, numberDecimal = 0) {
    if (n === undefined) {
      return ''
    }

    return n ? n.toLocaleString(Browser.getLanguage(), { minimumFractionDigits: numberDecimal, maximumFractionDigits: numberDecimal }) : '0'
  }

  static getDecimalSeparator(locale) {
    const numberWithDecimalSeparator = 1.1;

    return numberWithDecimalSeparator
      .toLocaleString(locale)
      .substring(1, 2);
  }

  static getLocaleDecimalSeparator() {
    const numberWithDecimalSeparator = 1.1;

    return numberWithDecimalSeparator
      .toLocaleString(Browser.getLanguage())
      .substring(1, 2);
  }

  static getThousandthSeparator(locale) {
    const number = 1000;
    return number
      .toLocaleString(locale)
      .substring(1, 2);
  }

  static getLocaleThousandthSeparator() {
    const number = 1000;
    return number
      .toLocaleString(Browser.getLanguage())
      .substring(1, 2);
  }

  static toLocaleNumber(string) {
    const test = Intl.NumberFormat(Browser.getLanguage()).format('1.1');
    const cleanPattern = new RegExp(`[^-+0-9${test.charAt(1)}]`, 'g');
    const cleaned = string.replace(cleanPattern, '');
    const normalized = cleaned.replace(test.charAt(1), '.');
    return parseFloat(normalized);
  }

  static readNumber = (number) => {
    return vnNum2Words(number) + ' ' + 'SYS.LABEL.VND'.t();
  }

  static autoFormat = (source, decimal = 2) => {
    if (typeof source === 'number'){
        return SNumber.toLocaleString(source, decimal)
    } else {
        return source;
    }
  }

}
