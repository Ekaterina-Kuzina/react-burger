import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import IngredientCard from './ingredient-card'
import TabsContent from './tabs-content';

import ingredients from './burger-ingredients.module.css';
import { DataContext, SelectedItemDataContext, ConstructerData } from '../app/data-context';

function BurgerIngredients(props) {
    const stateData = useContext(DataContext)
    const {setSelectedItem} = useContext(SelectedItemDataContext)
    const {constructerData, setConstructerData} = useContext(ConstructerData)

    let types = []

    stateData.data.forEach(element => {
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

        <section className={ingredients.ingredients_wrapper} >
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <TabsContent />
            <div className={`${ingredients.blockIngredients} ${ingredients.customScroll} mt-2`}>
                {types.map(type => {
                    return (<div key={type} className="mb-2">
                        <p className="mt-8 text_type_main-medium">{getTypeName(type)}</p>
                        <div className={`${ingredients.cards} mt-6`}>
                            {
                                stateData.data
                                    .filter(item => {
                                        return item.type === type;
                                    })
                                    .map((item) => {
                                        return (
                                            <IngredientCard openModal={() => {
                                                props.ingridientClicked();
                                                setSelectedItem(item);
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
