import { restError, restOk } from "$lib/rest";
import { needAdminLogin } from "$lib/token"

export const post = async ({request}) => {
    try {
        const body = await request.json();
        const error = await needAdminLogin(body.pathname, body.session);
        if(!error) {
            return restOk({
                ok: true
            })
        } else {
            return restError(error, error.status);
        }
        
    } catch (err) {
        return restError({unkownError: 'sys.msg.invalid session'}, 422, err);
    }
}