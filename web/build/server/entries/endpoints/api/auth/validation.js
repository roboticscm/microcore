import { C as CommonValidation } from "../../../../chunks/common-validation-16e71553.js";
import "../../../../chunks/string-util-529e6b84.js";
import "uuid";
import "../../../../chunks/constants-ea9bcd9b.js";
import "handlebars";
import "../../../../chunks/browser-231be779.js";
import "bowser";
import "moment";
const validate = (form) => {
  const error = {};
  if (CommonValidation.isEmptyString(form.username)) {
    error.username = CommonValidation.REQUIRED_VALUE;
  }
  if (CommonValidation.isEmptyString(form.password)) {
    error.password = CommonValidation.REQUIRED_VALUE;
  }
  return error;
};
const vilidateLogin = (body) => {
  return validate(body);
};
export { vilidateLogin };
