import { combineReducers } from 'redux'

import { ingredientsData } from './get-ingredients-data/get-ingredients-data'
import { orderData } from './make-order/make-order'
import {selectedIngredient} from './burger-ingredients/burger-ingredients'
import {constructerData, bunData, countedPrice,} from './burger-constructor/burger-constructor'
import { register,login, logout, flagForForgotPassword} from './requests-from-forms/requests-from-forms'
import {getUserInfo,changeUserInfo} from './user-info/user-info'
import {wsReducer} from './wsReducer/wsReducer'

export const rootReducer = combineReducers({
    ingredientsData,
    selectedIngredient,
    constructerData,
    bunData,
    countedPrice,
    orderData,
    register,
    login,
    logout,
    getUserInfo,
    changeUserInfo,
    flagForForgotPassword,
    wsReducer,
})
