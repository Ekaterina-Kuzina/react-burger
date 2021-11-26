import {
    SELECT_INGREDIENT, 
    CLEAR_INGREDIENT, 
} from '../constants'

import {TItemData} from '../types/data'

export interface ISelectIngredient{
    readonly type: typeof SELECT_INGREDIENT;
    readonly selected: TItemData;
}

export interface IClearIngredient{
    readonly type: typeof CLEAR_INGREDIENT;
}

export type TBurgerIngredientsActions = 
    | ISelectIngredient
  | IClearIngredient
