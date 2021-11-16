import { url } from './index'
import { AppThunk, AppDispatch } from '../types/index'

import {
    USER_INFO,
    USER_INFO_SUCCESS,
    USER_INFO_FAILED,
    CLEAR_USER_INFO
} from '../constants'

import { TUserInfo } from '../types/data'

export interface IUserInfo {
    readonly type: typeof USER_INFO;
}

export interface IUserInfoSuccess {
    readonly type: typeof USER_INFO_SUCCESS;
    readonly userInfo: TUserInfo;
}

export interface IUserInfoFailed {
    readonly type: typeof USER_INFO_FAILED;
}

export interface IClearUserInfo {
    readonly type: typeof CLEAR_USER_INFO;
}

export type TUserInfoActions =
    | IUserInfo
    | IUserInfoSuccess
    | IUserInfoFailed
    | IClearUserInfo

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');
requestHeaders.set('Authorization', `${localStorage.getItem('accessToken')}`);

function authUser() {
    return fetch(`${url}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: requestHeaders,
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
}

function authToken() {
    return fetch(`${url}/auth/token`, {
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
}

export const userInfoRequest: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: USER_INFO
        })
        if (localStorage.getItem('accessToken')) {
            authUser()
                .then(res => res.json())
                .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: USER_INFO_SUCCESS,
                            userInfo: res.user
                        })
                        console.group('res');
                        console.log(res);

                    } else if (localStorage.getItem('refreshToken')) {
                        authToken()
                            .then(res => res.json())
                            .then(token => {
                                localStorage.setItem('refreshToken', token.refreshToken)
                                localStorage.setItem('accessToken', token.accessToken)

                                authUser()
                                    .then(res => res.json())
                                    .then(res => {
                                        if (res && res.success) {
                                            dispatch({
                                                type: USER_INFO_SUCCESS,
                                                userInfo: res.user
                                            })
                                        }
                                    })
                            })


                    } else {
                        console.log('err');
                    }
                })
        }
    }
}



export const changeUserInfo: AppThunk = (changedBody) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: USER_INFO
        })
        fetch(`${url}/auth/user`, {
            method: 'PATCH',
            body: JSON.stringify(changedBody),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: requestHeaders
        })
            .then(res => res.json())
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: USER_INFO_SUCCESS,
                        userInfo: res.user
                    })
                } else {
                    dispatch({
                        type: USER_INFO_FAILED,
                    })
                    console.log('err');
                }
            })
            .catch(err => console.log(err))
    }
}

