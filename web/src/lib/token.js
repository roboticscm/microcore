import jwt from 'jsonwebtoken';
import { config } from '$src/config/config';

export const generateToken = (isRefreshToken, payload) => {
  try {
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
      }
    }
  } catch (err) {
    return undefined;
  }
}

export const needLogin = async (pathname, session) => {
  if (!session?.data?.userId || !session?.data?.accessToken) {
    session.data = null;
  } else {
    const verified = await getLoginInfo(session?.data);
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

  return false;
}

export const extractTokenPayload = async (request, deviceId) => {
  const token = request.headers.get('authorization');
  return verifyToken(token, deviceId);
}
