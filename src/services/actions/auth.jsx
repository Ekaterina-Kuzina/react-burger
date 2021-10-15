// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена. 

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const USER_INFO = 'USER_INFO';


export function sendReqRegisterUser(registerBody){
    return function(dispatch) {
        dispatch({
            type: REGISTER_USER
        })

        fetch(`https://norma.nomoreparties.space/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(registerBody), 
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(res=> res.json())
        .then(res => {
            console.log(res);
            if (res && res.success) {
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    registerData: res
                })
            } else {
                dispatch({
                    type: REGISTER_USER_FAILED,
                })
            }
        })
        .catch(err =>{
            dispatch({
                type: REGISTER_USER_FAILED,
            })
        })
    }

}

export function sendReqLoginUser(loginBody){
    return function(dispatch) {
        dispatch({
            type: LOGIN_USER
        })

        fetch(`https://norma.nomoreparties.space/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginBody), 
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(res=> res.json())
        .then(res => {
            console.log(res);
            if (res && res.success) {
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('accessToken', res.accessToken);
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    loginData: res
                })
            } else {
                dispatch({
                    type: LOGIN_USER_FAILED,
                })
            }
        })
        .catch(err =>{
            dispatch({
                type: LOGIN_USER_FAILED,
            })
        })
    }

}

export function refreshToken(refreshTokenBody){
    return function(dispatch) {
        dispatch({
            type: REFRESH_TOKEN
        })

        fetch(`https://norma.nomoreparties.space/api/auth/token`, {
            method: 'POST',
            body: JSON.stringify(refreshTokenBody), 
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(res=> res.json())
        .then(res => {
            console.log(res);
            if (res && res.success) {
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    refreshTokenData: res
                })
            } else {
                dispatch({
                    type: REFRESH_TOKEN_FAILED,
                })
            }
        })
        .catch(err =>{
            dispatch({
                type: REFRESH_TOKEN_FAILED,
            })
        })
    }

}

