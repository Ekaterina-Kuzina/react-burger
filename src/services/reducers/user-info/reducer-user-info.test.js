import {getUserInfo, changeUserInfo} from './user-info'

import {
    USER_INFO,
    USER_INFO_SUCCESS,
    USER_INFO_FAILED,
    CLEAR_USER_INFO,

} from '../../actions'

describe('getUserInfo reducer', () => {
    const initialState = {
        userInfo: null,
        userInfoRequest: false,
        userInfoFailed: false,
    }

    const userInfo ={
        email:"kate2021@yandex.ru",
        name:"kate",
    }

    test('should have initial state', () => {
        const action = {type: ''}
        const reducer = getUserInfo(undefined, action)
        expect(reducer).toEqual(initialState)
    })

    test('should handle USER_INFO', () => {
        const reducer = getUserInfo(initialState, {type: USER_INFO})
        expect(reducer).toEqual({
            userInfo: null,
            userInfoRequest: true,
            userInfoFailed: false,
        })
    })

    test('should handle USER_INFO_SUCCESS', () => {
        const reducer = getUserInfo({
            userInfo: null,
            userInfoRequest: true,
            userInfoFailed: false,
        }, {type: USER_INFO_SUCCESS, userInfo: userInfo })
        expect(reducer).toEqual({
            userInfo: userInfo,
            userInfoRequest: false,
            userInfoFailed: false,
        })
    })

    test('should handle USER_INFO_FAILED', () => {
        const reducer = getUserInfo(initialState, {type: USER_INFO_FAILED })
        expect(reducer).toEqual({
            userInfo: null,
            userInfoFailed: true,
            userInfoRequest: false
        })
    })
    
    test('should handle CLEAR_USER_INFO', () => {
        const reducer = getUserInfo({
            userInfo: userInfo,
            userInfoRequest: false,
            userInfoFailed: false,
        }, {type: CLEAR_USER_INFO })
        expect(reducer).toEqual({
            userInfo: null,
            userInfoFailed: false,
            userInfoRequest: false
        })
    })
})

describe('changeUserInfo reducer', () => {
    const initialState = {
        userInfo: null,
        userInfoRequest: false,
        userInfoFailed: false,
    }

    const userInfo ={
        email:"kate2021@yandex.ru",
        name:"kate",
    }

    test('should have initial state', () => {
        const action = {type: ''}
        const reducer = changeUserInfo(undefined, action)
        expect(reducer).toEqual(initialState)
    })

    test('should handle USER_INFO', () => {
        const reducer = changeUserInfo(initialState, {type: USER_INFO})
        expect(reducer).toEqual({
            userInfo: null,
            userInfoRequest: true,
            userInfoFailed: false,
        })
    })

    test('should handle USER_INFO_SUCCESS', () => {
        const reducer = changeUserInfo({
            userInfo: null,
            userInfoRequest: true,
            userInfoFailed: false,
        }, {type: USER_INFO_SUCCESS, userInfo: userInfo })
        expect(reducer).toEqual({
            userInfo: userInfo,
            userInfoRequest: false,
            userInfoFailed: false,
        })
    })

    test('should handle USER_INFO_FAILED', () => {
        const reducer = changeUserInfo(initialState, {type: USER_INFO_FAILED })
        expect(reducer).toEqual({
            userInfo: null,
            userInfoFailed: true,
            userInfoRequest: false
        })
    })
    
    test('should handle CLEAR_USER_INFO', () => {
        const reducer = changeUserInfo({
            userInfo: userInfo,
            userInfoRequest: false,
            userInfoFailed: false,
        }, {type: CLEAR_USER_INFO })
        expect(reducer).toEqual({
            userInfo: null,
            userInfoFailed: false,
            userInfoRequest: false
        })
    })
})