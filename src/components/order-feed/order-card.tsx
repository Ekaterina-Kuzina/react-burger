import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderFeedStyle from './order-feed.module.css'
import bun from "../../images/bun.png";
import { TWsOrder } from '../../services/types/data'
import { useSelector } from '../../services/hooks';

export default function OrderCard({ wsMessagesItem }: any) {


    return (wsMessagesItem.orders.map((order: TWsOrder, index: number) => {
        return (
            <div key={index} className={`${orderFeedStyle.card_wrapper} mb-4 mr-2`}>
                <div className={`${orderFeedStyle.info_wrapper} mb-6`}>
                    <p className="text text_type_digits-default">{`# ${order.number}`}</p>
                    <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
                </div>

                <h2 className="text text_type_main-medium mb-6">{order.name}</h2>

                <div className={orderFeedStyle.info_wrapper}>
                    <div className={orderFeedStyle.ingredients_wrapper}>
                        <div className={orderFeedStyle.round}>
                            <img src={bun} alt="ingredient" />
                        </div>
                        <div className={orderFeedStyle.round}>
                            <img src={bun} alt="" />
                        </div>
                        <div className={orderFeedStyle.round}>
                            <img src={bun} alt="" />
                        </div>
                    </div>

                    <div className={`${orderFeedStyle.wrapper}`}>
                        <span className="text text_type_digits-default mr-2">480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>

            </div>
        )
    }))
}