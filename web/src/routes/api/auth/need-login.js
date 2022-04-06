import { restError, restOk } from "$lib/rest";
import { needLogin } from "$lib/token"

export const post = async ({request}) => {
    try {
        const body = await request.json();
        const error = await needLogin(body.pathname, body.session);
        if(!error) {
            return restOk({
                ok: true
            })
        } else {
            return restError(error, 422);
        }
        
    } catch (err) {
        return restError({unkownError: 'sys.msg.invalid session'}, 422, err);
    }
}