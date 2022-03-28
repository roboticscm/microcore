import { post } from "$lib/http"

export class AuthService {
    static login = async (param) => {
        return post('/api/auth/login', param);
    }

    static logout = async (param) => {
        return post('/api/auth/logout', param)
    }
}