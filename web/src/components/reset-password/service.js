import { post } from "$lib/http"

export class AuthService {
    static resetPassword = async (param) => {
        return post('/api/auth/reset-password', param);
    }
}