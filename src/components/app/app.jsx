import React from 'react';
import { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import app from "./app.module.css";

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [stateData, setData] = useState()
    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err))

    }, [])

    return (
        <div className='mt-10 mb-10'>
            <AppHeader />
            <div style={{ display: 'flex', justifyContent: "space-between" }} className={app.container}>

                {stateData &&
                    <>
                        <BurgerIngredients data={stateData.data} />
                        <BurgerConstructor data={stateData.data} />
                    </>
                }

            </div>
        </div>
    )
}

export default App;
