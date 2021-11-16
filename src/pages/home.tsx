import React, { useEffect, useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Modal from '../components/modal/modal';

import OrderDetails from '../components/modal/order-details';

import appStyle from "../components/app/app.module.css"

import { useSelector, useDispatch } from '../services/hooks';
import { CLEAR_ORDER, COUNT_PRICE, CLEAR_LOGIN_USER } from '../services/actions'
import { useHistory } from 'react-router-dom';

const ingridientCardType = 'indridient_card'
const orderCardType = 'order_card'


export default function HomePage() {
    const [cardType, setCardType] = useState('')
    const history = useHistory()
    const userInfo = useSelector(state => state.getUserInfo.userInfo);

    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredientsData.ingredients)
    const constructerIngredients = useSelector(state => state.constructerData.constructerIngredients)
    const constructerBun = useSelector(state => state.bunData.constructerBun)

    const handlePriceState = () => {
        if (constructerBun) {
            let sum = constructerBun.price * 2
            constructerIngredients.forEach((item: {price: number}) => {
                sum += item.price
            })
            dispatch({ type: COUNT_PRICE, price: sum })
        } else {
            let sum = 0;
            constructerIngredients.forEach((item: {price: number}) => {
                sum += item.price
            })
            dispatch({ type: COUNT_PRICE, price: sum })
        }

    }

    useEffect(() => {
        handlePriceState()
    }, [constructerBun, constructerIngredients])

    useEffect(() => {
        dispatch({ type: CLEAR_LOGIN_USER })
    }, [dispatch])

    return (
        <>

            <div style={{ display: 'flex', justifyContent: "space-between" }} className={appStyle.container}>

                {ingredients &&
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients ingridientClicked={() => {
                            setCardType(ingridientCardType)
                        }} />
                        <BurgerConstructor orderButtonClicked={() => {
                            if (userInfo) {
                                setCardType(orderCardType)
                            } else {
                                history.push('/login')
                            }
                        }} />
                    </DndProvider>
                }

            </div>

            {
                cardType === orderCardType &&
                <Modal title = {null} closeModal={
                    () => {
                        setCardType('')
                        dispatch({ type: CLEAR_ORDER })
                    }
                }>
                    <OrderDetails />
                </Modal>
            }
        </>
    )
}
