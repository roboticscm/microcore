import { AuthService } from './service';

export class Store {
    login = (param) => {
        return AuthService.login(param)
    }
}