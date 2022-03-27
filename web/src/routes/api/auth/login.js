
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { verifyCode } from '$lib/2fa';
import { query } from '$lib/db/template';
import { replaceToken, encodePassword } from '$lib/encode';
import { restError, restOk } from '$lib/rest';
import { vilidateLogin } from './validation';
import { objectIsEmpty } from '$lib/object';
import { generateToken, PRIVATE_KEY } from '/src/hooks';
import { getKnexInstance, createSystemFields } from '$lib/db/util';

// Login
export const post = async ({ request }) => {
    try {

        const body = await request.json();
        //validate
        const error = vilidateLogin(body);

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
                const accessToken = generateToken(PRIVATE_KEY, false, { userId: record.id, username: body.username })
                // generate refresh access token
                const refreshToken = generateToken(PRIVATE_KEY, false, { userId: record.id, username: body.username })

                // save refresh token and login detail
                body.deviceDesc = body.deviceDesc || 'unknown'
                const deleteOldRefreshTokenCond = (builder) => builder.where({ partnerId: record.id, device: body.deviceDesc })
                const refreshTokenPayload = {
                    partnerId: record.id,
                    token: refreshToken,
                    device: body.deviceDesc 
                }

                const ip = await getPublicIp();
                const loginDetailPayload = {
                    partnerId: record.id,
                    device: body.deviceDesc,
                    type: 'LOGIN',
                    ip
                }

                try {
                    saveRefreshTokenAndLoginDetail(record.id, deleteOldRefreshTokenCond, refreshTokenPayload, loginDetailPayload);
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
                    return restOk(res);
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

export const getPublicIp = async () => {
   const res = await fetch('https://api.ipify.org?format=json');
   return (await res.json()).ip;
}

const saveRefreshTokenAndLoginDetail = (userId, deleteOldRefreshTokenCond, refreshPayload, loginDetailPayload) => {
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
                        .insert({...refreshPayload, ...createSystemFields(userId)})
                })
                .then((res) => {
                    return knex('login_detail')
                        .insert({...loginDetailPayload, ...createSystemFields(userId) });
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