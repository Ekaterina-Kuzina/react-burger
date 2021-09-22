import React, { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from '../modal/modal';

import appStyle from "./app.module.css";

import { DataContext, SelectedItemDataContext, ConstructerData } from './data-context'

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const dataState = useState();
    const [stateData, setStateData] = dataState;
    const selectedItemData = useState()
    const [selectedItem, setSelectedItem] = selectedItemData;
    const constructerSelectedItemData = useState([])
    const [constructerData, setConstructerData] = constructerSelectedItemData


    const [isOpen, setIsOpen] = useState(false);
    const [target, setTarget] = useState('');

    const switchOpenState = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(data => setStateData(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>
            <DataContext.Provider value={dataState}>
                <SelectedItemDataContext.Provider value={selectedItemData}>
                    <ConstructerData.Provider value={constructerSelectedItemData}>
                        <AppHeader />
                        <div style={{ display: 'flex', justifyContent: "space-between" }} className={appStyle.container}>

                            {stateData &&
                                <>
                                    <BurgerIngredients switchOpenState={(e) => {
                                        setTarget()
                                        switchOpenState(e.target.tagName)
                                    }} />
                                    <BurgerConstructor data={stateData.data} switchOpenState={(e) => {
                                        switchOpenState()
                                        setTarget(e.target.tagName)
                                    }} />
                                </>
                            }

                        </div>

                        {isOpen &&
                            <Modal target={target} switchOpenState={switchOpenState} closeModal={() => {
                                switchOpenState()
                            }} selectedItem={selectedItem} />
                        }
                    </ConstructerData.Provider>

                </SelectedItemDataContext.Provider>
            </DataContext.Provider>

        </div>
    )
}

export default App;
