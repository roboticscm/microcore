export const saveToken = (param) => {
    if(param.remember) {
        localStorage.setItem('accessToken', param.accessToken);
        localStorage.setItem('refreshToken', param.refreshToken);
    } else {
        sessionStorage.setItem('accessToken', param.accessToken);
        sessionStorage.setItem('refreshToken', param.refreshToken);
    }
}

export const getToken = (remember = true) => {
    if(remember) {
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