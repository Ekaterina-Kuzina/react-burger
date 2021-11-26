import { url } from './index'
import { AppThunk, AppDispatch } from '../types/index'

import { TLoginBody } from '../../pages/login'
import { TNewPost } from '../../pages/forgot-password'
import { TNewPostReset } from '../../pages/reset-password'
import { TRequestBody } from '../../pages/register'

import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,

    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,

    LOGOUT_USER,
    LOGOUT_USER_FAILED,

    CLEAR_LOGIN_USER,
    CLEAR_USER_INFO,
    FLAG_FORGOT_PASSWORD,
    REMOVE_FLAG_FORGOT_PASSWORD

} from '../constants'

import { TLoginData, TLogout } from '../types/data'

export interface ILoginUser {
    readonly type: typeof LOGIN_USER;
}
export interface ILoginUserSuccess {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly loginData: TLoginData;
}

export interface ILoginUserFailed {
    readonly type: typeof LOGIN_USER_FAILED;
}
export interface IRegisterUser {
    readonly type: typeof REGISTER_USER;
}
export interface IRegisterUserSuccess {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly registerData: TLoginData;
}

export interface IRegisterUserFalied {
    readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILogoutUser {
    readonly type: typeof LOGOUT_USER;
}

export interface ILogoutUserFailed {
    readonly type: typeof LOGOUT_USER_FAILED;
}
export interface IClearLoginUser {
    readonly type: typeof CLEAR_LOGIN_USER;
}

export interface IClearUserInfo {
    readonly type: typeof CLEAR_USER_INFO;
}

export interface IFlagForgotPassword {
    readonly type: typeof FLAG_FORGOT_PASSWORD;
}

export interface IRemoveFlagForgotPassword {
    readonly type: typeof REMOVE_FLAG_FORGOT_PASSWORD;
    readonly successResetPassword: TLogout;
}

export type TRequestsFromFormsActions =
    | ILoginUser
    | ILoginUserSuccess
    | ILoginUserFailed
    | IRegisterUser
    | IRegisterUserSuccess
    | IRegisterUserFalied
    | ILogoutUser
    | ILogoutUserFailed
    | IClearLoginUser
    | IClearUserInfo
    | IFlagForgotPassword
    | IRemoveFlagForgotPassword


export const sendReqRegisterUser: AppThunk = (registerBody: TRequestBody) => {
    return function (dispatch: AppDispatch) {

        fetch(`${url}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(registerBody),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(res => res.json())
            .then(res => {

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

export const sendReqLoginUser: AppThunk = (loginBody: TLoginBody) => {
    return function (dispatch: AppDispatch) {
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
                console.group('login');
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

export const sendReqLogOutUser: AppThunk = () => {
    return function (dispatch: AppDispatch) {
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

export const forgotPassword: AppThunk = (newPost: TNewPost) => {
    return function (dispatch: AppDispatch) {
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
export const resetPassword: AppThunk = (newPostReset: TNewPostReset) => {
    return function (dispatch: AppDispatch) {
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
