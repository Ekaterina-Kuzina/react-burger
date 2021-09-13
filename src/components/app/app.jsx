import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import app from "./app.module.css";
import {data__list} from '../../ utils/data.js';

function  App (){
    return (
        <>
            <AppHeader/>
            <div style={{display:'flex', justifyContent: "space-between"}} className={app.container}>
                <BurgerIngredients data={data__list}/>
                <BurgerConstructor data={data__list}/>
            </div>
        </>
    )
}

export default App;