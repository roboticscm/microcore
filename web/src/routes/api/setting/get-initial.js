import { restError, restOk } from '$lib/rest';
import { extractTokenPayload } from '$lib/token';
import { callFunc } from '$src/lib/db/template';
import { convertFieldToCamelcase } from '$src/lib/object';
import JsonParseBigInt from 'json-parse-bigint';

export const post = async ({ locals, request}) => {
    try {
        const body = await request.json();     
        const payload = await extractTokenPayload(locals, request, body.deviceId);
        const data = await getInitialUserSetting(payload.userId)
        return restOk({
            data
        })
    } catch (err) {
        return restError({ unknownError: 'sys.msg.get initial setting failed' }, 422, err)
    }
}

const getInitialUserSetting = (userId) => {
    return new Promise((resolve, reject) => {
        callFunc('find_initial_user_setting', 'json', [userId]).then((res) => {
            if(res && Array.isArray(res) && res.length > 0) {
                const array = JsonParseBigInt(res[0].json)
                if(array && Array.isArray(array) && array.length > 0) {
                    resolve(convertFieldToCamelcase(array[0]))
                } else {
                    resolve({})
                }
                
            } else {
                resolve({})
            }
        }).catch(err => reject(err))
    })
    
}