import { error } from "./log"

export const restError = (err, status = 401, errorDetail) => {
    let body = {
        ...err,
    }

    if(errorDetail) {
        body = {...body, errorDetail: typeof errorDetail === 'string' ?  errorDetail : errorDetail.message}
    }

    const res = {
        status,
        body
    }
    
    error(res)
    return res
}


export const restOk = (bodyObj, status = 200) => {
    return {
        status,
        body: {
            ...bodyObj
        }
    }
}


export const restOkWithHeader = (bodyObj, headers, status = 200) => {
    return {
        status,
        headers,
        ok: true,
        body: {
            ...bodyObj
        }
    }
}