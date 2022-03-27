
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { verifyCode } from '$lib/2fa';
import { query } from '$lib/db/template';
import { replaceToken, encodePassword } from '$lib/encode';
import { restError, restOk } from '$lib/rest';

export const post = async ({ request }) => {
    try {
        const body = await request.json();   
        console.log(body)
        //write login / logout detail
        //delete refresh token
        return restOk({})
    } catch (err) {
        restError({unknownError: 'sys.msg.logout failed'}, 422, err)
    }
}