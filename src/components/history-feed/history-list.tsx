import React, { useEffect } from 'react';
import orderFeedStyle from '../order-feed/order-feed.module.css'
import { OrderCard } from '../order-feed/order-card'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from '../../services/hooks';
import { TWsOrder } from '../../services/types/data'
import { wsInitConnection, wsConnectionClosed } from '../../services/actions/wsActions'

export default function HistoryList() {
  let location = useLocation();
  const userInfo = useSelector(state => state.getUserInfo.userInfo);
  const dispatch = useDispatch()
  const wsMessagesItem = useSelector(state => state.wsReducer.messages[0]);
  const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
  useEffect(
    () => {
      if (userInfo && token) {
        dispatch(wsInitConnection(`wss://norma.nomoreparties.space/orders?token=${token}`))
      }
      return () => {
        dispatch(wsConnectionClosed());
      };
    }, [dispatch, userInfo, token]);
  return (
    <div className={`${orderFeedStyle.history_list} ${orderFeedStyle.customScroll}`}>
      {wsMessagesItem && userInfo &&
        wsMessagesItem.orders.map((order: TWsOrder, index: number) => {
          return (
            <Link key={index} to={{
              pathname: `/profile/orders/${order.number}`,
              state: { orderModal: location }
            }} className={orderFeedStyle.link}>
              <OrderCard order={order} wsMessagesItem={wsMessagesItem} />
            </Link>
          )
        })
      }
    </div>
  )
}
