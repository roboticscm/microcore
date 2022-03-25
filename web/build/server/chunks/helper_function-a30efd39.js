var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { B as Browser } from "./browser-904e0c5e.js";
import vnNum2Words from "vn-num2words";
import "bowser";
const _SNumber = class {
  static toLocaleString(n, numberDecimal = 0) {
    if (n === void 0) {
      return "";
    }
    return n ? n.toLocaleString(Browser.getLanguage(), { minimumFractionDigits: numberDecimal, maximumFractionDigits: numberDecimal }) : "0";
  }
  static getDecimalSeparator(locale) {
    const numberWithDecimalSeparator = 1.1;
    return numberWithDecimalSeparator.toLocaleString(locale).substring(1, 2);
  }
  static getLocaleDecimalSeparator() {
    const numberWithDecimalSeparator = 1.1;
    return numberWithDecimalSeparator.toLocaleString(Browser.getLanguage()).substring(1, 2);
  }
  static getThousandthSeparator(locale) {
    const number = 1e3;
    return number.toLocaleString(locale).substring(1, 2);
  }
  static getLocaleThousandthSeparator() {
    const number = 1e3;
    return number.toLocaleString(Browser.getLanguage()).substring(1, 2);
  }
  static toLocaleNumber(string) {
    const test = Intl.NumberFormat(Browser.getLanguage()).format("1.1");
    const cleanPattern = new RegExp(`[^-+0-9${test.charAt(1)}]`, "g");
    const cleaned = string.replace(cleanPattern, "");
    const normalized = cleaned.replace(test.charAt(1), ".");
    return parseFloat(normalized);
  }
};
let SNumber = _SNumber;
__publicField(SNumber, "readNumber", (number) => {
  return vnNum2Words(number) + " " + "SYS.LABEL.VND".t();
});
__publicField(SNumber, "autoFormat", (source, decimal = 2) => {
  if (typeof source === "number") {
    return _SNumber.toLocaleString(source, decimal);
  } else {
    return source;
  }
});
const readNumber = (number) => {
  return SNumber.readNumber(number);
};
const integerFormat = (number) => {
  return SNumber.toLocaleString(number, 0);
};
const decimalFormat = (number, decimal = 2) => {
  return SNumber.toLocaleString(number, decimal);
};
const autoFormat = (number, decimal = 2) => {
  return SNumber.autoFormat(number, decimal);
};
export { autoFormat, decimalFormat, integerFormat, readNumber };
