import { CommonValidation } from '$lib/common-validation';
import { config } from '/src/config/config';

export const validate = (form, serverSide = false) => {
  const error = {};

  if (CommonValidation.isEmptyString(form.username)) {
    error.username = CommonValidation.REQUIRED_VALUE;
  }

  if (CommonValidation.isEmptyString(form.email)) {
    error.email = CommonValidation.REQUIRED_VALUE;
  }

  if (!CommonValidation.isEmptyString(form.email) && !CommonValidation.isValidEmail(form.email)) {
    error.email = CommonValidation.INVALID_EMAIL;
  }

  if (!CommonValidation.isMinLength(form.password, config.minPasswordLength)) {
    error.password = CommonValidation.MIN_LENGTH;
  }

  if(!serverSide) {
    if (form.password !== form.confirmPassword) {
      error.confirmPassword = CommonValidation.PASSWORD_DOES_NOT_MATCH;
    }
  }
  
  if (form.referralId?.trim() && !CommonValidation.isIntegerNumber(form.referralId)) {
    error.referralId = CommonValidation.INTEGER_NUMBER;
  }

  return error;
};
