import { AuthService } from './service';

export class Store {
    login = (param) => {
        return AuthService.login(param)
    }

    getNewId = () => {
        return new Promise((resolve, reject) => {
            resolve(10000000000000000000);
        })
    }
}