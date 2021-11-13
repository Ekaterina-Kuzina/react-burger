import React, { useEffect } from 'react';

import appStyle from "./app.module.css";
import { ProtectedRoute } from '../protected-route';
import { Redirect } from 'react-router-dom'
import { HomePage, Page404, SignIn, Registration, ForgotPassword, ResetPassword, Profile, OrderFeed } from '../../pages';
import { useSelector, useDispatch } from 'react-redux';
import { userInfoRequest } from '../../services/actions/user-info'
import { getIngredients } from '../../services/actions/get-ingredients-data'

import {
    Switch,
    Route,
    useLocation,
    useHistory
} from "react-router-dom";
import IngredientDetails from '../modal/ingredient-details'
import { IngredientModal } from '../../pages/index'
import {Location} from 'history';

type TLocationState = {
    from?: Location;
    ingredientsModal?: Location;
}


export default function App() {
    const dispatch = useDispatch()
    const userInfo = useSelector((state: any) => state.getUserInfo.userInfo);
    const loginData = useSelector((state: any) => state.login.loginData)
    const registerData = useSelector((state: any) => state.register.registerData)

    let location = useLocation<TLocationState>();
    let history = useHistory();

    const action = history.action === 'PUSH' || history.action === 'REPLACE';
    const ingredientsModal = action && location.state && location.state.ingredientsModal;

    useEffect(() => {
        dispatch(userInfoRequest())
    }, [localStorage.getItem('accessToken'), localStorage.getItem('refreshToken')])

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>
            <Switch location={ingredientsModal || location}>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/feed'>
                    <OrderFeed/>
                </Route>
                <Route path='/login'>
                    {loginData || userInfo ? <Redirect to="/" /> : <SignIn />}
                </Route>
                <Route path='/register'>
                    {registerData ? <Redirect to="/" /> : <Registration />}
                </Route>
                <Route path='/forgot-password'>
                    {userInfo ? <Redirect to="/" /> : <ForgotPassword />}
                </Route>
                <Route path='/reset-password'>
                    {userInfo ? <Redirect to="/" /> : <ResetPassword />}
                </Route>
                <ProtectedRoute path='/profile'>
                    <Profile />
                </ProtectedRoute>
                <Route path='/ingredients/:id'>
                    <IngredientDetails />
                </Route>
                <Route path='*'>
                    <Page404 />
                </Route>

            </Switch>

            {ingredientsModal && <Route path='/ingredients/:id'><IngredientModal /></Route>}
        </div>

    )
}
