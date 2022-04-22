import { restError, restOk } from '$lib/rest';
import { getKnexInstance } from '$lib/db/util';
import { extractTokenPayload } from '$lib/token';

export const post = async ({ locals, request,  }) => {
    try {
        const body = await request.json();
        const payload = await extractTokenPayload(locals, request, body.deviceId);

        const data = await findSetting(payload.userId, body.branchId, body.menuId,)
        return restOk({
            data
        })
    } catch (err) {
        return restError({ unknownError: 'sys.msg.find setting failed' }, 422, err)
    }
}

const findSetting = (userId, branchId, menuId) => {
    const knex = getKnexInstance();
    return new Promise((resolve, reject) => {
        knex('user_setting')
            .select()
            .where({ createdBy: userId, branchId, menuId })
            .then((res) => {
                resolve(res)
            }).catch((err) => reject(err))
            .finally(() => knex.destroy());
    });
}