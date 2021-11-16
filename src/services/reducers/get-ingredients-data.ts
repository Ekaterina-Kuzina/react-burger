import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

} from '../actions/index'

import { TItemData } from '../types/data'
import { TGetIngredientsDataActions } from '../actions/get-ingredients-data'

type TGetIngredientsDataInitialState = {
    ingredients: [] | Array<TItemData>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    flagSuccess: boolean;
}

const initialState: TGetIngredientsDataInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    flagSuccess: false
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

        default: {
            return state
        }

    }
}
