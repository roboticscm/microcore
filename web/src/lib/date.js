import { Browser } from './browser';
import moment from 'moment';
export class SDate {
  static NULL_DATE = -9999999999999;
  static MIN_DATE = -8888888888888;
  static MAX_DATE = 99999999999999;

  static convertMillisecondToDateString(millisecond) {
    if (!millisecond || millisecond === SDate.NULL_DATE) {
      return '';
    }
    if (typeof millisecond === 'string') {
      return millisecond;
    } else {
      const options = { month: '2-digit',day: '2-digit',year: 'numeric' };
      const date = new Date(millisecond);
      return date.toLocaleDateString('vi-VN', options);
    }
  }

  static convertMillisecondToShortDateString(millisecond) {
    if (!millisecond || millisecond === SDate.NULL_DATE) {
      return '';
    }

    const date = new Date(millisecond);
    return date.toLocaleString('vi-VN', {
      day: 'numeric'
    }) + '/' + date.toLocaleString('vi-VN', {
      month: 'numeric'
    }) + "/" + date.toLocaleString('vi-VN', {
      year: 'numeric'
    }).substring(2, 4);
  }

  static convertMillisecondToDateTimeString(millisecond) {
    if (!millisecond || millisecond === SDate.NULL_DATE) {
      return '';
    }

    const date = new Date(millisecond);
    //safari
    if (Browser.isSafari()) {
      return date.toLocaleString('vi-VN', {
        dateStyle: 'short',
      });
    }

    //other browser
    return (
      date.toLocaleString('vi-VN', {
        dateStyle: 'short',
      }) +
      ' ' +
      date.toLocaleString('vi-VN', {
        timeStyle: 'short',
      })
    );
  }

  static toDateString(date) {
    return date.toLocaleDateString('vi-VN');
  }

  static toDateTimeString(date) {
    return (
      date.toLocaleString('vi-VN', {
        dateStyle: 'short',
      }) +
      ' ' +
      date.toLocaleString('vi-VN', {
        timeStyle: 'short',
      })
    );
  }

  static currentDateInMilli() {
    return new Date().valueOf();
  }

  static subtractMonthFromNow (month) {
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
      return new Error('Invalid date');
    } else if (!ageInYear) {
      const ageInMonth = currentDate.getMonth() - date.getMonth();
      if (ageInMonth < 0) {
        return new Error('Invalid date');
      }
      return `${ageInMonth + 1} ${'SYS.LABEL.MONTH'.t()} ${'SYS.LABEL.AGE'.t()}`;
    }
    return `${ageInYear} ${'SYS.LABEL.AGE'.t()}`;;

  }

  static dateShortTimeShort(millisecond) {
    if (!millisecond || millisecond === SDate.NULL_DATE) {
      return '';
    }

    const date = new Date(millisecond);
    //safari
    if (Browser.isSafari()) {
      return date.toLocaleString('vi-VN', {
        dateStyle: 'short',
      });
    }

    //other browser
    return (
      date.toLocaleString('vi-VN', {
        dateStyle: 'short',
      }).substring(0,5) +
      ' ' +
      date.toLocaleString('vi-VN', {
        timeStyle: 'short',
      })
    );
  }

  static isValidDate = (dateOrStr) => {
    if (typeof dateOrStr === 'string') {
      return moment(dateOrStr, "DD/MM/YYYY", true).isValid()
    } else if (typeof dateOrStr === 'number') {
      return true;
    } else if (typeof dateOrStr.getMonth === 'function') {
      return true;
    }
    return false;
  }

  static toMilliSecond = (dateOrStr, format = "DD/MM/YYYY") => {
    if (typeof dateOrStr === 'string') {
      return moment(dateOrStr, "DD/MM/YYYY", true).valueOf();
    } else if (typeof dateOrStr.getMonth === 'function') {
      return dateOrStr.valueOf();
    }
      
  }
}
