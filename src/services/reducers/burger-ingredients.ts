import {
    SELECT_INGREDIENT,
    CLEAR_INGREDIENT,

} from '../actions/index';

import { TItemData } from '../types/data'
import { TBurgerIngredientsActions } from '../actions/burger-ingredients'

type TBurgerIngredientsInitialState = {
    selected: {} | TItemData;
}

const initialState: TBurgerIngredientsInitialState = {
    selected: {},
}

export const selectedIngredient = (state = initialState, action: TBurgerIngredientsActions): TBurgerIngredientsInitialState => {
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
