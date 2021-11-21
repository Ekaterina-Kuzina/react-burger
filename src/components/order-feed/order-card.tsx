import React, {useEffect, useState} from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderFeedStyle from './order-feed.module.css'
import { TWsOrder } from '../../services/types/data'
import { useSelector } from '../../services/hooks';

export function OrderCard({ wsMessagesItem, order}: any) {
    const ingredientInfo = useSelector(state => state.getIngredientsInfoWithKeyId.ingredientsObjectWithKeyId);
    
    const countPrice = ()=>{
        let price= 0
        order.ingredients.forEach((ingredientId:any, index:any) =>{
            if(ingredientInfo){
                price+= Number(ingredientInfo[ingredientId].price)
            }
        })
        return price
    }
  
    return (
        <div className={`${orderFeedStyle.card_wrapper} mb-4 mr-2`}>
            <div className={`${orderFeedStyle.info_wrapper} mb-6`}>
                <p className="text text_type_digits-default">{`# ${order.number}`}</p>
                <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
            </div>

            <h2 className="text text_type_main-medium mb-6">{order.name}</h2>


            <div className={orderFeedStyle.info_wrapper}>
                <div className={orderFeedStyle.ingredients_wrapper}>
                {wsMessagesItem.orders && ingredientInfo &&
                    order.ingredients.map((ingredientId:any, index:any) =>{
                        let quantityOfIndexes = order.ingredients.length-1
                        let quantityOfIndexesWithoutFirstFive = quantityOfIndexes - 5
                        if(index < 5){
                            return(
                                <div className={orderFeedStyle.round}>
                                    <img src={ingredientInfo[ingredientId].image_mobile} alt="ingredient" />
                                </div>
                            )
                        }else if (index === 6){
                            return(
                                <div className={`${orderFeedStyle.round} `} style={{position:'relative'}}>
                                    <img className={`${orderFeedStyle.ingredients_opacity}`} src={ingredientInfo[ingredientId].image_mobile} alt="ingredient" />
                                    <div className='text text_type_digits-default' style={{position:'absolute', top: "50%" , left: '50%', transform: 'translate(-50%, -50%)',  zIndex: 10}}>{`+${quantityOfIndexesWithoutFirstFive}`}</div>
                                </div>
                            )
                        }
                        
                })}

                </div>
                <div className={`${orderFeedStyle.wrapper}`}>
                    <span className="text text_type_digits-default mr-2">{countPrice()}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </div>
    )
}

export function OrderCardForHistory({  orderForHistory , wsMessagesItemHistory}: any) {
    const ingredientInfo = useSelector(state => state.getIngredientsInfoWithKeyId.ingredientsObjectWithKeyId);
    
    const countPrice = ()=>{
        let price= 0
        orderForHistory.ingredients.forEach((ingredientId:any, index:any) =>{
            if(ingredientInfo){
                price+= Number(ingredientInfo[ingredientId].price)
            }
        })
        return price
    }
  
    return (wsMessagesItemHistory?
        <div className={`${orderFeedStyle.card_wrapper} mb-4 mr-2`}>
            <div className={`${orderFeedStyle.info_wrapper} mb-6`}>
                <p className="text text_type_digits-default">{`# ${orderForHistory.number}`}</p>
                <p className="text text_type_main-default text_color_inactive">{orderForHistory.createdAt}</p>
            </div>

            <h2 className="text text_type_main-medium mb-6">{orderForHistory.name}</h2>


            <div className={orderFeedStyle.info_wrapper}>
                <div className={orderFeedStyle.ingredients_wrapper}>
                {wsMessagesItemHistory.orders &&
                    orderForHistory.ingredients.map((ingredientId:any, index:any) =>{
                        let quantityOfIndexes = orderForHistory.ingredients.length-1
                        let quantityOfIndexesWithoutFirstFive = quantityOfIndexes - 5
                        if(index < 5){
                            return(
                                <div className={orderFeedStyle.round}>
                                    {ingredientInfo &&
                                        <img src={ingredientInfo[ingredientId].image_mobile} alt="ingredient" />
                                    }
 
                                </div>
                            )
                        }else if (index === 6){
                            return(
                                <div className={`${orderFeedStyle.round} `} style={{position:'relative'}}>
                                    <img className={`${orderFeedStyle.ingredients_opacity}`} src={ingredientInfo[ingredientId].image_mobile} alt="ingredient" />
                                    <div className='text text_type_digits-default' style={{position:'absolute', top: "50%" , left: '50%', transform: 'translate(-50%, -50%)',  zIndex: 10}}>{`+${quantityOfIndexesWithoutFirstFive}`}</div>
                                </div>
                            )
                        }
                        
                })}

                </div>
                <div className={`${orderFeedStyle.wrapper}`}>
                    <span className="text text_type_digits-default mr-2">{countPrice()}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </div>:
        <div>jdjjdjjdjd</div>
    )
}
