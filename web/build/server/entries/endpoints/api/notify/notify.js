import { g as getKnexInstance } from "../../../../chunks/util-d19f6044.js";
import "knex";
import "knex-stringcase";
import "dotenv/config";
const get = async () => {
  try {
    const client = getKnexInstance().client;
    client.on("notification", (msg) => {
      console.log(msg);
    });
    return {
      status: 200,
      body: {
        message: "ok"
      }
    };
  } catch (err) {
    return {
      status: 422,
      body: {
        ...err
      }
    };
  }
};
export { get };
