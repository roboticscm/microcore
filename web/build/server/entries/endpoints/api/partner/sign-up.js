import { u as upsert, a as update } from "../../../../chunks/template-a8e314dd.js";
import { r as restError, e as encodePassword, a as restOk } from "../../../../chunks/rest-843fbd2a.js";
import { f as fillNullIfEmpty, o as objectIsEmpty } from "../../../../chunks/object-381063f8.js";
import { validateUpsertPartner } from "./validation.js";
import "../../../../chunks/util-a143f07a.js";
import "knex";
import "knex-stringcase";
import "dotenv/config";
import "js-sha256";
import "lodash";
import "../../../../chunks/string-util-529e6b84.js";
import "uuid";
import "../../../../chunks/constants-ea9bcd9b.js";
import "handlebars";
import "json-parse-bigint";
import "../../../../chunks/common-validation-16e71553.js";
import "../../../../chunks/browser-231be779.js";
import "bowser";
import "moment";
const post = async ({ request }) => {
  try {
    const body = fillNullIfEmpty(await request.json());
    const error = await validateUpsertPartner(body);
    if (!objectIsEmpty(error)) {
      return restError(error, 422, "upsert partner validation error");
    }
    const bodyPassword = body.password;
    body.password = " ";
    const res = await upsert(null, "partner", body);
    const encodedPassword = encodePassword(`${res.id}.${res.createdAt}.${bodyPassword}`);
    await update(null, "partner", { password: encodedPassword }, (builder) => builder.where({ id: res.id }));
    delete res.password;
    return restOk(res);
  } catch (err) {
    return restError({
      unknownError: "sys.msg.unkown error occurred while creating partner, please contract the administrator"
    }, 422, err);
  }
};
export { post };
