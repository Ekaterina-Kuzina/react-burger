import React from 'react';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderFeedStyle from './order-feed.module.css'
import bun from "../../images/bun.png";

export default function OrderCard() {
    return (
        <div className = {`${orderFeedStyle.card_wrapper} mb-4 mr-2`}>
            <div className={`${orderFeedStyle.info_wrapper} mb-6`}>
                <p className ="text text_type_digits-default">#034535</p>
                <p className = "text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
            </div>

            <h2 className="text text_type_main-medium mb-6">Death Star Starship Main бургер</h2>

            <div className = {orderFeedStyle.info_wrapper}>
                <div className= {orderFeedStyle.ingredients_wrapper}>
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

                <div className = {`${orderFeedStyle.wrapper}`}>
                    <span className="text text_type_digits-default mr-2">480</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </div>
    )
}