import {
    USER_INFO,
    USER_INFO_SUCCESS,
    USER_INFO_FAILED,
    CLEAR_USER_INFO,

} from '../../actions'

import { TUserInfo } from '../../types/data'
import { TUserInfoActions } from '../../actions/user-info'

type TRequestsFromFormsInitialState = {
    userInfo: null | TUserInfo,
    userInfoRequest: boolean,
    userInfoFailed: boolean,
    ingredientsRequest?: boolean
}

const initialState: TRequestsFromFormsInitialState = {
    userInfo: null,
    userInfoRequest: false,
    userInfoFailed: false,
}

export const getUserInfo = (state = initialState, action: TUserInfoActions): TRequestsFromFormsInitialState => {
    switch (action.type) {
        case USER_INFO: {
            return {
                ...state,
                userInfoRequest: true
            }
        }

        case USER_INFO_SUCCESS: {
            return {
                ...state,
                userInfo: action.userInfo,
                userInfoRequest: false
            }
        }

        case USER_INFO_FAILED: {
            return {
                ...state,
                userInfoFailed: true,
                userInfoRequest: false
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

export const changeUserInfo = (state = initialState, action: TUserInfoActions): TRequestsFromFormsInitialState => {
    switch (action.type) {
        case USER_INFO: {
            return {
                ...state,
                userInfoRequest: true
            }
        }

        case USER_INFO_SUCCESS: {
            return {
                ...state,
                userInfo: action.userInfo,
                userInfoRequest: false
            }
        }

        case USER_INFO_FAILED: {
            return {
                ...state,
                userInfoFailed: true,
                userInfoRequest: false
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
