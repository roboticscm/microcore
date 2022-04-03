import { restError, restOkWithHeader } from '$lib/rest';
import { getKnexInstance } from '$lib/db/util';
import { verifyToken, extractDeviceDesc } from '/src/hooks';
import { setCookieHeader } from '$lib/authentication';

export const post = async ({ request }) => {
    try {
        const body = await request.json();
        const payload = await verifyToken(body.refreshToken, body.deviceId);
        //write login / logout detail and delete refresh token
        const deviceDesc = extractDeviceDesc(request);
        const loginDetailPayload = {
            createdBy: payload.userId,
            device: deviceDesc,
            type: 'LOGOUT',
            ip: body.ip || '',
        }
        const deleteRefreshTokenCond = (builder) => builder.where({ createdBy: payload.userId, device: deviceDesc })
        saveLogoutDetailAndDeleteRefreshToken(loginDetailPayload, deleteRefreshTokenCond);

        return restOkWithHeader({}, setCookieHeader('', false));
    } catch (err) {
        return restOkWithHeader({}, setCookieHeader('', false));
        // restError({ unknownError: 'sys.msg.logout failed' }, 422, err)
    }
}

const saveLogoutDetailAndDeleteRefreshToken = (loginDetailPayload, deleteCond) => {
    const knex = getKnexInstance();
    return new Promise((resolve, reject) => {
        knex.transaction((t) => {
            return knex('login_detail')
                .transacting(t)
                .insert(loginDetailPayload)
                .then(() => {
                    return knex('refresh_token')
                        .transacting(t)
                        .where((builder) => deleteCond(builder))
                        .delete()
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