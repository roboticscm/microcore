import { CommonValidation } from '$lib/common-validation';

export const validate = (form) => {
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

  if (CommonValidation.isEmptyString(form.password)) {
    error.password = CommonValidation.REQUIRED_VALUE;
  }

  if (form.password !== form.confirmPassword) {
    error.confirmPassword = CommonValidation.PASSWORD_DOES_NOT_MATCH;
  }

  return error;
};
