import React, { useEffect, useState } from 'react';

import bunImg from '../../images/bun-01.png'
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from '../modal/modal';

import OrderDetails from '../modal/order-details'
import IngredientDetails from '../modal/ingredient-details'

import appStyle from "./app.module.css";

import { DataContext, SelectedItemDataContext, ConstructerData, MakeOrder } from './data-context'

const url = 'https://norma.nomoreparties.space/api/ingredients';

const ingridientCardType = 'indridient_card'
const orderCardType = 'order_card'

function App() {
    const [stateData, setStateData] = useState();
    const [selectedItem, setSelectedItem] = useState()
    const [constructerData, setConstructerData] = useState([])
    const [bunData, setBunData] = useState({ name: 'Краторная булка N-200i', price: 1255, image: bunImg, _id: '60d3b41abdacab0026a733c6' })
    const [priceState, setPriceState] = useState(0)
    const [makeOrder, setMakeOrder] = useState()
    const [cardType, setCardType] = useState('')

    const handlePriceState = () => {
        let sum = bunData.price * 2
        constructerData.forEach((item) => {
            sum += item.price
        })
        setPriceState(sum)
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
            <DataContext.Provider value={stateData}>
                <SelectedItemDataContext.Provider value={{ selectedItem: selectedItem, setSelectedItem: setSelectedItem }}>
                    <ConstructerData.Provider value={{ constructerData: constructerData, setConstructerData: setConstructerData }}>
                        <MakeOrder.Provider value={{makeOrder: makeOrder, setMakeOrder: setMakeOrder}}>

                            <AppHeader />
                            <div style={{ display: 'flex', justifyContent: "space-between" }} className={appStyle.container}>

                                {stateData &&
                                    <>
                                        <BurgerIngredients ingridientClicked={() => {
                                            setCardType(ingridientCardType)
                                        }} bunData={bunData} setBunData={setBunData} />
                                        <BurgerConstructor orderButtonClicked={() => {
                                            setCardType(orderCardType)
                                        }} bunData={bunData} priceState={priceState} />
                                    </>
                                }

                            </div>

                            {
                                cardType === ingridientCardType &&
                                <Modal title='Детали ингредиента' closeModal={() => setCardType('')}>
                                    <IngredientDetails />
                                </Modal>
                            }

                            {
                                cardType === orderCardType &&
                                <Modal closeModal={() => setCardType('')}>
                                    <OrderDetails />
                                </Modal>
                            }
                        </MakeOrder.Provider>
                    </ConstructerData.Provider>
                </SelectedItemDataContext.Provider>
            </DataContext.Provider>

        </div>
    )
}

export default App;
