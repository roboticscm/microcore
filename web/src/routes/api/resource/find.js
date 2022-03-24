import { callFunc } from '$lib/db/template';
import { normalizeObjectKey } from '$lib/object';

export const get = async () => {
    try {
        const res = await callFunc('find_resource', 'json');
        if (res && res.length > 0) {
            return {
                status: 200,
                body: {
                    ...normalizeObjectKey(JSON.parse(res[0].json))
                }
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: {
                error: err
            }
        }
    }
}