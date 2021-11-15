import {url} from './index'

import {
    SEND_INGREDIENTS, 
    SEND_INGREDIENTS_SUCCESS, 
    SEND_INGREDIENTS_FAILED,
    CLEAR_ORDER,
    CLEAR_CONSTRUCTER_DATA,
    CLEAR_BUN_DATA,

} from '../constants'

export function sendOrder(orderList: number[]){
    return function (dispatch: any){
        dispatch({
            type: SEND_INGREDIENTS
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "ingredients": orderList })
        };
        fetch(`${url}/orders`, requestOptions)
        .then(res=> res.json())
        .then(res => {
            if (res && res.success) {
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
        .catch(err =>{
            dispatch({
                type: SEND_INGREDIENTS_FAILED,
            })
        })
    }
}
