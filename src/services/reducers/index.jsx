import { combineReducers } from 'redux'
import {register, login, saveUserInfo, flagForForgotPassword} from './auth'

import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    SELECT_INGREDIENT,
    CLEAR_INGREDIENT,

    GET_CONSTRUCTER_DATA,
    FILTER_CONSTRUCTER,
    REMOVE_CONSTRUCTER_DATA,
    CLEAR_CONSTRUCTER_DATA,

    GET_BUN_DATA,
    CLEAR_BUN_DATA,
    COUNT_PRICE,

    SEND_INGREDIENTS,
    SEND_INGREDIENTS_SUCCESS,
    SEND_INGREDIENTS_FAILED,
    CLEAR_ORDER

} from '../actions/index'


const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    constructerIngredients: [],
    selected: {},

    order: {},
    orderRequest: false,
    orderFailed: false,

    constructerBun: null,
    price: ''

}

const ingredientsData = (state = initialState, action) => {
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

const selectedIngredient = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_INGREDIENT: {
            return {
                ...state,
                selected: action.selected
            }
        }
        case CLEAR_INGREDIENT: {
            return {
                ...state,
                selected: {}
            }
        }
        default:
            return state
    }
}

const constructerData = (state = initialState, action) => {
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

const bunData = (state = initialState, action) => {
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

const countedPrice = (state = initialState, action) => {
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

const orderData = (state = initialState, action) => {
    switch (action.type) {
        case SEND_INGREDIENTS: {
            return {
                ...state,
                orderRequest: true
            }
        }

        case SEND_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderRequest: false
            }
        }

        case SEND_INGREDIENTS_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            }
        }
        case CLEAR_ORDER: {
            return {
                ...state,
                order: [],
                orderFailed: false,
                orderRequest: false
            }
        }


        default: {
            return state
        }

    }
}


export const rootReducer = combineReducers({
    ingredientsData,
    selectedIngredient,
    constructerData,
    bunData,
    countedPrice,
    orderData,
    register,
    login,
    saveUserInfo,
    flagForForgotPassword
})

