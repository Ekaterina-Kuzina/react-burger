import {
    REGISTER_USER ,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,

    LOGIN_USER ,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,

    REFRESH_TOKEN,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,

    USER_INFO,


} from '../actions/auth'

const initialState = {
    registerData: {},
    regirterRequest: false,
    registerFailed: false,

    loginData: null,
    loginRequest: false,
    loginFailed: false,

    refreshTokenData: null,
    refreshTokenRequest: false,
    refreshTokenFailed: false,

    userInfo: null,

}

export const register = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER: {
            return {
                ...state,
                regirterRequest: true
            }
        }

        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                registerData: action.registerData,
                regirterRequest: false
            }
        }

        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerFailed: true,
                regirterRequest: false
            }
        }

        default: {
            return state
        }

    }
}

export const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                loginrRequest: true
            }
        }

        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                loginData: action.loginData,
                loginRequest: false
            }
        }

        case LOGIN_USER_FAILED: {
            return {
                ...state,
                loginFailed: true,
                loginRequest: false
            }
        }

        default: {
            return state
        }

    }
}

export const saveUserInfo  = (state = initialState, action) =>{
    switch (action.type) {
        case USER_INFO: {
            return {
                ...state,
                userInfo : action.userInfo
            }
        }
            
        default:{
            return state
        }
    }
}
