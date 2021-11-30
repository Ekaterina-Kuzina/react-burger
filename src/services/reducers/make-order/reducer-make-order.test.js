import {orderData} from './make-order'
import {
    SEND_INGREDIENTS,
    SEND_INGREDIENTS_SUCCESS,
    SEND_INGREDIENTS_FAILED,
    CLEAR_ORDER

} from '../../actions/index'

describe('orderData reducer', () => {
    const initialState = {
        order: null,
        orderRequest: false,
        orderFailed: false,
    }

    const addOrder = {
        ingredients: [],
        _id: "61a1efee19cb95001bc36853",
        owner: {},
        status: "done",
        name: "Флюоресцентный бессмертный бургер",
        createdAt: "2021-11-27T08:44:30.195Z",
        updatedAt: "2021-11-27T08:44:30.373Z",
        number: 6307,
        price: 2325,
    }

    test('should have initial state', () => {
        const action = {type: ''}
        const reducer = orderData(undefined, action)
        expect(reducer).toEqual(initialState)
    })

    test('should handle SEND_INGREDIENTS', () => {
        const reducer = orderData(initialState, {type: SEND_INGREDIENTS})

        expect(reducer).toEqual({
            order: null,
            orderRequest: true,
            orderFailed: false,
        })
    })

    test('should handle SEND_INGREDIENTS_SUCCESS', () => {
        const reducer = orderData(initialState, {type: SEND_INGREDIENTS_SUCCESS, order: addOrder})

        expect(reducer).toEqual({
            order: addOrder,
            orderRequest: false,
            orderFailed: false,
        })
    })

    test('should handle SEND_INGREDIENTS_FAILED', () => {
        const reducer = orderData({
            order: addOrder,
            orderRequest: false,
            orderFailed: false,
        }, {type: SEND_INGREDIENTS_FAILED})

        expect(reducer).toEqual({
            order: addOrder,
            orderRequest: false,
            orderFailed: true,
        })
    })

    test('should handle CLEAR_ORDER', () => {
        const reducer = orderData({
            order: addOrder,
            orderRequest: false,
            orderFailed: true,
        }, {type: CLEAR_ORDER})

        expect(reducer).toEqual({
            order: null,
            orderRequest: false,
            orderFailed: false,
        })
    })
})
