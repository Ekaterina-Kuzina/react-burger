import React from 'react';
import orderFeedStyle from './order-feed.module.css'
import OrderCard from './order-card'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { useSelector } from '../../services/hooks';
import {TWsUserOrders} from '../../services/types/data'

export default function OrderList(): JSX.Element{
    let location = useLocation();
    const wsMessages = useSelector(state => state.wsReducer.messages);
    const wsMessagesItem = useSelector(state => state.wsReducer.messages[0]);
    return (
        <div className={`${orderFeedStyle.order_list} ${orderFeedStyle.customScroll}`}>
            {wsMessagesItem &&
            wsMessagesItem.orders.map((wsMessage: TWsUserOrders, index: number) =>{ 
                return( 
                    <Link key={index}  to={{
                        pathname: `/feed/:id`,
                        state: { orderModal: location }
                    }}  className={orderFeedStyle.link}>
                        {wsMessagesItem &&
                            <OrderCard wsMessagesItem ={wsMessagesItem} />
                        }

                    </Link>
                )}
            )}

        </div>
    )
}