import { post } from "$src/lib/http"

export class AuthService {
    static signUp = async (param) => {
        return post('partner/sign-up', param, false, false)
    }
}