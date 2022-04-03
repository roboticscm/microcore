
import { sendMail } from '$lib/mail';
import { restError, restOk } from '$lib/rest';


export const post = async ({ request }) => {
    try {
        const body = await request.json();
        const res = await sendMail(body);
        return restOk(res)
    } catch (err) {
        return restError({ unknownError: 'sys.msg.authentication failed' }, 422, err)
    }
}


