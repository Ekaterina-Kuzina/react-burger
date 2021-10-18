import React, { useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import appStyle from "./app.module.css";
import { ProtectedRoute } from '../protected-route';
import { Redirect } from 'react-router-dom'
import { HomePage, Page404, SignIn, Registration, ForgotPassword, ResetPassword, Profile } from '../../pages';
import { useSelector, useDispatch } from 'react-redux';
import { USER_INFO } from '../../services/actions'
import ModalSwitch from '../../pages/modal-switch'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const userUrl = 'https://norma.nomoreparties.space/api/auth/user'
const tokenUrl = 'https://norma.nomoreparties.space/api/auth/token'

export default function App() {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.saveUserInfo.userInfo);
    const loginData = useSelector(state => state.login.loginData)
    
    async function authUser() {
        return fetch(userUrl, {
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
        return fetch(tokenUrl, {
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
                localStorage.setItem('refreshToken', tokens.refreshToken)
                localStorage.setItem('accessToken', tokens.accessToken)
                res = await (await authUser()).json()
                dispatch({
                    type: USER_INFO,
                    userInfo: res.user
                })
            } else {
                console.log('error');
            }
        }
    }

    useEffect(() => {
        userInfoRequest()
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
                        {loginData ? <Redirect to="/" /> : <SignIn />}
                    </Route>
                    <Route path='/register'>
                        {userInfo ? <Redirect to="/" /> : <Registration />}
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
