import "coinpayments";
import "speakeasy";
import "qrcode";
import { q as query } from "../../../../chunks/template-e5fd56e3.js";
import { r as restError, e as encodePassword, a as restOk } from "../../../../chunks/rest-e1481239.js";
import { vilidateLogin } from "./validation.js";
import { o as objectIsEmpty } from "../../../../chunks/object-e5321754.js";
import "../../../../chunks/util-d19f6044.js";
import "knex";
import "knex-stringcase";
import "dotenv/config";
import "js-sha256";
import "../../../../chunks/common-validation-46216bd4.js";
import "../../../../chunks/string-util-9f2c94d9.js";
import "uuid";
import "../../../../chunks/constants-c334863d.js";
import "handlebars";
import "../../../../chunks/browser-904e0c5e.js";
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
