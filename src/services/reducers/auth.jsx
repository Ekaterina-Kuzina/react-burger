import {
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,

    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    CLEAR_LOGIN_USER,

    USER_INFO,
    CLEAR_USER_INFO,

    FLAG_FORGOT_PASSWORD,
    REMOVE_FLAG_FORGOT_PASSWORD

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
    flagForgotPass: false

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
        case CLEAR_LOGIN_USER: {
            return{
                ...state,
                loginData: null
            }
        }

        default: {
            return state
        }

    }
}

export const saveUserInfo = (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO: {
            return {
                ...state,
                userInfo: action.userInfo
            }
        }
        case CLEAR_USER_INFO: {
            return {
                ...state,
                userInfo: null
            }
        }

        default: {
            return state
        }
    }
}

export const flagForForgotPassword = (state = initialState, action) => {
    switch (action.type) {
        case FLAG_FORGOT_PASSWORD: {
            return {
                ...state,
                flagForgotPass: true
            }
        }
        case REMOVE_FLAG_FORGOT_PASSWORD: {
            return {
                ...state,
                flagForgotPass: false
            }
        }

        default: {
            return state
        }
    }
}
