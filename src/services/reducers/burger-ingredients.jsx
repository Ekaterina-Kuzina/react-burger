import {
    SELECT_INGREDIENT,
    CLEAR_INGREDIENT,

} from '../actions/index';

const initialState = {
    selected: {},
}

export const selectedIngredient = (state = initialState, action) => {
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
