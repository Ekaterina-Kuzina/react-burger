import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_INFO_WITH_KEY_ID

} from '../actions/index'

import { TItemData } from '../types/data'
import { TGetIngredientsDataActions } from '../actions/get-ingredients-data'

type TGetIngredientsDataInitialState = {
    ingredients: [] | Array<TItemData>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    flagSuccess: boolean;
    ingredientsObjectWithKeyId: any

}

type TStateForIngredientsObjectWithKeyId={
    ingredientsObjectWithKeyId: null | {}
}

const initialState: TGetIngredientsDataInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    flagSuccess: false,
    ingredientsObjectWithKeyId: null

}
const stateForIngredientsObjectWithKeyId: TStateForIngredientsObjectWithKeyId = {
    ingredientsObjectWithKeyId: null
}


export const ingredientsData = (state = initialState, action: TGetIngredientsDataActions): TGetIngredientsDataInitialState => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }

        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsObjectWithKeyId: action.ingredients.reduce((map:any, item)=>{
                    map[item._id] = item;
                    return map
                }, {}),
                ingredientsRequest: false,
                flagSuccess: true
            }
        }

        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }
        // case GET_INGREDIENTS_INFO_WITH_KEY_ID: {
        //     return {
        //         ...state,
 
        //     }
        // }

        default: {
            return state
        }

    }
}

export const getIngredientsInfoWithKeyId = (state = stateForIngredientsObjectWithKeyId, action: any): any => {
    switch (action.type) {
        case GET_INGREDIENTS_INFO_WITH_KEY_ID: {
            return {
                ...state,
                ingredientsObjectWithKeyId: action.ingredientsObjectWithKeyId
            }
        }

        default: {
            return state
        }

    }
}