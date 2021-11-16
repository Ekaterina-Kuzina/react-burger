import React from 'react';
import orderFeedStyle from '../order-feed/order-feed.module.css'
import OrderCard from '../order-feed/order-card'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

export default function HistoryList() {
    let location = useLocation();

    return (
        <div className={`${orderFeedStyle.history_list} ${orderFeedStyle.customScroll}`}>
            <Link to={{
                pathname: `/profile/orders/:id`,
                state: { orderModal: location }
            }} className={orderFeedStyle.link}>
                <OrderCard />
            </Link>
        </div>
    )
}