import { validate as loginValidate } from '/src/components/login/validation';
import { validate as forgotPasswordValidate } from '/src/components/forgot-password/validation';
import { validate as resetPasswordValidate } from '/src/components/reset-password/validation';

export const validateLogin = (body) => {
    return loginValidate(body, true);
}

export const validateForgotPassoword = (body) => {
    return forgotPasswordValidate(body, true);
}

export const validateResetPassoword = (body) => {
    return resetPasswordValidate(body, true);
}