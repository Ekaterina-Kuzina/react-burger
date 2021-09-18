import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from './burger-ingredients.module.css';


function IngredientCard(props){
    return (
        <div onClick={props.openModal} className={`${ingredients.card} mt-6 mb-2`}>
            <img src={props.img} alt="bun" />
            <Counter count={1} size="default" />
            <div className={`${ingredients.cost} mt-1 mb-1`}>
                <p className="mr-2 text text_type_digits-default">{props.cost}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="mt-1 text text_type_main-default">{props.name}</p>
        </div>
    )
}

IngredientCard.propTypes = {
    cost: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default IngredientCard;
