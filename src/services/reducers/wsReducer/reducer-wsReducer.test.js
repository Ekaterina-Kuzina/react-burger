import {wsReducer} from './wsReducer'

import {
    WS_INIT_CONNECTION,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_ON_OPEN,
} from '../../constants';

describe('wsReducer reducer', () => {
    const initialState = {
        wsConnected: false,
        messages: [],
    }

    const payloadItem = {
        success: true,
        total: 6220,
        totalToday: 116,
    }

    test('should have initial state', () => {
        const action = {type: ''}
        const reducer = wsReducer(undefined, action)
        expect(reducer).toEqual(initialState)
    })

    test('should handle WS_INIT_CONNECTION', () => {
        const reducer = wsReducer(initialState, {type: WS_INIT_CONNECTION})
        expect(reducer).toEqual({
            wsConnected: true,
            messages: [],
        })
    })
    test('should handle WS_ON_OPEN', () => {
        const reducer = wsReducer(initialState, {type: WS_ON_OPEN})
        expect(reducer).toEqual({
            wsConnected: true,
            messages: [],
        })
    })

    test('should handle WS_CONNECTION_ERROR', () => {
        const reducer = wsReducer(initialState, {type: WS_CONNECTION_ERROR})
        expect(reducer).toEqual({
            wsConnected: false,
            messages: [],
        })
    })

    test('should handle WS_CONNECTION_CLOSED', () => {
        const reducer = wsReducer({
            wsConnected: true,
            messages: [],
        }, {type: WS_CONNECTION_CLOSED})
        expect(reducer).toEqual({
            wsConnected: false,
            messages: [],
        })
    })

    test('should handle WS_GET_MESSAGE', () => {
        const reducer = wsReducer({
            wsConnected: true,
            messages: [],
        }, {type: WS_GET_MESSAGE, payload: payloadItem })
        expect(reducer).toEqual({
            wsConnected: true,
            messages: [payloadItem],
        })
    })

    
})

