import React, { useEffect } from 'react';

import appStyle from "./app.module.css";
import { ProtectedRoute } from '../protected-route';
import { Redirect } from 'react-router-dom'
import { HomePage, Page404, SignIn, Registration, ForgotPassword, ResetPassword, Profile, OrderFeed } from '../../pages';
import { useSelector, useDispatch } from '../../services/hooks';
import { userInfoRequest } from '../../services/actions/user-info'
import { getIngredients } from '../../services/actions/get-ingredients-data'
import OrderFullPage from '../../pages/order-full-page'
import OrderFullPageModal from '../order-feed/order-full-page-modal'
import {GET_INGREDIENTS_INFO_WITH_KEY_ID} from '../../services/constants/get-ingredients-data'
import { wsGetMessage, wsSendMessage } from '../../services/actions/wsActions';

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
    orderModal?: Location;
}

export default function App() {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.getUserInfo.userInfo);
    const loginData = useSelector((state) => state.login.loginData)
    const registerData = useSelector((state) => state.register.registerData)


    let location = useLocation<TLocationState>();
    let history = useHistory();

    const action = history.action === 'PUSH' || history.action === 'REPLACE';
    const ingredientsModal = action && location.state && location.state.ingredientsModal;
    const orderModal = action && location.state && location.state.orderModal;
    
    useEffect(() => {
        dispatch(userInfoRequest())
    }, [localStorage.getItem('accessToken'), localStorage.getItem('refreshToken')])

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>
            <Switch location={(ingredientsModal || orderModal || location)}>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/feed' exact>
                    <OrderFeed/>
                </Route>
                <Route path='/feed/:id'>
                    <OrderFullPage/>
                </Route>
                <Route path='/profile/orders/:id'>
                    <OrderFullPage/>
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
            {orderModal && <Route path='/profile/orders/:id'><OrderFullPageModal/></Route>}
            {orderModal && <Route path='/feed/:id'><OrderFullPageModal/></Route>}
        </div>

    )
}
