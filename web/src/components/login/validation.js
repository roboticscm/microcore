import { CommonValidation } from '$lib/common-validation';
import { config } from '/src/config/config';

export const validate = (form, serverSide = false) => {
  const error = {};

  if (CommonValidation.isEmptyString(form.username)) {
    error.username = CommonValidation.REQUIRED_VALUE;
  }

  if (!CommonValidation.isMinLength(form.password, config.minPasswordLength)) {
    error.password = CommonValidation.MIN_LENGTH;
  }

  return error;
};
