
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { verifyCode } from '$lib/2fa';
import { query } from '$lib/db/template';
import { encodePassword } from '$lib/encode';
import { restError, restOk } from '$lib/rest';
import { vilidateLogin } from './validation';
import { objectIsEmpty } from '$lib/object';

export const post = async ({ request }) => {
    try {
       
        const body = await request.json();
        
        //validate
        const error = vilidateLogin(body);

        if (!objectIsEmpty(error)) {
            return restError(error, 422, 'login validation error')
        }
       
        const sql = `
            SELECT id, password, created_at as "createdAt"
            FROM partner
            WHERE username = ?
        `
        const param = [body.username];
        
        const res = await query(sql, param)
       
        if (res && Array.isArray(res) && res.length > 0) {
            const record = res[0];
            const password = encodePassword(`${record.id}.${record.createdAt}.${body.password}`);
            
            if (password === record.password) {
                const res = {
                    userId: record.id,
                    accessToken: 'access token',
                    loginInfo: {

                    }
                };
                
                return restOk(res)

            } else {
                return restError({unknownError: 'sys.msg.authentication failed'}, 401);
            }
        } else {
            return restError({unknownError: 'sys.msg.authentication failed'}, 404)
        }
    } catch (err) {
        return restError({unknownError: 'sys.msg.authentication failed'}, 422)
    }


    // console.log(request.headers.get('authorization'))

    // const secret = speakeasy.generateSecret({
    //     name: 'Infinity Trades Limited - roboticscm2018@gmail.com'
    // });

    // // console.log(secret);

    // return new Promise((resolve, reject) => {
    //     qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    //         if(err) {
    //             reject(err)
    //         }

    //         resolve({
    //             status: 200,
    //             body: {
    //                 message: 'SYS.MSG.LOGIN_SUCCESS',
    //                 qrcode: data
    //             }
    //         })
    //     });
    // });

    // const client = new Coinpayments({
    //     key: '',
    //     secret: '',
    // });
    // client.getBasicInfo().then((res) => console.log(res));
    // return {
    //     status: 200,
    //     body: {
    //         message: 'SYS.MSG.LOGIN_SUCCESS',
    //         secret
    //     }
    // };
}