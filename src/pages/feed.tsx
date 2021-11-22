import React, {useEffect, useState} from 'react';
import OrderList from '../components/order-feed/order-list'
import OrderSummary from '../components/order-feed/order-summary'
import orderFeedStyle from '../components/order-feed/order-feed.module.css'
import { useSelector, useDispatch } from '../services/hooks';
import{wsInitConnection, wsConnectionClosed} from '../services/actions/wsActions'
import {GET_INGREDIENTS_INFO_WITH_KEY_ID} from '../services/constants/get-ingredients-data'
import { wsGetMessage, wsSendMessage } from '../services/actions/wsActions';

export default function OrderFeed (){
    const userInfo = useSelector(state => state.getUserInfo.userInfo);
    const ingredients = useSelector(state => state.ingredientsData.ingredients)
    const dispatch = useDispatch()

  useEffect(
    () => {
      if (userInfo) {
        dispatch(wsInitConnection())
      }
      return () => {
        dispatch(wsConnectionClosed());
      };
    }, [userInfo]);
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

