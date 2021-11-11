import {url} from './index'

export const SEND_INGREDIENTS = 'SEND_INGREDIENTS';
export const SEND_INGREDIENTS_SUCCESS = 'SEND_INGREDIENTS_SUCCESS';
export const SEND_INGREDIENTS_FAILED = 'SEND_INGREDIENTS_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const CLEAR_CONSTRUCTER_DATA = 'CLEAR_CONSTRUCTER_DATA';
export const CLEAR_BUN_DATA = 'CLEAR_BUN_DATA';

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
