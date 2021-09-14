import React from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data__list } from '../../ utils/data';
import constructor from './burger-constructor.module.css';


function BurgerConstructor(props) {
    return (
        <section className={`${constructor.wrapper} pt-15`}>
            <div className={`${constructor.inner_wrapper}`}>
                <div className="pl-10">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${props.data[0].name} (верх)`}
                        price={props.data[0].price}
                        thumbnail={props.data[0].image}
                    />
                </div>

                <div>
                    <div className={`${constructor.item_wrapper} ${constructor.custom_scroll} pl-2 pr-2`}>
                        <ItemOfConstructor data={data__list} />
                    </div>
                </div>

                <div className="pl-10">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${props.data[0].name} (низ)`}
                        price={props.data[0].price}
                        thumbnail={props.data[0].image}
                    />
                </div>

                <div className={`${constructor.order} mt-10`}>
                    <div className={`${constructor.final_cost} mr-10`}>
                        <span className="mr-2 text text_type_digits-medium">610</span>
                        <CurrencyIcon type="primary" />
                    </div>

                    <Button type="primary" size="large">Оформить заказ</Button>

                </div>

                <div>

                </div>
            </div>
        </section>
    )
}

function ItemOfConstructor(props) {
    return (props.data
        .filter(item => item.type !== 'bun')
        .map(item => {
            return (
                <div key={item._id} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '10px' }} className="mt-4 mb-4">
                    <DragIcon type="primary" />

                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image} />

                </div>
            )
        })
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
        type: PropTypes.string,
        _id: PropTypes.string,
    }))
}

export default BurgerConstructor;
