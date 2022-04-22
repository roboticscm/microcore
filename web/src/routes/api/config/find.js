import { restError, restOk } from '$lib/rest';
import { getKnexInstance } from '$lib/db/util';
import { checkAdminPrivileges, extractTokenPayload } from '$lib/token';
export const post = async ({ locals, request, }) => {
    try {
        const body = await request.json();
        const payload = await extractTokenPayload(locals, request, body.deviceId);

        const error = checkAdminPrivileges(payload.accountType)
        if (error) {
            return restError(error, 401)
        }

        const data = await findConfig(body.branchId, body.menuId,)
        return restOk({
            data
        })
    } catch (err) {
        return restError({ unknownError: 'sys.msg.find config failed' }, 422, err)
    }
}

const findConfig = (branchId, menuId) => {
    const knex = getKnexInstance();
    return new Promise((resolve, reject) => {
        knex('app_setting')
            .select()
            .where({ branchId, menuId })
            .andWhere('disabled', '<>', true)
            .orderBy([{ column: 'sort', order: 'asc' }, { column: 'created_at', order: 'desc' }])
            .then((res) => {
                const transformed = (res || []).map(it => {
                    switch (it.valueDataType) {
                        case 'boolean':
                            it.value = JSON.parse(it.value.toLowerCase())
                            break;
                        case 'number':
                            it.value = it.value !== null ? +it.value : it.value
                            break;
                    }

                    return it;
                })
                resolve(transformed)
            }).catch((err) => reject(err))
            .finally(() => knex.destroy());
    });
}