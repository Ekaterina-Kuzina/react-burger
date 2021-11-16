import { url } from './index'
import { AppThunk, AppDispatch } from '../types/index'

import {
    SEND_INGREDIENTS,
    SEND_INGREDIENTS_SUCCESS,
    SEND_INGREDIENTS_FAILED,
    CLEAR_ORDER,
    CLEAR_CONSTRUCTER_DATA,
    CLEAR_BUN_DATA,

} from '../constants'

export interface ISendIngredients {
    readonly type: typeof SEND_INGREDIENTS;
}

export interface ISendIngredientsSuccess {
    readonly type: typeof SEND_INGREDIENTS_SUCCESS;
    readonly order: { number: number };
}

export interface ISendIngredientsFailed {
    readonly type: typeof SEND_INGREDIENTS_FAILED;
}

export interface IClearOrder {
    readonly type: typeof CLEAR_ORDER;
}


export type TMakeOrderActions =
    | ISendIngredients
    | ISendIngredientsSuccess
    | ISendIngredientsFailed
    | IClearOrder

export const sendOrder: AppThunk = (orderList: number[]) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SEND_INGREDIENTS
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "ingredients": orderList })
        };
        fetch(`${url}/orders`, requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res && res.success) {
                    console.log(res)
                    dispatch({
                        type: SEND_INGREDIENTS_SUCCESS,
                        order: res.order
                    })
                    dispatch({ type: CLEAR_CONSTRUCTER_DATA })
                    dispatch({ type: CLEAR_BUN_DATA })
                } else {
                    dispatch({
                        type: SEND_INGREDIENTS_FAILED,
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: SEND_INGREDIENTS_FAILED,
                })
            })
    }
}
