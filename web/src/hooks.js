import { parse, serialize } from 'cookie';

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
  const cookies = parse(event.request.headers.get('cookie') || '')
  event.locals.data =  cookies.data;
  const response = await resolve(event)
  response.headers['Set-Cookie'] = buildCookie(event.locals.data);
  return response
}

export const getSession = async (request) => {
  return {
    data: JSON.parse(request.locals.data || '{}')
  }
}