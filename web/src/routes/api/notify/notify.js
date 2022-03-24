import { getKnexInstance } from '$lib/db/util';

export const get = async () => {
    try {
        const client = getKnexInstance().client;
        client.on('notification', (msg)=> {
            console.log(msg)
        })
        return {
            status: 200,
            body: {
                message: 'ok'
            }
        };

    } catch (err) {
        return {
            status: 422,
            body: {
                ...err,
            }
        };
    }

    
    
    
}