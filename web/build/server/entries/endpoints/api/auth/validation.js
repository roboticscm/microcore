import { C as CommonValidation } from "../../../../chunks/common-validation-46216bd4.js";
import "../../../../chunks/string-util-9f2c94d9.js";
import "uuid";
import "../../../../chunks/constants-c334863d.js";
import "handlebars";
import "../../../../chunks/browser-904e0c5e.js";
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
