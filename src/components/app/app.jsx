import React, { useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import appStyle from "./app.module.css";
import { ProtectedRoute } from '../protected-route';
import { Redirect } from 'react-router-dom'
import { HomePage, Page404, SignIn, Registration, ForgotPassword, ResetPassword, Profile } from '../../pages';
import { useSelector, useDispatch } from 'react-redux';
import { USER_INFO } from '../../services/actions'
import {userInfoRequest, refreshToken} from '../../services/actions/user-info'
import ModalSwitch from '../../pages/modal-switch'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

export default function App() {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.getUserInfo.userInfo);
    const loginData = useSelector(state => state.login.loginData)
    const registerData = useSelector(state => state.register.registerData)

    useEffect(() => {
        dispatch(userInfoRequest())

    }, [localStorage.getItem('accessToken'), localStorage.getItem('refreshToken')])

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>
            <Router>
                <AppHeader />
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    <Route path='/login'>
                        {loginData|| userInfo ? <Redirect to="/" /> : <SignIn />}
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
                    <Route>
                        <ModalSwitch />
                    </Route>

                    <Route path='*'>
                        <Page404 />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
