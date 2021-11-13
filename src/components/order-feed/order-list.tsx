import React from 'react';
import orderFeedStyle from './order-feed.module.css'
import OrderCard from './order-card'

export default function OrderList(){
    return (
        <div className={`${orderFeedStyle.order_list} ${orderFeedStyle.customScroll}`}>
            <OrderCard/>
            <OrderCard/>        
            <OrderCard/>
            <OrderCard/>
        </div>
    )
}