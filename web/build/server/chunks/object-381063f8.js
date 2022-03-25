import _ from "lodash";
import { S as StringUtil } from "./string-util-529e6b84.js";
import "json-parse-bigint";
const normalizeObjectKey = (obj) => {
  for (let field in obj) {
    const newField = StringUtil.normalizeKey(field);
    if (newField !== field) {
      obj[newField] = obj[field];
      delete obj[field];
    }
    if (_.isObject(obj[newField])) {
      for (let subField in obj[newField]) {
        const newSubField = StringUtil.normalizeKey(subField);
        if (newSubField !== subField) {
          obj[newField][newSubField] = obj[newField][subField];
          delete obj[newField][subField];
        }
      }
    }
  }
  return obj;
};
const fillNullIfEmpty = (obj) => {
  for (let field in obj) {
    if (_.isString(obj[field]) && (_.isEmpty(obj[field]) || !obj[field].trim().length)) {
      obj[field] = null;
    } else if (_.isObject(obj[field])) {
      fillNullIfEmpty(obj[field]);
    }
  }
  return obj;
};
const objectIsEmpty = (obj) => {
  if (!obj) {
    return true;
  }
  if (Object.keys(obj).length > 0) {
    return false;
  }
  return true;
};
export { fillNullIfEmpty as f, normalizeObjectKey as n, objectIsEmpty as o };
