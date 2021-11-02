import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import IngredientCard from './ingredient-card'
import TabsContent from './tabs-content';

import ingredientsStyle from './burger-ingredients.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { SELECT_INGREDIENT } from '../../services/actions/index'

import {TItemData} from '../../utils/types'

type TBurgerIngredientsProps = {
    ingridientClicked: ()=> void;
}

export default function BurgerIngredients({ingridientClicked}:TBurgerIngredientsProps) {
    const dispatch = useDispatch()
    const constructerIngredients = useSelector((state: any) => state.constructerData.constructerIngredients)
    const constructerBun = useSelector((state: any) => state.bunData.constructerBun)

    const ingredients = useSelector((state: any) => state.ingredientsData.ingredients)
    const [tabIndex, setTabIndex] = useState(0)
    const listRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(listRef.current){
            listRef.current.addEventListener('scroll', () => {
                if(listRef.current){
                    const parentY = listRef.current.getBoundingClientRect().y
                    const childrenArray = Array.from(listRef.current.children)
                    const sortedByY = childrenArray
                    .filter((child) => {
                        return child.getBoundingClientRect().y >= parentY
                    })
                    .sort((a, b) => a.getBoundingClientRect().y - b.getBoundingClientRect().y)

                        
                if (sortedByY.length !== 0) {
                    const nearestChild = sortedByY[0]
                    const index = childrenArray.indexOf(nearestChild)
                    setTabIndex(index)
                }
                }
            })
        }
    })

    let types: string[] = []

    ingredients.forEach((element:TItemData) => {
        if (!types.includes(element.type)) {
            types.push(element.type)
        }
    });

    const handleSelectedData = (item: TItemData) => {
        dispatch({
            type: SELECT_INGREDIENT,
            selected: item
        })
    }

    return (

        <section className={ingredientsStyle.ingredients_wrapper} >
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <TabsContent changeTabIndex={(index) => { setTabIndex(index) }} tabIndex={tabIndex} />
            <div ref={listRef} className={`${ingredientsStyle.blockIngredients} ${ingredientsStyle.customScroll} mt-2`}>
                {types.map(type => {
                    return (<div key={type} className="mb-2">
                        <div className="mt-8 text_type_main-medium">{getTypeName(type)}</div>
                        <div className={`${ingredientsStyle.cards} mt-6`}>
                            {
                                ingredients
                                    .filter((item:TItemData) => {
                                        return item.type === type;
                                    })
                                    .map((item:TItemData) => {
                                        let counter = 0
                                        constructerIngredients.forEach((constructerIng: TItemData) => {
                                            if (constructerIng === item) {
                                                counter++;
                                            }
                                        })
                                        if (constructerBun === item) {
                                            counter = 2;
                                        }

                                        return (
                                            <IngredientCard openModal={() => {
                                                ingridientClicked();
                                                handleSelectedData(item)
                                            }} key={item._id} item={item} counter={counter} />
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


function getTypeName(type: string) {
    if (type === "bun") {
        return "Булки"
    } else if (type === "sauce") {
        return "Соусы"
    } else {
        return "Начинки"
    }
}

BurgerIngredients.propTypes = {
    ingridientClicked: PropTypes.func
}
