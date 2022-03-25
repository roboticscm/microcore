import 'dotenv/config';

// Update with your config settings.

export const config = {
  development: {
    client: 'pg',
    connection: {
      port: 5432,
      host: 'localhost',
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
      host: 'localhost',
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
