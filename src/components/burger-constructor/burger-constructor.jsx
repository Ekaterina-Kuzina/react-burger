import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from "react-dnd";
import ItemOfConstructor from './item-of-constructor'
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructor from './burger-constructor.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/make-order'
import { GET_CONSTRUCTER_DATA, GET_BUN_DATA, FILTER_CONSTRUCTER } from '../../services/actions/index'

export default function BurgerConstructor({orderButtonClicked}) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.getUserInfo.userInfo);

    const price = useSelector((state) => state.countedPrice.price)
    const [orderList, setOrderList] = useState([])

    const constructerIngredients = useSelector((state) => state.constructerData.constructerIngredients)
    const constructerBun = useSelector((state) => state.bunData.constructerBun)


    useEffect(() => {
        if(constructerBun){
            let ids = [constructerBun._id]
            constructerIngredients.forEach(item => {
                ids.push(item._id)
            });
            setOrderList(ids)
        }

    }, [constructerIngredients, constructerBun])

    const sendRequest = (orderList) => {
        dispatch(sendOrder(orderList))
    }

    const onDropHandler = (item) => {
        if (item.type === 'bun') {
            dispatch({
                type: GET_BUN_DATA,
                constructerBun: item
            })
        } else {
            dispatch({
                type: GET_CONSTRUCTER_DATA,
                constructerIngredients: item
            })
        }
    }
    const [{ isOver }, dropTarget] = useDrop({
        accept: "ingredients",
        drop(item) {
            onDropHandler(item);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    const borderColor = isOver ? '#762D76' : '#131316';

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: FILTER_CONSTRUCTER,
            fromIndex: dragIndex,
            toIndex: hoverIndex
        })


    }, [constructerIngredients]);
    
    return (

        <section className={`${constructor.wrapper} pt-15`}>
            <div className={`${constructor.inner_wrapper}`}>
                <div style={{ border: '2px solid #131316', borderRadius: '20px', borderColor }} ref={dropTarget}>
                    <div className={`${constructor.bun_wrapper} pl-10 `}>
                        {constructerBun ?
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${constructerBun.name} (верх)`}
                                price={constructerBun.price}
                                thumbnail={constructerBun.image}
                            />:
                            <div className={`${constructor.constructor_empty} ${constructor.constructor_empty_top} text text_type_main-default`}>
                                Выберите булку
                            </div>

                        }

                    </div>

                    <div className={`${constructor.item_wrapper} ${constructor.custom_scroll}`}>
                        {constructerIngredients !== null &&
                            constructerIngredients.map((constructerItemData, index) => {
                                constructerItemData.constructerID = uuidv4();
                                constructerItemData.index = index
                                return (
                                    constructerItemData.type !== 'bun' &&
                                    <div key={index} className={`${constructor.item}pl-2 `}>
                                        <ItemOfConstructor id={constructerIngredients._id} moveCard={moveCard} index={index} constructerItemData={constructerItemData} />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className= {`${constructor.bun_wrapper} pl-10 `}>
                        {constructerBun?
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${constructerBun.name} (низ)`}
                                price={constructerBun.price}
                                thumbnail={constructerBun.image}
                            />:
                            <div className={`${constructor.constructor_empty} ${constructor.constructor_empty_bottom} text text_type_main-default `}>
                                Выберите булку
                            </div>
                        }

                    </div>
                </div>
                <div className={`${constructor.order} mt-10`}>
                    <div className={`${constructor.final_cost} mr-10`}>
                        <span className="mr-2 text text_type_digits-medium">{price}</span>
                        <CurrencyIcon type="primary" />
                    </div>

                    <Button onClick={() => {
                        if(constructerBun) {
                            orderButtonClicked();
                            if(userInfo){
                                sendRequest(orderList)
                            }
                        }

                    }} type="primary" size="large">Оформить заказ</Button>

                </div>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    orderButtonClicked: PropTypes.func
}
