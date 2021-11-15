import React from 'react';
import orderFeedStyle from './order-feed.module.css'
import OrderCard from './order-card'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'

export default function OrderList(){
    let location = useLocation();
    return (
        <div className={`${orderFeedStyle.order_list} ${orderFeedStyle.customScroll}`}>
            <Link to={{
                pathname: `/feed/:id`,
                state: { orderModal: location }
            }}  className={orderFeedStyle.link}>
                <OrderCard/>
            </Link>
            <Link to= '/feed/:id' className={orderFeedStyle.link}>
                <OrderCard/>
            </Link>
            <Link to='/feed/:id' className={orderFeedStyle.link}>
                <OrderCard/>
            </Link>
        </div>
    )
}