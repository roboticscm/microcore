import { CommonValidation } from '$lib/common-validation';

export const validate = (form) => {
  const error = {};

  if (CommonValidation.isEmptyString(form.username)) {
    error.username = CommonValidation.REQUIRED_VALUE;
  }

  if (CommonValidation.isEmptyString(form.password)) {
    error.password = CommonValidation.REQUIRED_VALUE;
  }

  return error;
};
