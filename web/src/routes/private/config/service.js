import { post } from "$src/lib/http"

export class ConfigService {
   
    static update = async (body) => {
        return post('config/update', {data: body})
    }
}