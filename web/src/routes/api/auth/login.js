
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { verifyCode } from '$lib/2fa';
import { query } from '$lib/db/template';
import { replaceToken, encodePassword } from '$lib/encode';
import { restError, restOk, restOkWithHeader } from '$lib/rest';
import { validateLogin } from './validation';
import { objectIsEmpty } from '$lib/object';
import { setCookieHeader } from '$src/hooks';
import { generateToken } from '$lib/token';
import { extractDeviceDesc } from '$lib/browser';
import { getKnexInstance } from '$lib/db/util';
import { dev } from '$app/env';

// Login
export const post = async ({ request, locals }) => {
    try {
        const body = await request.json();

        //validate
        const error = validateLogin(body);

        if (!objectIsEmpty(error)) {
            return restError(error, 422, { message: 'login validation error' })
        }

        const sql = `
            SELECT id, account_type as "accountType", password, (last_name || ' ' || first_name )as "displayName", account_avatar as "accountAvatar", created_at as "createdAt"
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
                const accessToken = generateToken(false, { userId: record.id, username: body.username, accountType: record.accountType })
                // generate refresh access token
                const refreshToken = generateToken(true, { userId: record.id, username: body.username, accountType: record.accountType });
                if (dev) {
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
                    await saveRefreshTokenAndLoginDetail(deleteOldRefreshTokenCond, refreshTokenPayload, loginDetailPayload);
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
                    locals.data = {
                        userId: record.id,
                        username: body.username,
                        deviceId: body.deviceId,
                        accessToken: replaceToken(accessToken, body.deviceId),
                    }

                    return restOkWithHeader(res, { ...setCookieHeader(locals.data) });
                } catch (err) {
                    return restError({ unknownError: 'sys.msg.authentication failed' }, 422, err)
                }
            } else {
                return restError({ unknownError: 'sys.msg.authentication failed' }, 401, { message: 'sys.msg.username or password does not match' });
            }
        } else {
            return restError({ unknownError: 'sys.msg.authentication failed' }, 404, { message: 'sys.msg.username does not existed' })
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
            knex('refresh_token')
                .where((builder) => {
                    return deleteOldRefreshTokenCond(builder)
                })
                .delete()
                .transacting(t)
                .then(() => {
                    return knex('refresh_token')
                        .insert(refreshPayload)
                        .transacting(t)
                })
                .then((res) => {
                    return knex('login_detail')
                        .insert(loginDetailPayload)
                        .transacting(t);
                })
                .then(t.commit)
                .catch(t.rollback);
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            knex.destroy();
        })
    });
}

