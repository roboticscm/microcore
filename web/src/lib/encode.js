import { sha256 } from 'js-sha256';

export const encodePassword = (password) => {
    return sha256(password);
}

export const replaceToken = (token, salt) => {
    return token.insertAt(token.length/2, salt);
}