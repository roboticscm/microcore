import { upsert, update } from '$lib/db/template';
import { encodePassword } from '$lib/encode';
import { fillNullIfEmpty } from '$lib/object';
import { restError, restOk } from '$lib/rest';
import { validateUpsertPartner } from './validation';
import { objectIsEmpty } from '$lib/object';

export const post = async ({request}) => {
    try {
        const body = fillNullIfEmpty(await request.json());

        const error = await validateUpsertPartner(body);
        if (!objectIsEmpty(error)) {
            return restError(error, 422, 'upsert partner validation error')
        }
        const bodyPassword = body.password;
        // save blank password for first time
        body.password = ' ';
        const res = await upsert(null, 'partner', body);
        
        const encodedPassword = encodePassword(`${res.id}.${res.createdAt}.${bodyPassword}`);
        await update(null, 'partner', {password: encodedPassword}, (builder) => builder.where({id: res.id}));
        delete res.password;
        return restOk(res);
    } catch (err) {
        return restError({
            unknownError: 'sys.msg.unkown error occurred while creating partner, please contract the administrator'
        }, 422, err)
    }

    
    
    
}