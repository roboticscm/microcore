import { AuthService } from './service';

export class Store {
    resetPassword = (param) => {
        delete param.confirmPassword;
        return AuthService.resetPassword(param)
    }
}