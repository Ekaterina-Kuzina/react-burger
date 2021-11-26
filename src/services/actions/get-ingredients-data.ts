import { url } from './index'
import { AppThunk, AppDispatch } from '../types/index'

import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    GET_INGREDIENTS_INFO_WITH_KEY_ID,
} from '../constants'

import { TItemData } from '../types/data'
export interface IGetIngredients {
    readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TItemData[];
}

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}


export type TGetIngredientsDataActions =
    | IGetIngredients
    | IGetIngredientsSuccess
    | IGetIngredientsFailed


export const getIngredients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        fetch(`${url}/ingredients`)
            .then(res => res.json())
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
            .catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
            })
    }
}
