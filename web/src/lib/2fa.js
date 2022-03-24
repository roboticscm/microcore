import speakeasy from 'speakeasy';

export const verifyCode = (secret, token) => {
    const result = speakeasy.totp.verify({
        secret,
        token,
        encoding: 'ascii'
    });
    console.log('result ', result);
    return result;
}