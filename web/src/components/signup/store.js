import { AuthService } from './service';

export class Store {
    signUp = (param) => {
        delete param.confirmPassword;
        return AuthService.signUp(param)
    }
}