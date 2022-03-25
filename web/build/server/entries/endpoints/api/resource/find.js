import { c as callFunc } from "../../../../chunks/template-e5fd56e3.js";
import { n as normalizeObjectKey } from "../../../../chunks/object-e5321754.js";
import "../../../../chunks/util-d19f6044.js";
import "knex";
import "knex-stringcase";
import "dotenv/config";
import "lodash";
import "../../../../chunks/string-util-9f2c94d9.js";
import "uuid";
import "../../../../chunks/constants-c334863d.js";
import "handlebars";
import "json-parse-bigint";
const get = async () => {
  try {
    const res = await callFunc("find_resource", "json");
    if (res && res.length > 0) {
      return {
        status: 200,
        body: {
          ...normalizeObjectKey(JSON.parse(res[0].json))
        }
      };
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: err
      }
    };
  }
};
export { get };
