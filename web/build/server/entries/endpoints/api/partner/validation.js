import { C as CommonValidation } from "../../../../chunks/common-validation-46216bd4.js";
import { i as isDuplicatedValue, a as isExistedValue } from "../../../../chunks/util-d19f6044.js";
import { o as objectIsEmpty } from "../../../../chunks/object-e5321754.js";
import "../../../../chunks/string-util-9f2c94d9.js";
import "uuid";
import "../../../../chunks/constants-c334863d.js";
import "handlebars";
import "../../../../chunks/browser-904e0c5e.js";
import "bowser";
import "moment";
import "knex";
import "knex-stringcase";
import "dotenv/config";
import "lodash";
import "json-parse-bigint";
const validate = (form) => {
  const error = {};
  if (CommonValidation.isEmptyString(form.username)) {
    error.username = CommonValidation.REQUIRED_VALUE;
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
const validateUpsertPartner = async (body) => {
  const error = validate(body);
  delete error.confirmPassword;
  if (!objectIsEmpty(error)) {
    return error;
  }
  try {
    if (body.id) {
      const isDuplicatedUsername = await isDuplicatedValue("partner", "username", body.username, body.id);
      if (isDuplicatedUsername) {
        error.username = "sys.label.username is duplicated";
      }
      const isDuplicatedEmail = await isDuplicatedValue("partner", "email", body.email, body.id);
      if (isDuplicatedEmail) {
        error.email = "sys.label.email is duplicated";
      }
    } else {
      const isExistedUsername = await isExistedValue("partner", "username", body.username);
      if (isExistedUsername) {
        error.username = "sys.label.username is existed";
      }
      const isExistedEmail = await isExistedValue("partner", "email", body.email);
      if (isExistedEmail) {
        error.email = "sys.label.email is existed";
      }
    }
    return error;
  } catch (err) {
    return {
      ...error,
      serverError: err
    };
  }
};
export { validateUpsertPartner };
