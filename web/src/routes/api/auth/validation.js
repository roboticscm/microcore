import { validate as loginValidate } from '$components/login/validation';
import { validate as forgotPasswordValidate } from '$components/forgot-password/validation';
import { validate as resetPasswordValidate } from '$components/reset-password/validation';

export const validateLogin = (body) => {
    return loginValidate(body, true);
}

export const validateForgotPassoword = (body) => {
    return forgotPasswordValidate(body, true);
}

export const validateResetPassoword = (body) => {
    return resetPasswordValidate(body, true);
}