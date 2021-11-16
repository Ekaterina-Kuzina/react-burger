import { store } from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TBurgerConstructorActions } from '../actions/burger-constructor'
import { TBurgerIngredientsActions } from '../actions/burger-ingredients'
import { TGetIngredientsDataActions } from '../actions/get-ingredients-data'
import { TMakeOrderActions } from '../actions/make-order'
import { TRequestsFromFormsActions } from '../actions/requests-from-forms'
import { TUserInfoActions } from '../actions/user-info'

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions =
    | TBurgerConstructorActions
    | TBurgerIngredientsActions
    | TGetIngredientsDataActions
    | TMakeOrderActions
    | TRequestsFromFormsActions
    | TUserInfoActions

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;