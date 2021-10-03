import React, { useEffect, useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from '../modal/modal';

import OrderDetails from '../modal/order-details'
import IngredientDetails from '../modal/ingredient-details'

import appStyle from "./app.module.css";

import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/index'
import { CLEAR_INGREDIENT, CLEAR_ORDER, COUNT_PRICE} from '../../services/actions/index'

const ingridientCardType = 'indridient_card'
const orderCardType = 'order_card'

export default function App() {
    const [cardType, setCardType] = useState('')

    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredientsData.ingredients)
    const constructerIngredients = useSelector((state) => state.constructerData.constructerIngredients)
    const constructerBun = useSelector((state) => state.bunData.constructerBun)

    const handlePriceState = () => {
        if(constructerBun){
            let sum = constructerBun.price * 2
            constructerIngredients.forEach((item) => {
                sum += item.price
            })
            dispatch({ type: COUNT_PRICE, price: sum })
        }else{
            let sum = 0;
            constructerIngredients.forEach((item) => {
                sum += item.price
            })
            dispatch({ type: COUNT_PRICE, price: sum })
        }

    }

    useEffect(() => {
        handlePriceState()
    }, [constructerBun, constructerIngredients])

    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>

            <AppHeader />
            <div style={{ display: 'flex', justifyContent: "space-between" }} className={appStyle.container}>

                {ingredients &&
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients ingridientClicked={() => {
                            setCardType(ingridientCardType)
                        }} />
                        <BurgerConstructor orderButtonClicked={() => {
                            setCardType(orderCardType)
                        }} />
                    </DndProvider>
                }

            </div>

            {
                cardType === ingridientCardType &&
                <Modal title='Детали ингредиента' closeModal={
                    () => {
                        setCardType('')
                        dispatch({ type: CLEAR_INGREDIENT })
                    }
                }>
                    <IngredientDetails />
                </Modal>
            }

            {
                cardType === orderCardType &&
                <Modal closeModal={
                    () => {
                        setCardType('')
                        dispatch({ type: CLEAR_ORDER })
                    }
                }>
                    <OrderDetails />
                </Modal>
            }

        </div>
    )
}
