import React, { useEffect, useState } from 'react';

import bunImg from '../../images/bun-01.png'
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from '../modal/modal';


import appStyle from "./app.module.css";

import { DataContext, SelectedItemDataContext, ConstructerData, MakeOrder } from './data-context'

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const dataState = useState();
    const [stateData, setStateData] = dataState;
    const selectedItemData = useState()
    const [selectedItem] = selectedItemData;
    const constructerSelectedItemData = useState([])
    const [constructerData] = constructerSelectedItemData
    const [bunData, setBunData] = useState({ name: 'Краторная булка N-200i', price: 1255, image: bunImg, _id: '60d3b41abdacab0026a733c6' })
    const [praceState, setPraceState] = useState(0)
    const makeOrder = useState()

    const [isOpen, setIsOpen] = useState(false);
    const [target, setTarget] = useState('');

    const switchOpenState = () => {
        setIsOpen(!isOpen)
    }

    const handlePriceState = () => {
        let sum = bunData.price * 2
        constructerData.forEach((item) => {
            sum += item.price
        })
        setPraceState(sum)
    }

    useEffect(() => {
        handlePriceState()
    }, [bunData, constructerData])


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
                        <MakeOrder.Provider value={makeOrder}>

                            <AppHeader />
                            <div style={{ display: 'flex', justifyContent: "space-between" }} className={appStyle.container}>

                                {stateData &&
                                    <>
                                        <BurgerIngredients switchOpenState={(e) => {
                                            setTarget()
                                            switchOpenState(e.target.tagName)
                                        }} bunData={bunData} setBunData={setBunData} />
                                        <BurgerConstructor switchOpenState={(e) => {
                                            switchOpenState()
                                            setTarget(e.target.tagName)
                                        }} bunData={bunData} praceState={praceState} />
                                    </>
                                }

                            </div>

                            {isOpen &&
                                <Modal target={target} switchOpenState={switchOpenState} closeModal={() => {
                                    switchOpenState()
                                }} selectedItem={selectedItem} />
                            }
                        </MakeOrder.Provider>
                    </ConstructerData.Provider>
                </SelectedItemDataContext.Provider>
            </DataContext.Provider>

        </div>
    )
}

export default App;
