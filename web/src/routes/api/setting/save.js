import { restError, restOk } from '$lib/rest';
import { getKnexInstance } from '$lib/db/util';
import { extractTokenPayload } from '$lib/token';

export const post = async ({ locals, request }) => {
    try {
        const body = await request.json();
        const payload = await extractTokenPayload(locals,request, body.deviceId);
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
        return restError({ unknownError: 'sys.msg.save setting failed' }, 422, err)
    }
}

const saveSetting = (deleteCond, insertPayload) => {
    const knex = getKnexInstance();
    return new Promise((resolve, reject) => {
        knex.transaction((t) => {
            knex('user_setting')
                .where((builder) => deleteCond(builder))
                .delete()
                .transacting(t)
                .then(() => {
                    return knex('user_setting')
                    .insert(insertPayload)
                    .transacting(t)
                })
                .then(t.commit)
                .catch(t.rollback);
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            knex.destroy();
        })
    });
}