import {url} from './index'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import {
    GET_INGREDIENTS, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED, 
} from '../constants'

import {TItemData} from '../types/data'

export interface IGetIngredients{
    readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccess{
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TItemData;
}

export interface IGetIngredientsFailed{
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

type TMyState = {

}
export function getIngredients() {
    return function (dispatch: ThunkDispatch<TMyState, void, Action>) {
        dispatch({
            type: GET_INGREDIENTS
        })
        fetch(`${url}/ingredients`)
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
