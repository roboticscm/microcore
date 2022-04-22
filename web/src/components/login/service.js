import { post } from "$lib/http"

export class AuthService {
    static login = async (param) => {
        return post('auth/login', param, false, false);
    }

    static logout = async (param) => {
        return post('auth/logout', param)
    }
}