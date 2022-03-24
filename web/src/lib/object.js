import _ from 'lodash';
import { StringUtil  } from './string-util';
import JsonParseBigInt from 'json-parse-bigint'

export const normalizeObjectKey = (obj) => {
    for(let field in obj) {
        const newField = StringUtil.normalizeKey(field);
        if(newField !== field) {
            obj[newField] = obj[field];
            delete obj[field];
        }
        

        if (_.isObject(obj[newField])) {
            for (let subField in obj[newField]) {
                const newSubField = StringUtil.normalizeKey(subField);
                if(newSubField !== subField) {
                    obj[newField][newSubField] = obj[newField][subField];
                    delete obj[newField][subField];
                }
                
            }
        }
    }

    return obj
}


export const fillNullIfEmpty = (obj) => {
    for(let field in obj) {
        if(_.isString(obj[field]) && (_.isEmpty(obj[field]) || !obj[field].trim().length )) {
            obj[field] = null;
        } else if (_.isObject(obj[field])) {
            fillNullIfEmpty(obj[field]);
        }
    }

    return obj;
}

export const objectIsEmpty = (obj) => {
    if (!obj){
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