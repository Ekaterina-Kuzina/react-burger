import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderFeedStyle from './order-feed.module.css'
import { useSelector } from '../../services/hooks';
import { getDate, countPrice } from '../utils'
import {TWsUserOrders, TWsOrder} from '../../services/types/data'

type TOrderCardProps = {
    wsMessagesItem: TWsUserOrders;
    order: TWsOrder
}

export function OrderCard({ wsMessagesItem, order }: TOrderCardProps) {
    const ingredientInfo = useSelector(state => state.ingredientsData?.ingredientsObjectWithKeyId)
    const date = getDate(order.createdAt);

    return (
        <div className={`${orderFeedStyle.card_wrapper} mb-4 mr-2`}>
            <div className={`${orderFeedStyle.info_wrapper} mb-6`}>
                <p className="text text_type_digits-default">{`# ${order.number}`}</p>
                <p className="text text_type_main-default text_color_inactive">{date}</p>
            </div>

            <h2 className="text text_type_main-medium mb-6">{order.name}</h2>


            <div className={orderFeedStyle.info_wrapper}>
                <div className={orderFeedStyle.ingredients_wrapper}>
                    {wsMessagesItem.orders && ingredientInfo &&
                        order.ingredients.map((ingredientId: any, index: any) => {
                            let quantityOfIndexes = order.ingredients.length
                            let quantityOfIndexesWithoutFirstFive = quantityOfIndexes - 5
                            if (index < 5) {
                                return (
                                    <div key={index} className={orderFeedStyle.round}>
                                        {ingredientInfo &&
                                            <img src={ingredientInfo[ingredientId].image_mobile} alt="ingredient" />
                                        }
                                    </div>
                                )
                            } else if (index === 6) {
                                return (
                                    <div key={index} className={`${orderFeedStyle.round} `} style={{ position: 'relative' }}>
                                        <img className={`${orderFeedStyle.ingredients_opacity}`} src={ingredientInfo[ingredientId].image_mobile} alt="ingredient" />
                                        <div className='text text_type_digits-default' style={{ position: 'absolute', top: "50%", left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>{`+${quantityOfIndexesWithoutFirstFive}`}</div>
                                    </div>
                                )
                            }

                        })}

                </div>
                <div className={`${orderFeedStyle.wrapper}`}>
                    <span className="text text_type_digits-default mr-2">{countPrice(order, ingredientInfo)}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </div>
    )
}
