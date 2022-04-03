import { post } from "$lib/http"

export class AuthService {
    static forgotPassword = async (param) => {
        return post('/api/auth/forgot-password', param);
    }

}