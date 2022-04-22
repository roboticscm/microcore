import { post } from "$lib/http"

export class AuthService {
    static resetPassword = async (param) => {
        return post('auth/reset-password', param, false, false);
    }
}