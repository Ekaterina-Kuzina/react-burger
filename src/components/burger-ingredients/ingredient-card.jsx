import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import { useDrag } from "react-dnd";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { SELECT_INGREDIENT } from '../../services/actions/index'
import { useLocation } from 'react-router-dom'
export default function IngredientCard({ item, openModal, counter }) {
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
                state: { background: location }
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
    )
}

IngredientCard.propTypes = {
    counter: PropTypes.number.isRequired,
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }),
    openModal: PropTypes.func,
}
