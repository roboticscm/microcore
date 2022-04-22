import { parse, serialize } from 'cookie';
import { loadConfig } from './config/config';
import { getKnexInstance } from './lib/db/util';
import { error, info } from './lib/log';

let firstTime = false;

const buildCookie = (value) => {
  if (value) {
    return serialize('data', JSON.stringify(value), {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // one week
    });
  } else {
    return serialize('data', '', {
      path: '/',
      expires: new Date(0),
    });
  }
}

export const setCookieHeader = (value) => {
  return {
    'Set-Cookie': buildCookie(value)
  };
}

//hook function
export const handle = async ({ event, resolve }) => {
  await initServer();
  const cookies = parse(event.request.headers.get('cookie') || '')
  event.locals.data = cookies.data;
  const response = await resolve(event)
  response.headers['Set-Cookie'] = buildCookie(event.locals.data);
  return response
}

export const getSession = async (request) => {
  let json = {}
  try {
    json = JSON.parse(request.locals.data || '{}')
  } catch (err) {
    error(err)
  }
  return {
    data: json
  }
}

const initServer = async () => {
  if(firstTime) {
    return;
  }
  
  const knex = getKnexInstance();
  try {
    const res = await knex('app_setting')
      .where({ branchId: null, menuId: null })
    const config = {}

    (res||[]).map((it) => {
      config[it.key] = it.value
    })
    loadConfig(config)
    firstTime = true;
  } catch (err) {

  } finally {
    knex.destroy();
    info('Server started')
  }
}