import { combineReducers } from 'redux'
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/index'

//Тут будут редьюсеры 
const initialState = {
    ingredients:[],//сейчас данные в контексте DataContext в stateData
    ingredientsRequest: false,
    ingredientsFailed: false,

    constructorIngredients: [],//сейчас данные в контексте ConstructerData в constructerData
    selectedIngredient: {},//сейчас данные в контексте SelectedItemDataContext в selectedItem
    order: {} //сейчас данные в контексте MakeOrder в makeOrder
}


const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS:{
            return {
                ...state,
                ingredientsRequest: true
            }
        }

        case GET_INGREDIENTS_SUCCESS:{
            return {
                ...state,ingredients: action.ingredients,
                ingredientsRequest: false
            }
        }

        case GET_INGREDIENTS_FAILED:{
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



export const rootReducer = combineReducers({
    ingredientsReducer
})

