import "coinpayments";
import "speakeasy";
import "qrcode";
import { q as query } from "../../../../chunks/template-a8e314dd.js";
import { r as restError, e as encodePassword, a as restOk } from "../../../../chunks/rest-843fbd2a.js";
import { vilidateLogin } from "./validation.js";
import { o as objectIsEmpty } from "../../../../chunks/object-381063f8.js";
import "../../../../chunks/util-a143f07a.js";
import "knex";
import "knex-stringcase";
import "dotenv/config";
import "js-sha256";
import "../../../../chunks/common-validation-16e71553.js";
import "../../../../chunks/string-util-529e6b84.js";
import "uuid";
import "../../../../chunks/constants-ea9bcd9b.js";
import "handlebars";
import "../../../../chunks/browser-231be779.js";
import "bowser";
import "moment";
import "lodash";
import "json-parse-bigint";
const post = async ({ request }) => {
  try {
    const body = await request.json();
    const error = vilidateLogin(body);
    if (!objectIsEmpty(error)) {
      return restError(error, 422, "login validation error");
    }
    const sql = `
            SELECT id, password, created_at as "createdAt"
            FROM partner
            WHERE username = ?
        `;
    const param = [body.username];
    const res = await query(sql, param);
    if (res && Array.isArray(res) && res.length > 0) {
      const record = res[0];
      const password = encodePassword(`${record.id}.${record.createdAt}.${body.password}`);
      if (password === record.password) {
        const res2 = {
          userId: record.id,
          accessToken: "access token",
          loginInfo: {}
        };
        return restOk(res2);
      } else {
        return restError({ unknownError: "sys.msg.authentication failed" }, 401);
      }
    } else {
      return restError({ unknownError: "sys.msg.authentication failed" }, 404);
    }
  } catch (err) {
    return restError({ unknownError: "sys.msg.authentication failed" }, 422);
  }
};
export { post };
