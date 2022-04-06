import { validate } from "$components/signup/validation";
import { isExistedValue, isDuplicatedValue } from '$lib/db/util';
import { objectIsEmpty } from '$lib/object';


export const validateUpsertPartner = async (body) => {
    //client validate
    const error = validate(body, true);
    
    if(!objectIsEmpty(error)) {
        return error;
    }
   
    try {
        //server validate
        // update mode
        if (body.id) {
            const isDuplicatedUsername = await isDuplicatedValue('partner', 'username', body.username, body.id)
            if (isDuplicatedUsername) {
                error.username = 'sys.label.username is duplicated';
            }

            const isDuplicatedEmail = await isDuplicatedValue('partner', 'email', body.email, body.id)
            if (isDuplicatedEmail) {
                error.email = 'sys.label.email is duplicated';
            }
  
        } else {
           
            const isExistedUsername = await isExistedValue('partner', 'username', body.username)
            if (isExistedUsername) {
                error.username = 'sys.label.username is existed';
            }

            const isExistedEmail = await isExistedValue('partner', 'email', body.email)
            if (isExistedEmail) {
                error.email = 'sys.label.email is existed';
            }
        }

        return error
    } catch (err) {
        return {
            ...error,
            serverError: err,
        }
    }
}