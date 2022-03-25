var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { S as StringUtil } from "./string-util-9f2c94d9.js";
import { B as Browser } from "./browser-904e0c5e.js";
import moment from "moment";
const _SDate = class {
  static convertMillisecondToDateString(millisecond) {
    if (!millisecond || millisecond === _SDate.NULL_DATE) {
      return "";
    }
    if (typeof millisecond === "string") {
      return millisecond;
    } else {
      const options = { month: "2-digit", day: "2-digit", year: "numeric" };
      const date = new Date(millisecond);
      return date.toLocaleDateString("vi-VN", options);
    }
  }
  static convertMillisecondToShortDateString(millisecond) {
    if (!millisecond || millisecond === _SDate.NULL_DATE) {
      return "";
    }
    const date = new Date(millisecond);
    return date.toLocaleString("vi-VN", {
      day: "numeric"
    }) + "/" + date.toLocaleString("vi-VN", {
      month: "numeric"
    }) + "/" + date.toLocaleString("vi-VN", {
      year: "numeric"
    }).substring(2, 4);
  }
  static convertMillisecondToDateTimeString(millisecond) {
    if (!millisecond || millisecond === _SDate.NULL_DATE) {
      return "";
    }
    const date = new Date(millisecond);
    if (Browser.isSafari()) {
      return date.toLocaleString("vi-VN", {
        dateStyle: "short"
      });
    }
    return date.toLocaleString("vi-VN", {
      dateStyle: "short"
    }) + " " + date.toLocaleString("vi-VN", {
      timeStyle: "short"
    });
  }
  static toDateString(date) {
    return date.toLocaleDateString("vi-VN");
  }
  static toDateTimeString(date) {
    return date.toLocaleString("vi-VN", {
      dateStyle: "short"
    }) + " " + date.toLocaleString("vi-VN", {
      timeStyle: "short"
    });
  }
  static currentDateInMilli() {
    return new Date().valueOf();
  }
  static subtractMonthFromNow(month) {
    const date = new Date();
    date.setMonth(date.getMonth() - month);
    return date.valueOf();
  }
  static currentDate() {
    return new Date();
  }
  static getAge(currentDate, millisecond) {
    const date = new Date(millisecond);
    const ageInYear = currentDate.getFullYear() - date.getFullYear();
    if (ageInYear < 0) {
      return new Error("Invalid date");
    } else if (!ageInYear) {
      const ageInMonth = currentDate.getMonth() - date.getMonth();
      if (ageInMonth < 0) {
        return new Error("Invalid date");
      }
      return `${ageInMonth + 1} ${"SYS.LABEL.MONTH".t()} ${"SYS.LABEL.AGE".t()}`;
    }
    return `${ageInYear} ${"SYS.LABEL.AGE".t()}`;
  }
  static dateShortTimeShort(millisecond) {
    if (!millisecond || millisecond === _SDate.NULL_DATE) {
      return "";
    }
    const date = new Date(millisecond);
    if (Browser.isSafari()) {
      return date.toLocaleString("vi-VN", {
        dateStyle: "short"
      });
    }
    return date.toLocaleString("vi-VN", {
      dateStyle: "short"
    }).substring(0, 5) + " " + date.toLocaleString("vi-VN", {
      timeStyle: "short"
    });
  }
};
let SDate = _SDate;
__publicField(SDate, "NULL_DATE", -9999999999999);
__publicField(SDate, "MIN_DATE", -8888888888888);
__publicField(SDate, "MAX_DATE", 99999999999999);
__publicField(SDate, "isValidDate", (dateOrStr) => {
  if (typeof dateOrStr === "string") {
    return moment(dateOrStr, "DD/MM/YYYY", true).isValid();
  } else if (typeof dateOrStr === "number") {
    return true;
  } else if (typeof dateOrStr.getMonth === "function") {
    return true;
  }
  return false;
});
__publicField(SDate, "toMilliSecond", (dateOrStr, format = "DD/MM/YYYY") => {
  if (typeof dateOrStr === "string") {
    return moment(dateOrStr, "DD/MM/YYYY", true).valueOf();
  } else if (typeof dateOrStr.getMonth === "function") {
    return dateOrStr.valueOf();
  }
});
class CommonValidation {
  static isValidDate(dateStr) {
    if (!dateStr) {
      return false;
    }
    return SDate.isValidDate(dateStr);
  }
  static isEmptyString(source) {
    if (!source) {
      return true;
    }
    return source.trim().length === 0;
  }
  static isMinLength(source, min) {
    if (!source) {
      return false;
    }
    return source.trim().length >= min;
  }
  static isLengthBetween(source, min, max) {
    if (!source && min === 0) {
      return true;
    }
    return source.trim().length >= min && source.trim().length <= max;
  }
  static isIntegerNumber(source) {
    const reg = new RegExp(/^[-+]?[0-9]\d*$/);
    return reg.test(source);
  }
  static isIntegerInRange(source, from, to) {
    const reg = new RegExp(/^\d+$/);
    const isNumber = reg.test(source);
    if (!isNumber) {
      return false;
    }
    const number = Number(source);
    return number >= from && number <= to;
  }
  static isValidEmail(email) {
    if (StringUtil.isEmpty(email)) {
      return true;
    }
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
  }
}
__publicField(CommonValidation, "INVALID_DATE", "SYS.MSG.INVALID_DATE");
__publicField(CommonValidation, "DEADLINE_MUST_AFTER_START_TIME", "TASK.MSG.DEADLINE_MUST_AFTER_START_TIME");
__publicField(CommonValidation, "END_TIME_MUST_AFTER_START_TIME", "TASK.MSG.END_TIME_MUST_AFTER_START_TIME");
__publicField(CommonValidation, "SECOND_REMINDER_MUST_AFTER_THE_FIRST", "TASK.MSG.SECOND_REMINDER_MUST_AFTER_THE_FIRST");
__publicField(CommonValidation, "EVALUATE_TIME_MUST_AFTER_ASSIGNEE_START_TIME", "TASK.MSG.EVALUATE_TIME_MUST_AFTER_ASSIGNEE_START_TIME");
__publicField(CommonValidation, "PASSWORD_DOES_NOT_MATCH", "sys.msg.password does not  match");
__publicField(CommonValidation, "NEW_PASSWORD_MUST_BE_NOT_THE_SAME_THE_CURRENT", "SYS.MSG.NEW_PASSWORD_MUST_BE_NOT_THE_SAME_THE_CURRENT");
__publicField(CommonValidation, "REQUIRED_VALUE", "sys.msg.required value");
__publicField(CommonValidation, "SELECT_AT_LEAST_ONE_LEAF_NODE", "SYS.MSG.PLEASE_SELECT_AT_LEAST_ONE_LEAF_NODE");
__publicField(CommonValidation, "SELECT_AT_LEAST_ONE_NODE", "SYS.MSG.PLEASE_SELECT_ONE_NODE");
__publicField(CommonValidation, "CHECK_AT_LEAST_ONE_NODE", "SYS.MSG.PLEASE_CHECK_ONE_NODE");
__publicField(CommonValidation, "MIN_LENGTH", "SYS.MSG.VALUE_MUST_BE_AT_LEAST_%min%_CHARS");
__publicField(CommonValidation, "LENGTH_BETWEEN", "SYS.MSG.VALUE_MUST_BE_BETWEEN_%min_AND_%max_CHARS");
__publicField(CommonValidation, "INTEGER_NUMBER", "SYS.MSG.REQUIRED_INTEGER_NUMBER");
__publicField(CommonValidation, "INTEGER_NUMBER_IN_RANGE", "SYS.MSG.INTEGER_NUMBER_IN_RANGE");
__publicField(CommonValidation, "INVALID_EMAIL", "sys.msg.invalid email");
export { CommonValidation as C };
