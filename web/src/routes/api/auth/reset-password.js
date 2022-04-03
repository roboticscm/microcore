import { getKnexInstance } from "$lib/db/util";
import { encodePassword } from "$lib/encode";
import { restError, restOk } from "$lib/rest";
import { objectIsEmpty } from '$lib/object';
import { validateResetPassoword } from './validation';

export const post = async ({ request }) => {
    try {
        const body = await request.json();

        //validation
        const error = validateResetPassoword(body);

        if (!objectIsEmpty(error)) {
            return restError(error, 422, 'reset passowrd validation error')
        }
        
        //get user from auth_token which the session
        const user = await getUser(body.session)
        // generate and update password

        const password = encodePassword(`${user.id}.${user.created_at}.${body.password}`);
        await updatePassword(user.id, password);
        //save reset password history, delete reset link
        saveResetPasswordHistory(user.id, body.ip, body.deviceDesc, body.session)

        return restOk({
            message: 'sys.msg.reset password successful'
        })
    } catch (err) {
        return restError({ unknownError: 'reset password failed. try again' }, 401, err)
    };
}


const getUser = async (session) => {
    const sql = `
        SELECT ut.created_by as id,
            p.created_at 
        FROM auth_token ut
        JOIN partner p ON p.id = ut.created_by
        WHERE ut.uuid = ?
    `
    const knex = getKnexInstance();

    return new Promise((resolve, reject) => {
        knex.raw(sql, [session])
            .then((res) => {
                if(res && res.rows && res.rows.length > 0) {
                    resolve(res.rows[0])
                } else {
                    reject({unknownError: 'sys.msg.link expired, please try again'})
                }
            }).catch(reject)
            .finally(() => knex.destroy())
    });
}

const updatePassword = async (userId, password) => {
    const knex = getKnexInstance();

    return new Promise((resolve, reject) => {
        knex('partner')
            .update({password})
            .where({id: userId})
            .then((res) => {
                resolve('ok')
            }).catch(reject)
            .finally(() => knex.destroy())
    });
}

const saveResetPasswordHistory = (userId, ip, deviceDesc, session) => {
    const loginDetailPayload = {
        createdBy: userId,
        device: deviceDesc,
        type: 'RESET_PASSWORD',
        ip,
    }

    const knex = getKnexInstance();
    return new Promise((resolve, reject) => {
        knex.transaction((t) => {
            return knex('login_detail')
                .transacting(t)
                .insert(loginDetailPayload)
                .then(() => {
                    return knex('auth_token')
                        .delete()
                        .where({uuid: session})
                })
                .then(() => {
                    t.commit;
                }).catch(() => t.rollback());
        }).then(resolve)
        .catch((reject))
        .finally(() => knex.destroy());
    });
}