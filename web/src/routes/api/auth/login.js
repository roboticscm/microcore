import Coinpayments from 'coinpayments';
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
                return restError('sys.label.login failed')
            }
        } else {
            return restError('sys.label.login failed', 404, 'username does not existing')
        }
    } catch (err) {
        return restError('sys.label.login failed', 422, err)
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
    //     key: '33b260c94dd4a5b370eb27f085826f1525981ad6236cbf2ece075b2f10c5e5cf',
    //     secret: '503da81b80918e858122A31C7453C239Aa477749eAbeEf5Db231644bF39eeebD',
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