import { CommonValidation } from '$lib/common-validation';
import { config } from '/src/config/config';

export const validate = (form, serverSide = false) => {
  const error = {};

  if (!CommonValidation.isMinLength(form.password, config.minPasswordLength)) {
    error.password = CommonValidation.MIN_LENGTH;
  }

  if(!serverSide) {
    if (form.password !== form.confirmPassword) {
      error.confirmPassword = CommonValidation.PASSWORD_DOES_NOT_MATCH;
    }
  }

  if (CommonValidation.isEmptyString(form.session)) {
    error.session = CommonValidation.REQUIRED_VALUE;
  }

  return error;
};
