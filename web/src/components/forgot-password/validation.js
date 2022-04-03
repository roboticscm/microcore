import { CommonValidation } from '$lib/common-validation';

export const validate = (form, serverSide = false) => {
  const error = {};

  if (CommonValidation.isEmptyString(form.email)) {
    error.email = CommonValidation.REQUIRED_VALUE;
  }

  if (!CommonValidation.isEmptyString(form.email) && !CommonValidation.isValidEmail(form.email)) {
    error.email = CommonValidation.INVALID_EMAIL;
  }

  return error;
};
