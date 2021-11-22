import React, { useEffect } from 'react';
import orderFeedStyle from '../order-feed/order-feed.module.css'
import { OrderCard, OrderCardForHistory } from '../order-feed/order-card'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from '../../services/hooks';
import { WS_INIT_CONNECTION_HISTORY, WS_CONNECTION_CLOSED_HISTORY } from '../../services/constants'
import { TWsOrder } from '../../services/types/data'

export default function HistoryList() {
  let location = useLocation();
  const userInfo = useSelector(state => state.getUserInfo.userInfo);
  const dispatch = useDispatch()
  const ingredientInfo= useSelector(state => state.ingredientsData.ingredientsObjectWithKeyId)
  const wsMessagesItemHistory = useSelector(state => state.wsReducerForHistory.messagesHistory[0]);
  useEffect(
    () => {
      if (userInfo) {
        dispatch({ type: WS_INIT_CONNECTION_HISTORY })
      }
      // return () => {
      //   dispatch({ type: WS_CONNECTION_CLOSED_HISTORY })
      // };
    },[userInfo]);
  return (
    <div className={`${orderFeedStyle.history_list} ${orderFeedStyle.customScroll}`}>
      {wsMessagesItemHistory && userInfo &&
        wsMessagesItemHistory.orders.map((order: TWsOrder, index: number) => {
          return (
            <Link to={{
              pathname: `/profile/orders/${order.number}`,
              state: { orderModal: location }
            }} className={orderFeedStyle.link}>
              <OrderCardForHistory orderForHistory={order} wsMessagesItemHistory={wsMessagesItemHistory}/>
            </Link>
          )
        })
      }
    </div>
  )
}