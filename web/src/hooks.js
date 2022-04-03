import { Browser } from '$lib/browser';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import { config } from '/src/config/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'cookie';

let fullPath = dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/');

if (fullPath.includes('.svelte-kit/output/server/chunks')) {
  fullPath = fullPath.split('.svelte-kit/output/server/chunks')[0] + 'src';
} else if (fullPath.includes('build/server/chunks')) {
  fullPath = fullPath.split('build/server/chunks')[0] + '/src';
}

export const PRIVATE_KEY = readFileSync(`${fullPath}/keys/app.rsa`)
export const PUBLIC_KEY = readFileSync(`${fullPath}/keys/app.rsa.pub`);


export const generateToken = (isRefreshToken, payload) => {
  try {
    const duration = isRefreshToken ? config.refreshTokenExpire : config.accessTokenExpire; //second
    const exp = Math.floor(Date.now() / 1000) + duration;
    payload.exp = exp;

    return jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
  } catch (err) {
    throw err;
  }
}

export const verifyToken = async (token, deviceId) => {
  token = token || '';
  token = token.replace('Bearer ', '')
  token = token.replace(deviceId, '');
  return new Promise((resolve, reject) => {
    jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
}

export const extractTokenPayload = async (request, deviceId) => {
  const token = request.headers.get('authorization');
  return verifyToken(token, deviceId);
}

export const extractDeviceDesc = (request) => {
  return Browser.getAgentDesc(request.headers.get('user-agent'))
}

//hook function
export const handle = async ({ event, resolve }) => {

  const cookies = parse(event.request.headers.get('cookie') || '');
  if (cookies.sessionId) {
    //TODO
    const session = {
      userId: 1,
      username: 'root',
      displayName: 'abc'
    };
    if (session) {
      event.locals.user = session;
      return resolve(event);
    }
  }

  event.locals.user = null;
  return resolve(event);
}

export const getSession = (request) => {
  return request?.locals?.user
    ? {
      user: request.locals.user
    }
    : {};
}
