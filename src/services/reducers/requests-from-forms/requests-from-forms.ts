import {
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,

    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    CLEAR_LOGIN_USER,

    LOGOUT_USER,
    CLEAR_USER_INFO,

    FLAG_FORGOT_PASSWORD,
    REMOVE_FLAG_FORGOT_PASSWORD

} from '../../actions'

import { TLoginData, TLogout } from '../../types/data'
import { TRequestsFromFormsActions } from '../../actions/requests-from-forms'

type TRequestsFromFormsInitialState = {
    registerData: null | TLoginData;
    regirterRequest: boolean;
    registerFailed: boolean;

    loginData: null | TLoginData;
    loginRequest: boolean;
    loginFailed: boolean;

    logoutData: null | TLogout;
    logoutRequest: boolean;
    logoutFailed: boolean;

    flagForgotPass: boolean;
    successResetPassword: null | TLogout;
    userInfo?: null;
}

const initialState: TRequestsFromFormsInitialState = {
    registerData: null,
    regirterRequest: false,
    registerFailed: false,

    loginData: null,
    loginRequest: false,
    loginFailed: false,

    logoutData: null,
    logoutRequest: false,
    logoutFailed: false,

    flagForgotPass: false,
    successResetPassword: null
}

export const register = (state = initialState, action: TRequestsFromFormsActions): TRequestsFromFormsInitialState => {
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

export const login = (state = initialState, action: TRequestsFromFormsActions): TRequestsFromFormsInitialState => {
    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                loginRequest: true
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
            return {
                ...state,
                loginData: null
            }
        }

        default: {
            return state
        }

    }
}

export const logout = (state = initialState, action: TRequestsFromFormsActions): TRequestsFromFormsInitialState => {
    switch (action.type) {
        case LOGOUT_USER: {
            return {
                ...state,
                logoutRequest: true
            }
        }

        case LOGIN_USER_FAILED: {
            return {
                ...state,
                logoutFailed: true,
                logoutRequest: false
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
export const flagForForgotPassword = (state = initialState, action: TRequestsFromFormsActions): TRequestsFromFormsInitialState => {
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
                flagForgotPass: false,
                successResetPassword: action.successResetPassword
            }
        }

        default: {
            return state
        }
    }
}
