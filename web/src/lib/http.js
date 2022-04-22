import { Browser } from "./browser"
import { buildHeader } from "./local-storage"

export const fetchPost = async (fetch, url, body, ) => {
    let payload = {
        method: 'post',
        body: JSON.stringify(body)
    }

    return new Promise((resove, reject) => {
        fetch(`${import.meta.env.VITE_API_PREFIX}${url}`, payload).then(async (res) => {
            if (res.ok) {
                resove({
                    staus: res.status,
                    body: await res.json()
                })
            } else {
                if (res.status === 404) {
                    reject({
                        status: 404,
                        unknownError: res.statusText,
                        errorDetail: res.url
                    })
                } else {
                    if(res.body.locked) {
                        reject(res)
                    } else {
                        reject(await res.json())
                    }
                }
            }
        }).catch(err => {
            if (err.status === 404) {
                reject({
                    status: 404,
                    unknownError: err.errorText,
                    errorDetail: err.message
                })
            } else {
                reject(err)
            }
        })
    })
}

export const post = async (url, body, authenticated = true, sendDeviceId = true) => {
    if(sendDeviceId) {
        body = { ...body ,deviceId: Browser.getBrowserID()}
    }

    let payload = {
        method: 'post',
        body: JSON.stringify(body)
    }

    if(authenticated) {
        payload = {...payload, headers: buildHeader()}
    }

    return new Promise((resove, reject) => {
        fetch(`${import.meta.env.VITE_API_PREFIX}${url}`, payload).then(async (res) => {
            if (res.ok) {
                resove({
                    staus: res.status,
                    body: await res.json()
                })
            } else {
                if (res.status === 404) {
                    reject({
                        status: 404,
                        unknownError: res.statusText,
                        errorDetail: res.url
                    })
                } else {
                    if(res.body.locked) {
                        reject(res)
                    } else {
                        reject(await res.json())
                    }
                }
            }
        }).catch(err => {
            if (err.status === 404) {
                reject({
                    status: 404,
                    unknownError: err.errorText,
                    errorDetail: err.message
                })
            } else {
                reject(err)
            }
        })
    })
}