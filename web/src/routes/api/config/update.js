import { restError, restOk } from '$lib/rest';
import { getKnexInstance } from '$lib/db/util';
import { checkAdminPrivileges, extractTokenPayload } from '$lib/token';

export const post = async ({ locals, request,  }) => {
    try {
        const body = await request.json();
        const payload = await extractTokenPayload(locals, request, body.deviceId);

        const error = checkAdminPrivileges(payload.accountType)
        if(error) {
            return restError(error, 401)
        }

        const updatedRows = await updateConfig(body.data)
        return restOk({
            updatedRows
        })
    } catch (err) {
        return restError({ unknownError: 'sys.msg.find config failed' }, 422, err)
    }
}

const updateConfig = (data) => {
    const knex = getKnexInstance();
    return new Promise(async (resolve, reject) => {
        try {
            const updatedRows = data.map((row) => {
                return knex.into('app_setting')
                    .update(row)
                    .where({id: row.id})
                    
            })
          
            const res = await Promise.all(updatedRows);
            resolve(res.reduce((x, y) => x + y))
        } catch (err) {
            reject(err)
        } finally {
            knex.destroy()
        }
    });
}