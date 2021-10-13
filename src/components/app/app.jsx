import React, {useEffect} from 'react';

import AppHeader from '../app-header/app-header';
import appStyle from "./app.module.css";
import {HomePage, Page404, SignIn, Registration, ForgotPassword, ResetPassword , Profile} from '../../pages'

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

export default function App() {

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>
            <Router>
                <AppHeader/>
                <Switch>
                    <Route path='/' exact>
                        <HomePage/>
                    </Route>
                    <Route path='/login'>
                        <SignIn/>
                    </Route>
                    <Route path='/register'>
                        <Registration/>
                    </Route>
                    <Route path='/forgot-password'>
                        <ForgotPassword/>
                    </Route>
                    <Route path='/reset-password'>
                        <ResetPassword/>
                    </Route>
                    <Route path='/profile'>
                        <Profile/>
                    </Route>
                    <Route path='*'>
                        <Page404/>
                    </Route>
                </Switch>
            </Router>

        </div>
    )
}
