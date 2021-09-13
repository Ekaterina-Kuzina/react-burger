import React from 'react';

import IngredientCard from './ingredient-card'
import TabsContent from './tabs-content';

import ingredients from './burger-ingredients.module.css';


function BurgerIngredients(props) {
    let types = []

    props.data.forEach(element => {
        if(!types.includes(element.type)){
            types.push(element.type)
        }
    });

    return (
        <div >
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <TabsContent/>
            <div className={`${ingredients.blockIngredients} ${ingredients.customScroll}`}>
                {types.map(type => {
                    return (<div key={type} className={`${ingredients.row - ingredients}`}>
                        <p className="mt-10 text_type_main-medium">{getTypeName(type)}</p>
                        <div className={`${ingredients.cards} mt-6`}>
                            {
                                props.data
                                    .filter(item => {
                                        return item.type === type;
                                    })
                                    .map(item => {
                                        console.log(item)
                                        return( 
                                        <IngredientCard key={item._id} img={item.image} cost={item.price} name={item.name} />
                                        )

                                    })
                            }
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}

function getTypeName(type){
    if(type === "bun"){
        return "Булки"
    }else if(type === "sauce"){
        return "Соусы"
    }else{
        return "Начинки"
    }
}

export default BurgerIngredients;