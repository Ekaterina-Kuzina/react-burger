import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from './burger-ingredients.module.css';

function IngredientCard(props) {

    return (
        <div onClick={props.openModal} className={`${ingredients.card} mt-6 mb-2`}>
            <img src={props.item.image} alt="bun" />
            <Counter count={1} size="default" />
            <div className={`${ingredients.cost} mt-1 mb-1`}>
                <p className="mr-2 text text_type_digits-default">{props.item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="mt-1 text text_type_main-default">{props.item.name}</p>
        </div>

    )
}

IngredientCard.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }),
}

export default IngredientCard;
