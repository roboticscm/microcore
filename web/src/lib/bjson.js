import JSONbigString from 'json-bigint-x';

export class BJSON {
  static stringify = (obj) => {
    return JSONbigString.stringify(obj);
  };

  static parse = (json) => {
    return JSONbigString.parse(json);
  };

  static isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
}
