import React from 'react';
import orderFeedStyle from './order-feed.module.css'
import OrderCard from './order-card'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { useSelector } from '../../services/hooks';
import {TWsOrder} from '../../services/types/data'

export default function OrderList({imgByIngredientId, priceByIngredientId}:any): JSX.Element{
    let location = useLocation();
    const wsMessagesItem = useSelector(state => state.wsReducer.messages[0]);

    return (
        <div className={`${orderFeedStyle.order_list} ${orderFeedStyle.customScroll}`}>
            {wsMessagesItem &&
            wsMessagesItem.orders.map((order: TWsOrder, index: number) =>{ 
                return( 
                    <Link key={order.number}  to={{
                        pathname: `/feed/${order.number}`,
                        state: { orderModal: location }
                    }}  className={orderFeedStyle.link} >
                        {wsMessagesItem &&
                            <OrderCard order={order} imgByIngredientId={imgByIngredientId} priceByIngredientId={priceByIngredientId} wsMessagesItem ={wsMessagesItem} />
                        }

                    </Link>
                )}
            )}

        </div>
    )
}