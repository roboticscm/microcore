import { restError, restOk, restOkWithHeader } from '$lib/rest';
import { getKnexInstance } from '$lib/db/util';
import { setCookieHeader } from '$src/hooks';
import { verifyToken } from '$lib/token';
import { extractDeviceDesc } from '$lib/browser';
import { error } from '$src/lib/log';

export const post = async ({ request, locals }) => {
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
        await saveLogoutDetailAndDeleteRefreshToken(loginDetailPayload, deleteRefreshTokenCond);

        locals.data = null;
        return restOkWithHeader({}, { ...setCookieHeader(''), localtion: '/' });
    } catch (err) {
        error(err)
        locals.data = null;
        return restOkWithHeader({}, setCookieHeader(''));
    }
}

const saveLogoutDetailAndDeleteRefreshToken = (loginDetailPayload, deleteCond) => {
    const knex = getKnexInstance();
    return new Promise((resolve, reject) => {
        knex.transaction((t) => {
            knex('login_detail')
                .insert(loginDetailPayload)
                .transacting(t)
                .then(() => {
                    return knex('refresh_token')
                        .where((builder) => deleteCond(builder))
                        .delete()
                        .transacting(t)
                })
                .then(t.commit)
                .catch(t.rollback)
        }).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
            .finally(() => {
                knex.destroy();
            })
    });
}