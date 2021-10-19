import {url} from './index'

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';
export const CLEAR_LOGIN_USER= 'CLEAR_LOGIN_USER'

export const USER_INFO = 'USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export const FLAG_FORGOT_PASSWORD = 'FLAG_FORGOT_PASSWORD';
export const REMOVE_FLAG_FORGOT_PASSWORD = 'REMOVE_FLAG_FORGOT_PASSWORD'


export function sendReqRegisterUser(registerBody) {
    return function (dispatch) {

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

export function sendReqLoginUser(loginBody) {
    return function (dispatch) {
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
    return function (dispatch) {
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

export function forgotPassword (newPost){
    return function (dispatch){
        fetch(`${url}/password-reset`, {
            method: "POST",
            body: JSON.stringify(newPost), 
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(res => res.json())
        .then(res => {
            if(res && res.success){
                dispatch({type: FLAG_FORGOT_PASSWORD})
                console.log(res)
            }else{
                console.log('err');
            }
        })
        .catch(err => console.log(err))
    }
}
export function resetPassword (newPost){
    return function (dispatch){
        fetch(`${url}/password-reset/reset`, {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(res => res.json())
            .then(res => {
                if(res && res.success){
                    dispatch({ type: REMOVE_FLAG_FORGOT_PASSWORD })
                    console.log(res)
                }else{
                    console.log('err');
                }

            })
            .catch(err => console.log(err))

    }
}




// async function logout() {
//     return fetch(`https://norma.nomoreparties.space/api/auth/logout`, {
//         method: 'POST',
//         body: JSON.stringify({
//             token: localStorage.getItem('refreshToken')
//         }),
//         mode: 'cors',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
// }

// const logoutRequest = async () => {
//     if (localStorage.getItem('refreshToken')) {
//         let res = await (await logout()).json()
//         if (res.success) {
//             localStorage.removeItem('refreshToken')
//             localStorage.removeItem('accessToken')
//             dispatch({ type: CLEAR_USER_INFO })
//         }
//     }

//}