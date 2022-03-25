import { u as upsert, a as update } from "../../../../chunks/template-e5fd56e3.js";
import { r as restError, e as encodePassword, a as restOk } from "../../../../chunks/rest-e1481239.js";
import { f as fillNullIfEmpty, o as objectIsEmpty } from "../../../../chunks/object-e5321754.js";
import { validateUpsertPartner } from "./validation.js";
import "../../../../chunks/util-d19f6044.js";
import "knex";
import "knex-stringcase";
import "dotenv/config";
import "js-sha256";
import "lodash";
import "../../../../chunks/string-util-9f2c94d9.js";
import "uuid";
import "../../../../chunks/constants-c334863d.js";
import "handlebars";
import "json-parse-bigint";
import "../../../../chunks/common-validation-46216bd4.js";
import "../../../../chunks/browser-904e0c5e.js";
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
