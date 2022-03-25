import knex from "knex";
import knexStringcase from "knex-stringcase";
import "dotenv/config";
const config = {
  development: {
    client: "pg",
    connection: {
      port: process.env.DB_PORT,
      host: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {}
  },
  production: {
    client: "pg",
    connection: {
      port: process.env.DB_PORT,
      host: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {}
  }
};
const getKnexInstance = () => {
  return knex(knexStringcase(config.production));
};
const isDuplicatedValue = async (tableName, columnName, value, id) => {
  return new Promise((resolve, reject) => {
    const knex2 = getKnexInstance();
    knex2.raw('SELECT * FROM is_duplicated_value(?, ?, ?, ?) as "isDuplicated" ', [tableName, columnName, value, id]).then((res) => {
      resolve(res.rows[0].isDuplicated);
    }).catch((err) => reject(err)).finally(() => {
      knex2.destroy();
    });
  });
};
const isExistedValue = async (tableName, columnName, value) => {
  return new Promise((resolve, reject) => {
    const knex2 = getKnexInstance();
    knex2.raw('SELECT * FROM is_existed_value(?, ?, ?) as "isExisted"', [tableName, columnName, value]).then((res) => {
      resolve(res.rows[0].isExisted);
    }).catch((err) => reject(err)).finally(() => {
      knex2.destroy();
    });
  });
};
const updateSystemFields = (userId) => {
  return {};
};
const createSystemFields = (userId) => {
  return {};
};
export { isExistedValue as a, createSystemFields as c, getKnexInstance as g, isDuplicatedValue as i, updateSystemFields as u };
