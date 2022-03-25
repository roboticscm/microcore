import { g as getKnexInstance, u as updateSystemFields, c as createSystemFields } from "./util-a143f07a.js";
const callFunc = async (funcName, alias, params) => {
  return new Promise((resolve, reject) => {
    const knex = getKnexInstance();
    knex.raw(`SELECT * FROM ${funcName}(${(params || []).map((it) => "?").join(",")}) AS ${alias}`, params).then((res) => {
      resolve(res.rows);
    }).catch((err) => reject(err)).finally(() => {
      knex.destroy();
    });
  });
};
const query = async (sql, params) => {
  return new Promise((resolve, reject) => {
    const knex = getKnexInstance();
    knex.raw(sql, params).then((res) => {
      resolve(res.rows);
    }).catch((err) => reject(err)).finally(() => {
      knex.destroy();
    });
  });
};
const upsert = async (userId, tableName, payload, conditionCallback) => {
  const knex = getKnexInstance();
  return new Promise((resolve, reject) => {
    const k = knex(tableName);
    if (payload.id && conditionCallback) {
      k.where((builder) => {
        conditionCallback(builder);
      }).update({ ...payload, ...updateSystemFields() }).then((updatedRows) => {
        if (!updatedRows) {
          knex(tableName).returning("*").insert({
            ...payload,
            ...createSystemFields()
          }).then((ret) => {
            resolve(ret[0]);
          }).catch((err) => reject(err));
        } else {
          resolve({
            message: `Updated: ${updatedRows}`
          });
        }
      }).catch((err) => reject(err)).finally(() => {
        knex.destroy();
      });
    } else {
      knex(tableName).returning("*").insert({
        ...payload,
        ...createSystemFields()
      }).then((ret) => {
        resolve(ret[0]);
      }).catch((err) => reject(err)).finally(() => {
        knex.destroy();
      });
    }
  });
};
const update = async (userId, tableName, payload, conditionCallback) => {
  const knex = getKnexInstance();
  return new Promise((resolve, reject) => {
    knex(tableName).where((builder) => {
      conditionCallback(builder);
    }).update({ ...payload, ...updateSystemFields() }).then((ret) => {
      resolve({
        message: ret
      });
    }).catch((err) => {
      reject(err);
    }).finally(() => {
      knex.destroy();
    });
  });
};
export { update as a, callFunc as c, query as q, upsert as u };
