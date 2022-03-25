import 'dotenv/config';

// Update with your config settings.
const dbServer = '18.140.147.176';

export const config = {
  development: {
    client: 'pg',
    connection: {
      port: 5432,
      host: dbServer,
      database: 'dev',
      user: 'dev2022',
      password: 'dev2022'
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
      password: 'dev2022'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {

    }
  }

};
