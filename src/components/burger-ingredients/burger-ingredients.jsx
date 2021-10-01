import React, { useState, useContext ,useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

import IngredientCard from './ingredient-card'
import TabsContent from './tabs-content';

import ingredientsStyle from './burger-ingredients.module.css';
import { ConstructerData } from '../app/data-context';
import { useSelector, useDispatch } from 'react-redux';
import {SELECT_INGREDIENT, GET_CONSTRUCTER_DATA, GET_BUN_DATA} from '../../services/actions/index'

function BurgerIngredients(props) {
    const dispatch = useDispatch()
    const constructerIngredients = useSelector((state) => state.constructerData.constructerIngredients)

    const ingredients = useSelector((state) => state.ingredientsData.ingredients)
    const [tabIndex, setTabIndex] = useState(0)
    const listRef = useRef()

    useEffect(() => {
        listRef.current.addEventListener('scroll', () => {
            const parentY = listRef.current.getBoundingClientRect().y
            const childrenArray = Array.from(listRef.current.children)
            const sortedByY = childrenArray
                .filter((child) => {
                    return child.getBoundingClientRect().y >= parentY
                })
                .sort((a, b) => a.getBoundingClientRect().y - b.getBoundingClientRect().y)

            if(sortedByY.lenght !== 0){
                const nearestChild = sortedByY[0]
                const index = childrenArray.indexOf(nearestChild)
                setTabIndex(index)
            }
        })
    })



    let types = []

    ingredients.forEach(element => {
        if (!types.includes(element.type)) {
            types.push(element.type)
        }
    });

    const handleSelectedData=(item)=>{
        dispatch({
            type: SELECT_INGREDIENT,
            selected: item
        })
    }
    // const handleCostructerData = (item) => {
    //     if (item.type !== 'bun') {
    //         dispatch({
    //             type: GET_CONSTRUCTER_DATA,
    //             constructerIngredients: item
    //         })
    //     }
    // }

    // const handleBunData = (item) => {
    //     if (item.type === 'bun') {
    //         dispatch({
    //             type: GET_BUN_DATA, 
    //             constructerBun: item
    //         })
    //     }
    // }

    return (

        <section className={ingredientsStyle.ingredients_wrapper} >
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <TabsContent changeTabIndex={(index)=>{setTabIndex(index)}} tabIndex={tabIndex} />
            <div ref={listRef} className={`${ingredientsStyle.blockIngredients} ${ingredientsStyle.customScroll} mt-2`}>
                {types.map(type => {
                    return (<div key={type} className="mb-2">
                        <div className="mt-8 text_type_main-medium">{getTypeName(type)}</div>
                        <div className={`${ingredientsStyle.cards} mt-6`}>
                            {
                                ingredients
                                    .filter(item => {
                                        return item.type === type;
                                    })
                                    .map((item) => {
                                        let counter = 0
                                            constructerIngredients.forEach(constructerIng=>{
                                                if(constructerIng === item){
                                                    counter ++;
                                                }
                                            })
                                        
                                        return (
                                            <IngredientCard openModal={() => {
                                                props.ingridientClicked();
                                                handleSelectedData(item)
                                            }} key={item._id} item={item} counter={counter}/>
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
