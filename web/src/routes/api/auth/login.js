
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { verifyCode } from '$lib/2fa';
import { query } from '$lib/db/template';
import { replaceToken, encodePassword } from '$lib/encode';
import { restError, restOkWithHeader } from '$lib/rest';
import { validateLogin } from './validation';
import { objectIsEmpty } from '$lib/object';
import { generateToken, extractDeviceDesc } from '/src/hooks';
import { getKnexInstance } from '$lib/db/util';
import { dev } from '$app/env';
import { setCookieHeader } from '$lib/authentication';

// Login
export const post = async ({ request }) => {
    try {
        const body = await request.json();

        //validate
        const error = validateLogin(body);

        if (!objectIsEmpty(error)) {
            return restError(error, 422, 'login validation error')
        }

        const sql = `
            SELECT id, password, (last_name || ' ' || first_name )as "displayName", account_avatar as "accountAvatar", created_at as "createdAt"
            FROM partner
            WHERE username = ?
        `
        const param = [body.username];

        const res = await query(sql, param)

        if (res && Array.isArray(res) && res.length > 0) {
            const record = res[0];
            const password = encodePassword(`${record.id}.${record.createdAt}.${body.password}`);
            if (password === record.password) {
                // generate token access token
                const accessToken = generateToken(false, { userId: record.id, username: body.username })
                // generate refresh access token
                const refreshToken = generateToken(false, { userId: record.id, username: body.username });
                if(dev) {
                    console.log('accessToken: ', replaceToken(accessToken, body.deviceId),);
                    console.log('refreshToken: ', replaceToken(refreshToken, body.deviceId),);
                }
                // save refresh token and login detail
                const deviceDesc = extractDeviceDesc(request);
                const deleteOldRefreshTokenCond = (builder) => builder.where({ createdBy: record.id, device: deviceDesc })
                const refreshTokenPayload = {
                    createdBy: record.id,
                    token: refreshToken,
                    device: deviceDesc 
                }

                const loginDetailPayload = {
                    createdBy: record.id,
                    device: deviceDesc,
                    type: 'LOGIN',
                    ip: body.ip,
                }

                try {
                    saveRefreshTokenAndLoginDetail(deleteOldRefreshTokenCond, refreshTokenPayload, loginDetailPayload);
                    const res = {
                        accessToken: replaceToken(accessToken, body.deviceId),
                        refreshToken: replaceToken(refreshToken, body.deviceId),
                        loginInfo: {
                            userId: record.id,
                            username: body.username,
                            displayName: record.displayName,
                            accountAvatar: record.accountAvatar,
                        }
                    };
                    
                    return restOkWithHeader(res, setCookieHeader(replaceToken(accessToken, body.deviceId), !dev), 302);
                } catch (err) {
                    return restError({ unknownError: 'sys.msg.authentication failed' }, 422, err)
                }
            } else {
                return restError({ unknownError: 'sys.msg.authentication failed' }, 401);
            }
        } else {
            return restError({ unknownError: 'sys.msg.authentication failed' }, 404)
        }
    } catch (err) {
        return restError({ unknownError: 'sys.msg.authentication failed' }, 422, err)
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

const saveRefreshTokenAndLoginDetail = (deleteOldRefreshTokenCond, refreshPayload, loginDetailPayload) => {
    const knex = getKnexInstance();
    return new Promise((resolve, reject) => {
        knex.transaction((t) => {
            return knex('refresh_token')
                .transacting(t)
                .where((builder) => {
                    return deleteOldRefreshTokenCond(builder)
                })
                .delete().then(() => {
                    return knex('refresh_token')
                        .transacting(t)
                        .insert(refreshPayload)
                })
                .then((res) => {
                    return knex('login_detail')
                        .insert(loginDetailPayload);
                })
                .then(t.commit)
                .catch((err) => {
                    t.rollback();
                    reject(err)
                });
        }).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
            .finally(() => {
                knex.destroy();
            })
    });
}

