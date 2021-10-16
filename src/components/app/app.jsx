import React, { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import appStyle from "./app.module.css";
import { ProtectedRoute } from '../protected-route';
import { Redirect } from 'react-router-dom'
import { HomePage, Page404, SignIn, Registration, ForgotPassword, ResetPassword, Profile } from '../../pages';
import { useSelector, useDispatch } from 'react-redux';
import { USER_INFO } from '../../services/actions/auth'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function App() {
    const dispatch = useDispatch()
    const history = useHistory()
    const loginData = useSelector((state) => state.login.loginData);
    const userInfo = useSelector((state) => state.saveUserInfo.userInfo);
    const [wasInForgotPasswordPage, setWasInForgotPasswordPage]  = useState(false)

    async function authUser() {
        return fetch(`https://norma.nomoreparties.space/api/auth/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
    }
    console.log(wasInForgotPasswordPage);

    async function authToken(endPoint) {
        return fetch(`https://norma.nomoreparties.space/api/auth/token`, {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            }),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    const userInfoRequest = async () => {
        if (localStorage.getItem('accessToken')) {
            let res = await (await authUser()).json()
            if (res && res.success) {
                dispatch({
                    type: USER_INFO,
                    userInfo: res.user
                })

            } else if (localStorage.getItem('refreshToken')) {
                let tokens = await (await authToken()).json()
                console.log(tokens);
                localStorage.setItem('refreshToken', tokens.refreshToken)
                localStorage.setItem('accessToken', tokens.accessToken)
                res = await (await authUser()).json()
                dispatch({
                    type: USER_INFO,
                    userInfo: res.user
                })
            }
        }
    }


    useEffect(() => {
        userInfoRequest()
    }, [localStorage.getItem('accessToken'), localStorage.getItem('refreshToken')])

    useEffect(() => {
        console.log(wasInForgotPasswordPage);
    }, [])

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>
            <Router>
                <AppHeader />
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    <Route path='/login'>
                        {userInfo ? <Redirect to="/" /> : <SignIn />}
                    </Route>
                    <Route path='/register'>
                        {userInfo ? <Redirect to="/" /> : <Registration />}
                    </Route>
                    <Route path='/forgot-password'>
                        {userInfo ? <Redirect to="/" /> : <ForgotPassword saveForgotPassword={setWasInForgotPasswordPage} />}
                    </Route>
                    <Route path='/reset-password'>
                    {userInfo ? <Redirect to="/" /> :  <ResetPassword removeForgotPassword={setWasInForgotPasswordPage}/>}
                        {/* {wasInForgotPasswordPage ?  <ResetPassword removeForgotPassword={setWasInForgotPasswordPage}/>: <Redirect to="/" /> } */}
                    </Route>
                    <ProtectedRoute path='/profile'>
                        <Profile/>
                    </ProtectedRoute>
                    <Route path='*'>
                        <Page404 />
                    </Route>
                </Switch>
            </Router>

        </div>
    )
}
