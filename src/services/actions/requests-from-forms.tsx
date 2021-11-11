import { url } from './index'
import {TLoginBody} from '../../pages/login'
import {TNewPost} from '../../pages/forgot-password'
import {TNewPostReset} from '../../pages/reset-password'
import {TRequestBody} from '../../pages/register'

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';
export const CLEAR_LOGIN_USER = 'CLEAR_LOGIN_USER'

export const USER_INFO = 'USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export const FLAG_FORGOT_PASSWORD = 'FLAG_FORGOT_PASSWORD';
export const REMOVE_FLAG_FORGOT_PASSWORD = 'REMOVE_FLAG_FORGOT_PASSWORD'


export function sendReqRegisterUser(registerBody: TRequestBody) {
    return function (dispatch: any) {

        fetch(`${url}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(registerBody),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(res => res.json())
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
            .catch(err => {
                dispatch({
                    type: REGISTER_USER_FAILED,
                })
            })
    }

}

export function sendReqLoginUser(loginBody: TLoginBody) {
    return function (dispatch: any) {
        dispatch({
            type: LOGIN_USER
        })

        fetch(`${url}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginBody),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(res => res.json())
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
            .catch(err => {
                dispatch({
                    type: LOGIN_USER_FAILED,
                })
            })
    }
}

export function sendReqLogOutUser() {
    return function (dispatch: any) {
        dispatch({
            type: LOGOUT_USER
        })

        fetch(`${url}/auth/logout`, {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            }),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res && res.success) {
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('accessToken')
                    dispatch({ type: CLEAR_USER_INFO })
                } else {
                    console.log('err');
                    dispatch({
                        type: LOGOUT_USER_FAILED,
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: LOGOUT_USER_FAILED,
                })
            })
    }
}

export function forgotPassword(newPost: TNewPost) {
    return function (dispatch : any ) {
        fetch(`${url}/password-reset`, {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res && res.success) {
                    dispatch({ type: FLAG_FORGOT_PASSWORD })
                    console.log(res)
                } else {
                    console.log('err');
                }
            })
            .catch(err => console.log(err))
    }
}
export function resetPassword(newPostReset:TNewPostReset) {
    return function (dispatch: any) {
        fetch(`${url}/password-reset/reset`, {
            method: "POST",
            body: JSON.stringify(newPostReset),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res && res.success) {
                    dispatch({ type: REMOVE_FLAG_FORGOT_PASSWORD, successResetPassword: res })
                    console.log(res)
                } else {
                    console.log('err');
                }

            })
            .catch(err => console.log(err))

    }
}
