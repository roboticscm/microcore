import { post } from "$lib/http"

export class AuthService {
    static forgotPassword = async (param) => {
        return post('auth/forgot-password', param, false, false);
    }

}