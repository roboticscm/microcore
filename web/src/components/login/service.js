export class AuthService {
    static login = async (param) => {
        return fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify(param)
        })
    }

    static logout = async (param) => {
        return fetch('/api/auth/logout', {
            method: 'post',
            body: JSON.stringify(param)
        })
    }
}