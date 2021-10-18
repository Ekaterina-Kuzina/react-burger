import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

} from '../actions/index'

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const ingredientsData = (state = initialState, action) => {
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
                ingredientsRequest: false
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
