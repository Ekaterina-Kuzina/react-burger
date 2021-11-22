import React, {useEffect} from 'react';
import orderFeedStyle from './order-feed.module.css'
import {OrderCard} from './order-card'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from '../../services/hooks';
import {TWsOrder} from '../../services/types/data'
import {FULL_OBJ_FROM_WS} from '../../services/constants/wsActionTypes'

export default function OrderList(): JSX.Element{
    let location = useLocation();
    let dispatch = useDispatch()
    const wsMessagesItem = useSelector(state => state.wsReducer.messages[0]);
    useEffect(() => {
        dispatch({type: FULL_OBJ_FROM_WS, objFromWs: wsMessagesItem})
    }, [wsMessagesItem])

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
                            <OrderCard order={order} wsMessagesItem ={wsMessagesItem} />
                        }

                    </Link>
                )}
            )}

        </div>
    )
}