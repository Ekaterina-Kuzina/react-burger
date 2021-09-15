import React from 'react';
import PropTypes from 'prop-types';

import IngredientCard from './ingredient-card'
import TabsContent from './tabs-content';

import ingredients from './burger-ingredients.module.css';


function BurgerIngredients(props) {
    let types = []

    props.data.forEach(element => {
        if (!types.includes(element.type)) {
            types.push(element.type)
        }
    });

    return (
        <section className={ingredients.ingredients_wrapper} >
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <TabsContent />
            <div className={`${ingredients.blockIngredients} ${ingredients.customScroll} mt-2`}>
                {types.map(type => {
                    return (<div key={type} className="mb-2">
                        <p className="mt-8 text_type_main-medium">{getTypeName(type)}</p>
                        <div className={`${ingredients.cards} mt-6`}>
                            {
                                props.data
                                    .filter(item => {
                                        return item.type === type;
                                    })
                                    .map(item => {
                                        return (
                                            <IngredientCard key={item._id} img={item.image} cost={item.price} name={item.name} />
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
