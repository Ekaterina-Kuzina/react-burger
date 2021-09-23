import React, { useState,useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ConstructerData, MakeOrder } from '../app/data-context';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructor from './burger-constructor.module.css';
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor(props) {
    const [constructerData] = useContext(ConstructerData)
    const [sendOrder, setSendOrder] = useState([])
    const [makeOrder,setMakeOrder] = useContext(MakeOrder)

    useEffect(()=>{
        let ids = [props.bunData._id]
        constructerData.forEach(item => {
            ids.push(item._id)
        });
        setSendOrder(ids)
    }, [constructerData, props.bunData])

    const sendRequest =()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "ingredients": sendOrder })
        };
        fetch('https://norma.nomoreparties.space/api/orders', requestOptions)
            .then(res =>{
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then(data => setMakeOrder(data))
            .catch(err => console.log(err))
    }

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
                            constructerItemData.constructerID = uuidv4();
                            
                            return (
                                constructerItemData.type !== 'bun' &&
                                <div key={constructerItemData.constructerID} className={`${constructor.item_wrapper} ${constructor.custom_scroll} pl-2 pr-2`}>
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
                        sendRequest()
                    }} type="primary" size="large">Оформить заказ</Button>

                </div>
            </div>
        </section>
    )
}

function ItemOfConstructor(props) {

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

BurgerConstructor.propTypes = {
    bunData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }),
    praceState: PropTypes.number.isRequired,
}
ItemOfConstructor.propTypes = {
    constructerItemData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    })
}

export default BurgerConstructor;
