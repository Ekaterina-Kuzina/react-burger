import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/app/app";
import { Provider } from 'react-redux';
import {store} from './services/store'
import {
  BrowserRouter as Router,

} from "react-router-dom";
import AppHeader from './components/app-header/app-header';
ReactDOM.render(
  <Router>
      <AppHeader />
    <Provider store={store}>
      <App />
    </Provider>
  </Router>

  , document.getElementById('root')
);


