import React, {useEffect} from 'react';
import orderFeedStyle from '../order-feed/order-feed.module.css'
import OrderCard from '../order-feed/order-card'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from '../../services/hooks';
import{wsInitConnection} from '../../services/actions/wsActions'

export default function HistoryList() {
    let location = useLocation();
    const userInfo = useSelector(state => state.getUserInfo.userInfo);
    const dispatch = useDispatch()
    useEffect(
        () => {
          if (userInfo) {
            dispatch( wsInitConnection())
          }
        },
        [userInfo] 
      );
    return (
        <div className={`${orderFeedStyle.history_list} ${orderFeedStyle.customScroll}`}>
            <Link to={{
                pathname: `/profile/orders/:id`,
                state: { orderModal: location }
            }} className={orderFeedStyle.link}>
                {/* <OrderCard /> */}
            </Link>
        </div>
    )
}