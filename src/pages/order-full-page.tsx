import React, {useEffect, useState} from 'react';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderFeedStyle from '../components/order-feed/order-feed.module.css'
import bun from "../images/bun.png";
import { useSelector, useDispatch } from '../services/hooks';
import { TWsOrder, TItemData } from '../services/types/data'
import { useParams } from 'react-router';
import {getDate, countPrice} from '../components/utils'
import{wsInitConnection, wsConnectionClosed} from '../services/actions/wsActions'
import { WS_INIT_CONNECTION_HISTORY, WS_CONNECTION_CLOSED_HISTORY } from '../services/constants'

type TParamTypes = {
    id: string;
}
type TOrderFullPageProps = {
    feed?:string,
    profile?: string
}

export default function OrderFullPage({feed,profile}:TOrderFullPageProps) {
    const dispatch = useDispatch()
    const ingredientInfo= useSelector(state => state.ingredientsData.ingredientsObjectWithKeyId)
    const wsOrders = useSelector(state => {
        if(state.wsReducer.messages[0]) {
            return state.wsReducer.messages[0].orders
        }
    });
    const wsOrdersForHistory = useSelector(state => {
        if(state.wsReducerForHistory.messagesHistory[0]) {
            return state.wsReducerForHistory.messagesHistory[0].orders
        }
    });

    const [selectedOrder, setSelectedOrder] = useState<any>({})
    const [ingredientsForFullPage, setIngredientsForFullPage] = useState<any>(null)
    let { id } = useParams<any>();
    let date = getDate(selectedOrder.createdAt)
    useEffect(()=>{
        if(feed){
            dispatch(wsInitConnection())
            return () => {
                dispatch(wsConnectionClosed());
              };
        }
        if(profile){
            dispatch({ type: WS_INIT_CONNECTION_HISTORY })
            
        }
    }, [])

    useEffect(() => {

        if(wsOrders){
            let item = wsOrders.find((order:TWsOrder)=>{
                if(order.number == id){
                    return order
                }
            })
            setSelectedOrder(item)

            if(item){
               let orderIngredients = item.ingredients.map((idOfIngredient: string)=>{
                    return ingredientInfo[idOfIngredient]
                })
                setIngredientsForFullPage(orderIngredients)
            }
        }
        if(wsOrdersForHistory){
            let item = wsOrdersForHistory.find((order:TWsOrder)=>{
                if(order.number == id){
                    return order
                }
            })
            setSelectedOrder(item)

            if(item){
               let orderIngredients = item.ingredients.map((idOfIngredient: string)=>{
                    return ingredientInfo[idOfIngredient]
                })
                setIngredientsForFullPage(orderIngredients)
            }
        }

    }, [wsOrders, wsOrdersForHistory, id, ingredientInfo])


    return ( selectedOrder &&
        <div className = {`${orderFeedStyle.full_page_num} mb-4 mr-2`}>
            <p className ={`${orderFeedStyle.centered_text} text text_type_digits-default mb-10`}>{`#${selectedOrder.number}`}</p>
            <h2 className="text text_type_main-medium mb-3">{selectedOrder.name}</h2>
            <p className = "text text_type_main-default mb-15">{selectedOrder.status}</p> 

            <h3 className='text text_type_main-medium mb-6'>Состав:</h3>

            <div className ={`${orderFeedStyle.full_page_wrapper} ${orderFeedStyle.customScroll}`}>
                
            {ingredientsForFullPage &&
            ingredientsForFullPage.map((ingredientForFullPage: any, index: number) => {
                return(
                <div key={index} className = {`${orderFeedStyle.wrapper} mb-4 mr-6`}>
                    <div className= {orderFeedStyle.ingredients_wrapper}>
                        <div className={orderFeedStyle.round_modern}>
                            <img className={orderFeedStyle.round_img} src={ingredientForFullPage.image} alt="ingredient" />
                        </div>
                    </div>

                    <p className= {`${orderFeedStyle.ingr_name} text text_type_main-defaul ml-4`}>
                        {ingredientForFullPage.name}
                    </p>

                    <div className = {`${orderFeedStyle.wrapper}`}>
                        <span className="text text_type_digits-default mr-2">{ingredientForFullPage.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                )
            })}

                
            </div>

            <div className = {`${orderFeedStyle.info_wrapper} mt-10`}>
                <p className = "text text_type_main-default text_color_inactive">{date}</p> 
                <div className = {`${orderFeedStyle.wrapper}`}>
                    <span className="text text_type_digits-default mr-2">{countPrice(selectedOrder,ingredientInfo)}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </div>
    )
}
