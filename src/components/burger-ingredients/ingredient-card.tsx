import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import { useDrag } from "react-dnd";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { SELECT_INGREDIENT } from '../../services/actions/index'
import { useLocation } from 'react-router-dom'
import {TItemData} from '../../utils/types'

type TIngredientCardProps = {
    item: TItemData;
    counter: number;
    openModal: ()=> void;
}
const  IngredientCard = ({ item,openModal, counter }: TIngredientCardProps ): JSX.Element => {
    const dispatch = useDispatch()
    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredients",
        item: item,

        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    let location = useLocation();

    return (
        !isDrag && (
            <Link to={{
                pathname: `/ingredients/${item._id}`,
                state: { ingredientsModal: location }
            }}
                ref={dragRef}
                onClick={() => {
                    dispatch({
                        type: SELECT_INGREDIENT,
                        selected: item
                    })
                }}
                className={`${ingredientsStyles.card} mt-6 mb-2`}>

                <img src={item.image} alt="bun" />
                {counter > 0 &&
                    <Counter count={counter} size="default" />
                }
                <div className={`${ingredientsStyles.cost} mt-1 mb-1`}>
                    <p className="mr-2 text text_type_digits-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="mt-1 text text_type_main-default">{item.name}</p>
            </Link>
        )
    ) as JSX.Element
} 
export default IngredientCard
