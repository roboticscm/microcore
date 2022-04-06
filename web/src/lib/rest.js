export const restError = (error, status = 401, errorDetail) => {
    console.error(errorDetail || error)
    return {
        status,
        body: {
            error,
            errorDetail
        }
    }
}


export const restOk = (bodyObj, status = 200) => {
    return {
        status,
        body: {
           ...bodyObj
        }
    }
}


export const restOkWithHeader = (bodyObj, headers, status=302) => {
    return {
        status,
        headers,
        body: {
           ...bodyObj
        }
    }
}