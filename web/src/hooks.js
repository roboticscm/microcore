import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import { config } from '/src/config/config';

const fullPaht = import.meta.url;
let path
if(fullPaht.includes('.svelte-kit')) {
  path = fullPaht.split('.svelte-kit')[0].split('///')[1] + 'build/static/';
} else if (fullPaht.includes('/server/chunks/')) {
  path = fullPaht.split('/server/chunks/')[0].split('///')[1];
} else {
  path = fullPaht.split('hooks.js')[0].split('///')[1];
}

export const PRIVATE_KEY = readFileSync(`${path}keys/app.rsa`)
export const PUBLIC_KEY = readFileSync(`${path}keys/app.rsa.pub`);

export const generateToken = (privateKey, isRefreshToken, payload) => {
    try {
      const duration = isRefreshToken ?  config.refreshTokenExpire : config.accessTokenExpire; //second
      const exp = Math.floor(Date.now() / 1000) + duration;
      payload.exp = exp;
    
      return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    } catch(err) {
      console.log(err)
      return '';
    }
  }
  