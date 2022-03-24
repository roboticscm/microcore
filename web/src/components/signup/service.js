export class AuthService {
    static signUp = async (param) => {
        return fetch('/api/partner/sign-up', {
            method: 'post',
            body: JSON.stringify(param)
        })
    }
}