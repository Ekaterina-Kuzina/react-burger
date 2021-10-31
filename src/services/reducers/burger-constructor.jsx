
import {
    GET_CONSTRUCTER_DATA,
    FILTER_CONSTRUCTER,
    REMOVE_CONSTRUCTER_DATA,
    CLEAR_CONSTRUCTER_DATA,

    GET_BUN_DATA,
    CLEAR_BUN_DATA,
    COUNT_PRICE,

} from '../actions/index'

const initialState = {
    constructerIngredients: [],
    constructerBun: null,
    price: ''
}

export const constructerData = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONSTRUCTER_DATA: {
            return {
                ...state,
                constructerIngredients: [...state.constructerIngredients, action.constructerIngredients]
            }
        }
        case FILTER_CONSTRUCTER: {
            const constructerIngredientsNew = [...state.constructerIngredients];
            constructerIngredientsNew.splice(action.toIndex, 0, constructerIngredientsNew.splice(action.fromIndex, 1)[0]);
            return {
                ...state,
                constructerIngredients: constructerIngredientsNew
            }
        }

        case REMOVE_CONSTRUCTER_DATA: {
            const itemToRemove = state.constructerIngredients.find(item => item._id === action._id)
            if (!itemToRemove) {
                return state
            }
            const index = state.constructerIngredients.indexOf(itemToRemove)
            state.constructerIngredients.splice(index, 1)
            const modifiedConstructerIngridients = [...state.constructerIngredients]

            return {
                ...state,
                constructerIngredients: modifiedConstructerIngridients
            }
        }
        case CLEAR_CONSTRUCTER_DATA: {
            return {
                ...state,
                constructerIngredients: []
            }
        }

        default: {
            return state
        }
    }
}

export const bunData = (state = initialState, action) => {
    switch (action.type) {
        case GET_BUN_DATA: {
            return {
                ...state,
                constructerBun: action.constructerBun
            }
        }
        case CLEAR_BUN_DATA: {
            return {
                ...state,
                constructerBun: null
            }
        }

        default: {
            return state
        }
    }
}

export const countedPrice = (state = initialState, action) => {
    switch (action.type) {
        case COUNT_PRICE: {
            return {
                ...state,
                price: action.price
            }
        }
        default: {
            return state
        }
    }
}
