import { restError, restOk } from "$lib/rest";
import { needLogin } from "$lib/token"

export const post = async ({request}) => {
    try {
        const body = await request.json();
        const res = await needLogin(body.pathname, body.session);
        if(res.ok) {
            return restOk({
                ok: true,
                data: res
            })
        } else {
            return restError(res, res.status);
        }
        
    } catch (err) {
        return restError({unkownError: 'sys.msg.invalid session'}, 422, err);
    }
}