import { AuthService } from './service';

export class Store {
    forgotPassword = (param) => {
        return AuthService.forgotPassword(param)
    }
}