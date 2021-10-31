import {
    SEND_INGREDIENTS,
    SEND_INGREDIENTS_SUCCESS,
    SEND_INGREDIENTS_FAILED,
    CLEAR_ORDER

} from '../actions/index'

const initialState = {
    order: {},
    orderRequest: false,
    orderFailed: false,
}

export const orderData = (state = initialState, action) => {
    switch (action.type) {
        case SEND_INGREDIENTS: {
            return {
                ...state,
                orderRequest: true
            }
        }

        case SEND_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderRequest: false
            }
        }

        case SEND_INGREDIENTS_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            }
        }
        case CLEAR_ORDER: {
            return {
                ...state,
                order: [],
                orderFailed: false,
                orderRequest: false
            }
        }


        default: {
            return state
        }

    }
}
