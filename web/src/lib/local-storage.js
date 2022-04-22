import { config } from '$src/config/config';

export const saveToken = (param) => {
    if(config.rememberClient) {
        localStorage.setItem('accessToken', param.accessToken);
        localStorage.setItem('refreshToken', param.refreshToken);
    } else {
        sessionStorage.setItem('accessToken', param.accessToken);
        sessionStorage.setItem('refreshToken', param.refreshToken);
    }
}

export const getToken = () => {
    if(config.rememberClient) {
        return {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
        }
    } else {
        return {
            accessToken: sessionStorage.getItem('accessToken'),
            refreshToken: sessionStorage.getItem('refreshToken')
        }
    }
}

export const clearToken = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export const buildHeader = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken().accessToken}`,
    }
}

export const cleanup = () => {
    clearToken();
    location.href = '/';
  }