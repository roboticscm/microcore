
import { StringUtil } from "./string-util"
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import crypto from 'crypto';

export const buildBinanceHeader = (timestamp, nonce, body) => {
    return {
        "content-type": "application/json",
        "BinancePay-Timestamp": timestamp,
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": import.meta.env.VITE_BINANCE_API_KEY,
        "BinancePay-Signature": buildBinancePaySignature(timestamp, nonce, body)
    }
}

const buildBinancePaySignature = (timestamp, nonce, body) => {
    const payloadToSign = timestamp + "\n" + nonce + "\n" + body + "\n";
    return crypto
        .createHmac('sha512', import.meta.env.VITE_BINANCE_API_SECRET_KEY)
        .update(payloadToSign)
        .digest('hex').toUpperCase();
}

