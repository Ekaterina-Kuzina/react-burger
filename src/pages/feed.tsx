import React from 'react';
import OrderList from '../components/order-feed/order-list'
import OrderSummary from '../components/order-feed/order-summary'
import orderFeedStyle from '../components/order-feed/order-feed.module.css'

export default function OrderFeed (){
    return(
        <div className ={orderFeedStyle.feed_container}>
            <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
            <div className = {orderFeedStyle.page_wrapper}>
                <OrderList/>
                <OrderSummary/>
            </div>
        </div>
    )
}

