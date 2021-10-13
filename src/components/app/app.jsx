import React from 'react';

import AppHeader from '../app-header/app-header';
import appStyle from "./app.module.css";
import {HomePage, Page404, SignIn, Registration} from '../../pages'

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

// import HomePage from '../../pages/home';


export default function App() {

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>

            <AppHeader/>
            <Router>
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
                    </Route>
                    <Route path='*'>
                        <Page404/>
                    </Route>
                </Switch>
            </Router>

        </div>
    )
}
