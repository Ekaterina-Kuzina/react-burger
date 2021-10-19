import {
    USER_INFO,
    USER_INFO_SUCCESS,
    USER_INFO_FAILED,
    CLEAR_USER_INFO,

    FLAG_FORGOT_PASSWORD,
    REMOVE_FLAG_FORGOT_PASSWORD

} from '../actions'

const initialState = {
    userInfo: null,
    userInfoRequest : false,
    userInfoFailed: false,
}

export const getUserInfo =(state = initialState, action) =>{
    switch (action.type) {
        case USER_INFO: {
            return {
                ...state,
                ingredientsRequest: true
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

export const changeUserInfo =(state = initialState, action) =>{
    switch (action.type) {
        case USER_INFO: {
            return {
                ...state,
                ingredientsRequest: true
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


// export const saveUserInfo = (state = initialState, action) => {
//     switch (action.type) {
//         case USER_INFO: {
//             return {
//                 ...state,
//                 userInfo: action.userInfo
//             }
//         }
//         case CLEAR_USER_INFO: {
//             return {
//                 ...state,
//                 userInfo: null
//             }
//         }

//         default: {
//             return state
//         }
//     }
// }


