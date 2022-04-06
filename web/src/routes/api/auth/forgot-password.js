import { restError, restOk } from '$lib/rest';
import { getKnexInstance } from '$lib/db/util';
import { validateForgotPassoword } from './validation';
import { objectIsEmpty } from '$lib/object';
import { sendMail } from '$lib/mail';
import { config } from '$src/config/config';


export const post = async ({ request }) => {
    try {
        const body = await request.json();
        
         //validate
         const error = validateForgotPassoword(body);

         if (!objectIsEmpty(error)) {
             return restError(error, 422, 'forgot passowrd validation error')
         }

        //insert new record containing uuid
        const generatedUUID = await  insertAuthToken(body.email)

        //send an email to reset password
        const link= `${config.fullDomain}?session=${generatedUUID}`
        const options = {
            toList: [body.email],
            subject: body.subject,
            html: `${body.html}<h3 style="color: green;"><a href="${link}">${link}</a></h3>`
        }
        const res = await sendForgotEmail(options)
        return restOk(res)
    } catch (err) {
        return restError({ unknownError: 'sys.msg.forgot password failed' }, 422, err)
    }
}

const insertAuthToken = (email) => {
    const knex = getKnexInstance();
    return new Promise((resolve, reject) => {
        knex.raw('SELECT id FROM partner WHERE email=?', [email])
            .then((res) => {    
                if(res.rows && res.rows.length > 0) {
                    const userId = res.rows[0].id;
                    knex('auth_token')
                        .insert({createdBy: userId})
                        .returning('*')
                        .then((res) => {
                            resolve(res[0].uuid)
                        }).catch(reject)
                } else {
                    reject('sys.msg.email does not existed');
                }
                
            }).finally(() => () => knex.destroy());
    
    });
}

const sendForgotEmail = async (options) => {
    return sendMail(options)
}