import { verifyCode } from "$lib/2fa"

export const post = async ({request}) => {
    const body = await request.json();
    return {
        body: {
            valid: verifyCode(body.secret, body.token)
        }
    }
}