import { SDate } from "$lib/date";
import { buildBinanceHeader } from "$lib/merchant"
import { StringUtil } from "$lib/string-util";

export const post = async ({request}) => {    
    const req = await(request.json());
    const body = JSON.stringify(req);
    const timestamp = SDate.currentDateInMilli();
    const nonce = StringUtil.randomChars(32).toUpperCase()
    fetch(`${import.meta.env.VITE_BINANCE_HOST}/binancepay/openapi/v2/order`, {
        method: 'POST',
        headers:  buildBinanceHeader(timestamp, nonce, body),
        body: body
    }).then(async(res) => {
        console.log(await res.json())
    }).catch(async (err) => {
        console.log(await err.json())
    })
    return {
        body: buildBinanceHeader('abc')
    }
}