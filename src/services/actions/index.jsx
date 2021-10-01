export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT'

export const GET_CONSTRUCTER_DATA = 'GET_CONSTRUCTER_DATA';
export const REMOVE_CONSTRUCTER_DATA = 'REMOVE_CONSTRUCTER_DATA'
export const FILTER_CONSTRUCTER = 'FILTER_CONSTRUCTER'
export const GET_BUN_DATA = 'GET_BUN_DATA';
export const COUNT_PRICE = 'COUNT_PRICE';

export const SEND_INGREDIENTS = 'SEND_INGREDIENTS';
export const SEND_INGREDIENTS_SUCCESS = 'SEND_INGREDIENTS_SUCCESS';
export const SEND_INGREDIENTS_FAILED = 'SEND_INGREDIENTS_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER';
const url = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        fetch(url)
            .then(res=> res.json())
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    })
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED,
                    })
                }
            })
            .catch(err =>{
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
            })
    }
}

export function sendOrder(orderList){
    return function (dispatch){
        dispatch({
            type: SEND_INGREDIENTS
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "ingredients": orderList })
        };
        fetch('https://norma.nomoreparties.space/api/orders', requestOptions)
        .then(res=> res.json())
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: SEND_INGREDIENTS_SUCCESS,
                    order: res.order
                })
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

