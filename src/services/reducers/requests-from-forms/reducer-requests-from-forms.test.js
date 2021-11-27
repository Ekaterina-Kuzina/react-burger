import {register, login, logout, flagForForgotPassword} from './requests-from-forms'

import {
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,

    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    CLEAR_LOGIN_USER,

    LOGOUT_USER,
    LOGOUT_USER_FAILED,
    CLEAR_USER_INFO,

    FLAG_FORGOT_PASSWORD,
    REMOVE_FLAG_FORGOT_PASSWORD

} from '../../actions'

describe('register reducer', () => {
    const initialState = {
        registerData: null,
        regirterRequest: false,
        registerFailed: false,
    }

    const successRequest = {
        success: true,
        accessToken: "Bearer ...",
        refreshToken: "",
        user: {
          email: "",
          name: ""
        }
    } 

    test('should have initial state', () => {
        const action = {type: ''}
        const reducer = register(undefined, action)
        expect(reducer).toEqual(initialState)
    })

    test('should handle REGISTER_USER', () => {
        const reducer = register(initialState ,{type: REGISTER_USER})

        expect(reducer).toEqual({
            registerData: null,
            regirterRequest: true,
            registerFailed: false,
        })
    })

    test('should handle REGISTER_USER_SUCCESS', () => {
        const reducer = register({
            registerData: null,
            regirterRequest: true,
            registerFailed: false,
        } ,{type: REGISTER_USER_SUCCESS, registerData: successRequest})

        expect(reducer).toEqual({
            registerData: successRequest ,
            regirterRequest: false,
            registerFailed: false,
        })
    })

    test('should handle REGISTER_USER_FAILED', () => {
        const reducer = register({
            registerData: successRequest ,
            regirterRequest: false,
            registerFailed: false,
        } ,{type: REGISTER_USER_FAILED, registerData: successRequest})

        expect(reducer).toEqual({
            registerData: successRequest ,
            regirterRequest: false,
            registerFailed: true,
        })
    })
})

describe('login reducer', () => {
    const initialState = {
        loginData: null,
        loginRequest: false,
        loginFailed: false,
    }
    const successRequest = {
        success: true,
        accessToken: "Bearer ...",
        refreshToken: "",
        user: {
          email: "",
          name: ""
        }
    } 

    test('should have initial state', () => {
        const action = {type: ''}
        const reducer = login(undefined, action)
        expect(reducer).toEqual(initialState)
    })

    test('should handle LOGIN_USER', () => {
        const reducer = login(initialState ,{type: LOGIN_USER})

        expect(reducer).toEqual({
            loginData: null,
            loginRequest: true,
            loginFailed: false,
        })
    })

    test('should handle LOGIN_USER_SUCCESS', () => {
        const reducer = login({
            loginData: null,
            loginRequest: true,
            loginFailed: false,
        } ,{type: LOGIN_USER_SUCCESS, loginData: successRequest})

        expect(reducer).toEqual({
            loginData: successRequest,
            loginRequest: false,
            loginFailed: false,
        })
    })

    test('should handle LOGIN_USER_FAILED', () => {
        const reducer = login({
            loginData: successRequest,
            loginRequest: true,
            loginFailed: false,
        } ,{type: LOGIN_USER_FAILED})

        expect(reducer).toEqual({
            loginData: successRequest,
            loginRequest: false,
            loginFailed: true,
        })
    })

    test('should handle CLEAR_LOGIN_USER', () => {
        const reducer = login({
            loginData: successRequest,
            loginRequest: false,
            loginFailed: false,
        } ,{type: CLEAR_LOGIN_USER})

        expect(reducer).toEqual({
            loginData: null,
            loginRequest: false,
            loginFailed: false,
        })
    })
})


describe('logout reducer', () => {
    const initialState = {
        logoutData: null,
        logoutRequest: false,
        logoutFailed: false,
    }

    test('should have initial state', () => {
        const action = {type: ''}
        const reducer = logout(undefined, action)
        expect(reducer).toEqual(initialState)
    })

    test('should handle LOGOUT_USER', () => {
        const reducer = logout(initialState ,{type: LOGOUT_USER})

        expect(reducer).toEqual({
            logoutData: null,
            logoutRequest: true,
            logoutFailed: false,
        })
    })

    test('should handle LOGOUT_USER_FAILED', () => {
        const reducer = logout({
            logoutData: null,
            logoutRequest: true,
            logoutFailed: false,
        } ,{type: LOGOUT_USER_FAILED})

        expect(reducer).toEqual({
            logoutData: null,
            logoutRequest: false,
            logoutFailed: true,
        })
    })

    test('should handle CLEAR_USER_INFO', () => {
        const reducer = logout({
            logoutData: null,
            logoutRequest: false,
            logoutFailed: false,
        } ,{type: CLEAR_USER_INFO})

        expect(reducer).toEqual({
            logoutData: null,
            logoutRequest: false,
            logoutFailed: false,
            userInfo: null
        })
    })
})


describe('flagForForgotPassword reducer', () => {
    const initialState = {
        flagForgotPass: false,
        successResetPassword: null
    }

    test('should have initial state', () => {
        const action = {type: ''}
        const reducer = flagForForgotPassword(undefined, action)
        expect(reducer).toEqual(initialState)
    })

    test('should handle FLAG_FORGOT_PASSWORD', () => {
        const reducer = flagForForgotPassword(initialState ,{type: FLAG_FORGOT_PASSWORD})

        expect(reducer).toEqual({
            flagForgotPass: true,
            successResetPassword: null
        })
    })

    test('should handle REMOVE_FLAG_FORGOT_PASSWORD', () => {
        const reducer = flagForForgotPassword({
            flagForgotPass: true,
            successResetPassword: null
        } ,{type: REMOVE_FLAG_FORGOT_PASSWORD, successResetPassword: {
            success: true,
            message: 'ok',
        }})

        expect(reducer).toEqual({
            flagForgotPass: false,
            successResetPassword: {
                success: true,
                message: 'ok',
            }
        })
    })
})