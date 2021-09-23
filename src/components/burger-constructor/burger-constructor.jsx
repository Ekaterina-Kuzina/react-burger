import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { SelectedItemDataContext, ConstructerData, MakeOrder } from '../app/data-context';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructor from './burger-constructor.module.css';

function BurgerConstructor(props) {
    const [selectedItem] = useContext(SelectedItemDataContext)
    const [constructerData, setConstructerData] = useContext(ConstructerData)
    const [makeOrder, setMakeOrder] = useContext(MakeOrder)

    

    // useEffect(() => {
    //     fetch('https://norma.nomoreparties.space/api/orders', {
    //         method: "POST",
    //         body: { 
    //             "ingredients": ["609646e4dc916e00276b286e","609646e4dc916e00276b2870"]
    //         } 
    //     })

    // }, [makeOrder])

    return (
        <section className={`${constructor.wrapper} pt-15`}>
            <div className={`${constructor.inner_wrapper}`}>
                <div className="pl-10">
                    {props.bunData !== undefined &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${props.bunData.name} (верх)`}
                            price={props.bunData.price}
                            thumbnail={props.bunData.image}
                        />
                    }

                </div>

                <div>
                    {constructerData !== undefined &&
                        constructerData.map((constructerItemData) => {
                            return (
                                constructerItemData.type !== 'bun' &&
                                <div className={`${constructor.item_wrapper} ${constructor.custom_scroll} pl-2 pr-2`}>
                                    <ItemOfConstructor constructerItemData={constructerItemData} />
                                </div>
                            )
                        })
                    }
                </div>

                <div className="pl-10">
                    {props.bunData !== undefined &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${props.bunData.name} (низ)`}
                            price={props.bunData.price}
                            thumbnail={props.bunData.image}
                        />
                    }

                </div>

                <div className={`${constructor.order} mt-10`}>
                    <div className={`${constructor.final_cost} mr-10`}>
                        <span className="mr-2 text text_type_digits-medium">{props.praceState}</span>
                        <CurrencyIcon type="primary" />
                    </div>

                    <Button onClick={(e) => {
                        props.switchOpenState(e);
                        // setMakeOrder()
                    }} type="primary" size="large">Оформить заказ</Button>

                </div>

                <div>

                </div>
            </div>

        </section>
    )
}

function ItemOfConstructor(props) {
    const [selectedItem, setSelectedItem] = useContext(SelectedItemDataContext)

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '10px' }} className="mt-4 mb-4">
            <DragIcon type="primary" />

            <ConstructorElement
                text={props.constructerItemData.name}
                price={props.constructerItemData.price}
                thumbnail={props.constructerItemData.image} />

        </div>
    )
}

// BurgerConstructor.propTypes = {
//     data: PropTypes.arrayOf(PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         image: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//         _id: PropTypes.string.isRequired,
//     }))
// }
ItemOfConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }))
}

export default BurgerConstructor;
