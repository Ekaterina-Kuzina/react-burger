import {
    SEND_INGREDIENTS,
    SEND_INGREDIENTS_SUCCESS,
    SEND_INGREDIENTS_FAILED,
    CLEAR_ORDER

} from '../../actions/index'

import {TMakeOrderActions} from '../../actions/make-order'

type TMakeOrderInitialState = {
    order: null | {number: number};
    orderRequest: boolean;
    orderFailed: boolean;
}

const initialState : TMakeOrderInitialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
}

export const orderData = (state = initialState, action: TMakeOrderActions) : TMakeOrderInitialState => {
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
                order: null,
                orderFailed: false,
                orderRequest: false
            }
        }

        default: {
            return state
        }

    }
}
