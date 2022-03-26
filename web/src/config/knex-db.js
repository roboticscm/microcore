// Update with your config settings.
const dbServer = 'localhost';

export const config = {
  development: {
    client: 'pg',
    connection: {
      port: 5432,
      host: dbServer,
      database: 'dev',
      user: 'dev2022',
      password: 'AaBb123456789@'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {

    }
  },
  production: {
    client: 'pg',
    connection: {
      port: 5432,
      host: dbServer,
      database: 'dev',
      user: 'dev2022',
      password: 'AaBb123456789@'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {

    }
  }

};
