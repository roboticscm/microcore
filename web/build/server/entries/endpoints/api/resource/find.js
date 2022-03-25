import { c as callFunc } from "../../../../chunks/template-a8e314dd.js";
import { n as normalizeObjectKey } from "../../../../chunks/object-381063f8.js";
import "../../../../chunks/util-a143f07a.js";
import "knex";
import "knex-stringcase";
import "dotenv/config";
import "lodash";
import "../../../../chunks/string-util-529e6b84.js";
import "uuid";
import "../../../../chunks/constants-ea9bcd9b.js";
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
