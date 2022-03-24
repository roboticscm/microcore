import { validate } from '/src/components/login/validation';

export const vilidateLogin = (body) => {
    return validate(body);
}