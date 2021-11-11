import { url } from './index'

export const USER_INFO = 'USER_INFO';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILED = 'USER_INFO_FAILED';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

function authUser() {
    return fetch(`${url}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken')
        },
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

export function userInfoRequest() {
    return function (dispatch) {
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

                    }else if(localStorage.getItem('refreshToken')){
                        authToken()
                            .then(res => res.json())
                            .then(token => {
                                localStorage.setItem('refreshToken', token.refreshToken)
                                localStorage.setItem('accessToken', token.accessToken)

                                authUser()
                                .then(res => res.json())
                                .then(res =>{
                                    if(res && res.success){
                                        dispatch({
                                            type: USER_INFO_SUCCESS,
                                            userInfo: res.user
                                        })
                                    }
                                })
                            })


                    }else{
                        console.log('err');
                    }
                })
        }
    }
}


export function changeUserInfo(changedBody) {
    return function (dispatch: any) {
        dispatch({
            type: USER_INFO
        })
        fetch(`${url}/auth/user`, {
            method: 'PATCH',
            body: JSON.stringify(changedBody),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('accessToken')
            }
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

