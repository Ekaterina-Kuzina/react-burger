import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredients from './burger-ingredients.module.css'
import bun01Img from '../../images/bun-01.png'
import bun02Img from '../../images/bun-02.png'

function BurgerIngredients() {
    return (
        <div >
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <TabsContent />
            <div className={`${ingredients.block-ingredients}`}>
                <RowIngredients title="Булки"/>
                <RowIngredients title="Соусы"/>

            </div>
        </div>
    )
}

function RowIngredients(props){
    return(
        <div className={`${ingredients.row-ingredients}`}>
            <h2 className="mt-10 text_type_main-medium">{props.title}</h2>

            <div className={`${ingredients.cards} mt-6`}>
                <div className={ingredients.card}>
                    <img src={bun01Img} alt="bun" />
                    <div className={`${ingredients.cost} mt-1 mb-1`}>
                        <p className="mr-2 text text_type_digits-default">20</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>

                <div className={ingredients.card}>
                    <img src={bun02Img} alt="bun" />
                    <div className={`${ingredients.cost} mt-1 mb-1`}>
                        <p className="mr-2 text text_type_digits-default">20</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                </div>
            </div>
        </div>
    )
}

function TabsContent() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                One
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Two
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Three
            </Tab>
        </div>
    )
}


export default BurgerIngredients;