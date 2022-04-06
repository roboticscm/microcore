import { SDate } from "./date"
import { StringUtil } from "./string-util"
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

export const buildBinanceHeader = (body) => {
    const timestamp = SDate.currentDateInMilli();
    const nonce = StringUtil.randomChars(32).toUpperCase()
    return {
        "content-type": "application/json",
        "BinancePay-Timestamp": timestamp,
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": import.meta.env.VITE_BINANCE_API_KEY,
        "BinancePay-Signature": buildBinancePaySignature(timestamp, nonce, body)
    }
}

const buildBinancePaySignature = (timestamp, nonce, body) => {
    const payload = timestamp + "\n" + nonce + "\n" + body + "\n";
    const hmac = Base64.stringify(hmacSHA512(payload, import.meta.env.VITE_BINANCE_API_SECRET_KEY));
    return StringUtil.toHex(hmac).toUpperCase();
}

