import { combineReducers } from 'redux'

import { ingredientsData } from './get-ingredients-data'
import {  orderData } from './make-order'
import {selectedIngredient} from './burger-ingredients'
import {constructerData, bunData, countedPrice,} from './burger-constructor'
import { register,login} from './requests-from-forms'
import {saveUserInfo, flagForForgotPassword} from './user-info'

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
