import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import IngredientCard from './ingredient-card'
import TabsContent from './tabs-content';

import ingredientsStyle from './burger-ingredients.module.css';
import { ConstructerData } from '../app/data-context';
import { useSelector, useDispatch } from 'react-redux';
import { selectIngredients } from '../../services/actions/index'
import {SELECT_INGREDIENT} from '../../services/actions/index'
function BurgerIngredients(props) {

    const { constructerData, setConstructerData } = useContext(ConstructerData)

    const ingredients = useSelector((state) => state.ingredientsData.ingredients)

    const dispatch = useDispatch()

    let types = []

    ingredients.forEach(element => {
        if (!types.includes(element.type)) {
            types.push(element.type)
        }
    });
    const handleCostructerData = (item) => {
        if (item.type !== 'bun') {
            setConstructerData([...constructerData, item])
        }
    }

    const handleBunData = (item) => {
        if (item.type === 'bun') {
            props.setBunData(item)
        }
    }

    return (

        <section className={ingredientsStyle.ingredients_wrapper} >
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <TabsContent />
            <div className={`${ingredientsStyle.blockIngredients} ${ingredientsStyle.customScroll} mt-2`}>
                {types.map(type => {
                    return (<div key={type} className="mb-2">
                        <p className="mt-8 text_type_main-medium">{getTypeName(type)}</p>
                        <div className={`${ingredientsStyle.cards} mt-6`}>
                            {
                                ingredients
                                    .filter(item => {
                                        return item.type === type;
                                    })
                                    .map((item) => {
                                        return (
                                            <IngredientCard openModal={() => {
                                                props.ingridientClicked();
                                                dispatch({
                                                    type: SELECT_INGREDIENT,
                                                    selected: item
                                                })
                                                handleCostructerData(item)
                                                handleBunData(item)
                                            }} key={item._id} item={item} />
                                        )
                                    })
                            }
                        </div>
                    </div>)
                })}
            </div>
        </section>
    )
}

function getTypeName(type) {
    if (type === "bun") {
        return "Булки"
    } else if (type === "sauce") {
        return "Соусы"
    } else {
        return "Начинки"
    }
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }))
}

export default BurgerIngredients;
