import { restError, restOk } from '$lib/rest';
import { getKnexInstance } from '$lib/db/util';
import { extractTokenPayload } from '$lib/token';

export const post = async ({ request }) => {
    try {
        const body = await request.json();
        const payload = await extractTokenPayload(request, body.deviceId);
        const deleteCond = (builder) => builder.where({branchId: body.branchId, createdBy: payload.userId, menuId: body.menuId})
            .whereIn('key', body.keys);

        const insertPayload = body.keys.map((it, index) => {
            return {
                branchId: body.branchId,
                menuId: body.menuId,
                key: it,
                value: body.values[index],
                createdBy: payload.userId, 
            };
        });

        saveSetting(deleteCond, insertPayload);

        return restOk({
            message: 'ok'
        })
    } catch (err) {
        restError({ unknownError: 'sys.msg.logout failed' }, 422, err)
    }
}

const saveSetting = (deleteCond, insertPayload) => {
    const knex = getKnexInstance();
    return new Promise((resolve, reject) => {
        knex.transaction((t) => {
            return knex('user_setting')
                .transacting(t)
                .where((builder) => deleteCond(builder))
                .delete()
                .then(() => {
                    return knex('user_setting')
                    .transacting(t)
                    .insert(insertPayload)
                });
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            knex.destroy();
        })
    });
}