import React from 'react';

import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { data__list } from '../../ utils/data';
import constructor from './burger-constructor.module.css';
import img from '../../images/a.png'
console.log(data__list.forEach(item =>{console.log(item.price)}))
console.log(data__list)

function ItemOfConstructor(props){
    return(
        <div style={{alignItems:"center"}} className="pl-1">
            <div style={{ display: 'flex', alignItems:'center' , flexDirection: 'row', gap: '10px' }} className="mt-4 mb-4">
                <DragIcon type="primary"/>
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={img}
                />
            </div>

        </div>
    )

}


function BurgerConstructor(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{}} className={`${constructor.wrapper} pt-15`}>
                <span className="pl-10">
                    <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${props.data[0].name} (верх)`}
                    price={props.data[0].price}
                    thumbnail={props.data[0].image}
                />
                </span>
                <ItemOfConstructor/>
            {/* <span>
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={data.name}
                    price={data.price}
                    thumbnail={data.image}
                />
            </span> */}
            <span className="pl-10">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${props.data[0].name} (низ)`}
                    price={props.data[0].price}
                    thumbnail={props.data[0].image}
                />
            </span>
            </div>


        </div>
    )
}


export default BurgerConstructor;