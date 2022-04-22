import _ from 'lodash';
import { StringUtil } from './string-util';
import JsonParseBigInt from 'json-parse-bigint'

export const normalizeObjectKey = (obj) => {
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

    return obj
}


export const fillNullIfEmpty = (obj) => {
    for (let field in obj) {
        if (_.isString(obj[field]) && (_.isEmpty(obj[field]) || !obj[field].trim().length)) {
            obj[field] = null;
        } else if (_.isObject(obj[field])) {
            fillNullIfEmpty(obj[field]);
        }
    }

    return obj;
}

export const objectIsEmpty = (obj) => {
    if (!obj) {
        return true;
    }

    if (Object.keys(obj).length > 0) {
        return false;
    }

    return true;
}

export const cloneObjct = (obj) => {
    return JsonParseBigInt(JSON.stringify(obj));
}

export const convertFieldToCamelcase = (obj) => {
    for (let field in obj) {
        let fieldValue = obj[field];
        if (_.isObject(fieldValue)) {
            convertFieldToCamelcase(fieldValue)
        } else if (_.isArray(fieldValue)) {
            for (const row of fieldValue) {
                convertFieldToCamelcase(row)
            }
        } else {
            if (field.includes('_')) {
                const newField = StringUtil.snakeToCamelCase(field);
                obj[newField] = fieldValue;
                delete obj[field];
            }
        }
    }
    return obj;
}

/**
 * 
 * @param {*} originArray 
 * @param {*} otherArray 
 * @returns [index1, index2] or undefined
 */
export const getDiffRowIndex = (originArray, otherArray) => {
    if (!Array.isArray(originArray) || !Array.isArray(otherArray)) {
        return undefined;
    }

    if(originArray.length !== otherArray.length) {
        throw Error('Two arrays are not of the same length')
    }

    const result = [];
    for(let i = 0; i < originArray.length; i++) {
        if(JSON.stringify(originArray[i]) !== JSON.stringify(otherArray[i])){
            result.push(i)
        }
    }

    return result;
}