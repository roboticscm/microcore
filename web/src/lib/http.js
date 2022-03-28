import { Browser } from "./browser"
import { buildHeader } from "./local-storage"

export const post = async (url, body) => {
    body = {...body, deviceId: Browser.getBrowserID()}
    return fetch(url, {
        method: 'post',
        headers: buildHeader(),
        body: JSON.stringify(body)
    })
}