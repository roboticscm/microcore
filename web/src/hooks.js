import { Browser } from '$lib/browser';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import { config } from '/src/config/config';

const fullPath = import.meta.url;
let path

///opt/devzone/microcore/web/build/server/chunks/hooks-874d60df.js
// open '/opt/devzone/microcore/web/buildkeys/app.rsa'

console.log('fullPath ', fullPath)
if (fullPath.includes('.svelte-kit')) {
  path = fullPath.split('.svelte-kit')[0].split('///')[1] + 'build/static/';
} else if (fullPath.includes('/server/chunks/')) {
  path = fullPath.split('/server/chunks/')[0].split('///')[1] + '/static/';
} else {
  path = fullPath.split('hooks.js')[0].split('///')[1];
}

export const PRIVATE_KEY = readFileSync(`/${path}keys/app.rsa`)
export const PUBLIC_KEY = readFileSync(`/${path}keys/app.rsa.pub`);

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
