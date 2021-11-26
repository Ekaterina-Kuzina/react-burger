import React, {useEffect} from 'react';
import OrderList from '../components/order-feed/order-list'
import OrderSummary from '../components/order-feed/order-summary'
import orderFeedStyle from '../components/order-feed/order-feed.module.css'
import { useSelector, useDispatch } from '../services/hooks';
import{wsInitConnection, wsConnectionClosed} from '../services/actions/wsActions'

export default function OrderFeed (){
    const userInfo = useSelector(state => state.getUserInfo.userInfo);
    const dispatch = useDispatch()

  useEffect(
    () => {
      if (userInfo) {
        dispatch(wsInitConnection('wss://norma.nomoreparties.space/orders/all'))
      }
      return () => {
        dispatch(wsConnectionClosed());
      };
    }, [userInfo, dispatch]);
    return(
        <div className ={orderFeedStyle.feed_container}>
            <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
            <div className = {orderFeedStyle.page_wrapper}>
                <OrderList />
                <OrderSummary/>
            </div>
        </div>
    )
}
