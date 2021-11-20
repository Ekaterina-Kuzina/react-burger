import React, {useEffect} from 'react';
import orderFeedStyle from '../order-feed/order-feed.module.css'
import OrderCard from '../order-feed/order-card'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from '../../services/hooks';
import{WS_INIT_CONNECTION_HISTORY, WS_SEND_MESSAGE_HISTORY} from '../../services/constants'

export default function HistoryList() {
    let location = useLocation();
    const userInfo = useSelector(state => state.getUserInfo.userInfo);
    const dispatch = useDispatch()
    useEffect(
        () => {
          if (userInfo) {
            dispatch({type: WS_INIT_CONNECTION_HISTORY})
            // dispatch({type: WS_SEND_MESSAGE_HISTORY})
            
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