import React, { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import appStyle from "./app.module.css";
import { Redirect } from 'react-router-dom'
import { HomePage, Page404, SignIn, Registration, ForgotPassword, ResetPassword, Profile } from '../../pages';
import { useSelector, useDispatch } from 'react-redux';
import {USER_INFO} from '../../services/actions/auth'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default function App() {
    const dispatch = useDispatch()
    const loginData = useSelector((state) => state.login.loginData);
    const userInfo = useSelector((state) => state.saveUserInfo.userInfo);

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

    async function authToken() {
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
            console.log(res);
            if (res.success) {
                dispatch({
                    type: USER_INFO,
                    userInfo: res
                })

            } else if (localStorage.getItem('refreshToken')) {
                let tokens = await (await authToken()).json()
                console.log(tokens);
                localStorage.setItem('refreshToken', tokens.refreshToken)
                localStorage.setItem('accessToken', tokens.accessToken)
                res = await (await authUser()).json()
                dispatch({
                    type: USER_INFO,
                    userInfo: res
                })
            }
        }
    }


    useEffect(() => {
        userInfoRequest()
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
                        <Registration />
                    </Route>
                    <Route path='/forgot-password'>
                        <ForgotPassword />
                    </Route>
                    <Route path='/reset-password'>
                        <ResetPassword />
                    </Route>
                    <Route path='/profile'>
                        <Profile />
                    </Route>
                    <Route path='*'>
                        <Page404 />
                    </Route>
                </Switch>
            </Router>

        </div>
    )
}
