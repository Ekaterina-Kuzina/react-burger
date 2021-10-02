import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import { useDrag } from "react-dnd";
export default function IngredientCard({ item, openModal, counter }) {

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredients",
        item: item,

        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });


    return (
        !isDrag && (
            <div ref={dragRef} onClick={openModal} className={`${ingredientsStyles.card} mt-6 mb-2`}>
                <img src={item.image} alt="bun" />
                {counter > 0 &&
                    <Counter count={counter} size="default" />
                }
                <div className={`${ingredientsStyles.cost} mt-1 mb-1`}>
                    <p className="mr-2 text text_type_digits-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="mt-1 text text_type_main-default">{item.name}</p>
            </div>
        )
    )
}

IngredientCard.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }),
}
