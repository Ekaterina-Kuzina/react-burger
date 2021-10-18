import {
    USER_INFO,
    CLEAR_USER_INFO,

    FLAG_FORGOT_PASSWORD,
    REMOVE_FLAG_FORGOT_PASSWORD

} from '../actions'

const initialState = {
    userInfo: null,
    flagForgotPass: false
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
