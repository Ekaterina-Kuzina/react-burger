import React, { useEffect, useState } from 'react';

import bunImg from '../../images/bun-01.png'
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from '../modal/modal';

import OrderDetails from '../modal/order-details'
import IngredientDetails from '../modal/ingredient-details'

import appStyle from "./app.module.css";

import { useSelector, useDispatch } from 'react-redux';
import {getIngredients} from '../../services/actions/index'

import { ConstructerData, MakeOrder } from './data-context'


const ingridientCardType = 'indridient_card'
const orderCardType = 'order_card'

function App() {
    const [constructerData, setConstructerData] = useState([])
    const [bunData, setBunData] = useState({ name: 'Краторная булка N-200i', price: 1255, image: bunImg, _id: '60d3b41abdacab0026a733c6' })
    const [priceState, setPriceState] = useState(0)
    const [makeOrder, setMakeOrder] = useState()
    const [cardType, setCardType] = useState('')

    const dispatch = useDispatch();
    const ingredients = useSelector((state)=> state.ingredientsData.ingredients)

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
        dispatch(getIngredients())
    }, [])

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>
                    <ConstructerData.Provider value={{ constructerData: constructerData, setConstructerData: setConstructerData }}>
                        <MakeOrder.Provider value={{makeOrder: makeOrder, setMakeOrder: setMakeOrder}}>

                            <AppHeader />
                            <div style={{ display: 'flex', justifyContent: "space-between" }} className={appStyle.container}>

                                {ingredients &&
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
        </div>
    )
}

export default App;
