import { combineReducers } from 'redux'

import { ingredientsData, getIngredientsInfoWithKeyId } from './get-ingredients-data'
import { orderData } from './make-order'
import {selectedIngredient} from './burger-ingredients'
import {constructerData, bunData, countedPrice,} from './burger-constructor'
import { register,login, logout, flagForForgotPassword} from './requests-from-forms'
import {getUserInfo,changeUserInfo} from './user-info'
import {wsReducer, wsReducerForHistory, fullObjFromWs} from './wsReducer'

export const rootReducer = combineReducers({
    ingredientsData,
    getIngredientsInfoWithKeyId,
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
    wsReducerForHistory,
    fullObjFromWs,
})
