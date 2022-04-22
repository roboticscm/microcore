import jwt from 'jsonwebtoken';
import { config, appConfig } from '$src/config/config';
import { App } from '$lib/constants';
import JsonParseBigInt from 'json-parse-bigint'
import { dev } from '$app/env';

export const generateToken = (isRefreshToken, payload) => {
  try {
    console.log("xxxxxxxxxxxxxxxxxx", appConfig)
    const duration = isRefreshToken ? config.refreshTokenExpire : config.accessTokenExpire; //second
    const exp = Math.floor(Date.now() / 1000) + duration;
    payload.exp = exp;

    return jwt.sign(payload, import.meta.env.VITE_PRIVATE_KEY, { algorithm: 'RS256' });
  } catch (err) {
    throw err;
  }
}

export const verifyToken = async (token, deviceId) => {
  token = token || '';
  token = token.replace('Bearer ', '')
  token = token.replace(deviceId, '');

  return new Promise((resolve, reject) => {
    jwt.verify(token, import.meta.env.VITE_PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
}

const getLoginInfo = async (data) => {
  try {
    const res = await verifyToken(data.accessToken, data.deviceId);
    if (res) {
      return {
        userId: res.userId,
        username: res.username,
        accessToken: data.accessToken,
        deviceId: data.deviceId,
        accountType: res.accountType
      }
    }
  } catch (err) {
    return undefined;
  }
}

export const needLogin = async (pathname, session) => {
  let verified = {}
  if (!session?.data?.userId || !session?.data?.accessToken) {
    session.data = null;
  } else {
    verified = await getLoginInfo(session?.data);
    if (verified) {
      if (verified.userId !== session?.data?.userId) {
        return { redirect: '/?mode=login', status: 302 }
      } else {
        session.data = verified
      }
    } else {
      return { redirect: '/?mode=login', status: 302 }
    }
  }

  if (!session?.data) {
    return { redirect: '/?mode=login', status: 302 }
  }

  return {
    ok: true,
    ...verified
  };
}

export const needAdminLogin = async (pathname, session) => {
  if (!session?.data?.userId || session?.data?.accountType < App.ADMIN_ACCOUNT_TYPE || !session?.data?.accessToken) {
    session.data = null;
  } else {
    const verified = await getLoginInfo(session?.data);
    if (verified) {
      if (verified.userId !== session?.data?.userId || verified.accountType < App.ADMIN_ACCOUNT_TYPE) {
        return { redirect: '/?mode=login', status: 302 }
      } else {
        session.data = verified
      }
    } else {
      return { redirect: '/?mode=login', status: 302 }
    }
  }

  if (!session?.data) {
    return { redirect: '/?mode=login', status: 302 }
  }

  return false;
}

export const extractTokenPayload = async (locals, request, deviceId) => {
  let token;
  const { data: localsData } = locals;
  if (localsData) {
    const cookie = JsonParseBigInt(localsData);
    token = cookie.accessToken;
    deviceId = cookie.deviceId;
  } else {
    token = request.headers.get('authorization');
  }

  return verifyToken(token, deviceId);
}

export const checkAdminPrivileges = (accountType) => {
  if (!dev && (accountType || 0) < App.ADMIN_ACCOUNT_TYPE) {
    return { unknownError: 'sys.msg.require administrator privileges', status: 401 }
  } else {
    return undefined;
  }
}