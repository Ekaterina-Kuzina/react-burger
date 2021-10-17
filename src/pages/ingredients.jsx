import React, { useEffect, useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/modal/ingredient-details';
import { CLEAR_INGREDIENT, CLEAR_ORDER, COUNT_PRICE } from '../services/actions/index'
import { useSelector, useDispatch } from 'react-redux';
import {useHistory, useParams, useLocation} from 'react-router-dom'
const ingridientCardType = 'indridient_card'

export default function IngredientModal(){
    let location = useLocation();
    console.log(location);
    let { id } = useParams();
    console.log(id);
    const dispatch = useDispatch()
    let history = useHistory();
    console.log(history);
    return (
            <Modal title='Детали ингредиента' closeModal={
                () => {
                    history.goBack();
                }
            }>
                <IngredientDetails />
            </Modal>
    )

}
