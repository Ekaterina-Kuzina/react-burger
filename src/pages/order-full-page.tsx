import React from 'react';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderFeedStyle from '../components/order-feed/order-feed.module.css'
import bun from "../images/bun.png";

export default function OrderFullPage() {
    return (
        <div className = {`${orderFeedStyle.full_page_num} mb-4 mr-2`}>
            <p className ={`${orderFeedStyle.centered_text} text text_type_digits-default mb-10`}>#034535</p>
            <h2 className="text text_type_main-medium mb-3">Death Star Starship Main бургер</h2>
            <p className = "text text_type_main-default mb-15">Выполнен</p> 


            <h3 className='text text_type_main-medium mb-6'>Состав:</h3>
            
            <div className ={`${orderFeedStyle.full_page_wrapper} ${orderFeedStyle.customScroll}`}>
                <div className = {`${orderFeedStyle.wrapper} mb-4 mr-6`}>
                    <div className= {orderFeedStyle.ingredients_wrapper}>
                        <div className={orderFeedStyle.round_modern}>
                            <img src={bun} alt="ingredient" />
                        </div>
                    </div>

                    <p className= {`${orderFeedStyle.ingr_name} text text_type_main-defaul ml-4`}>
                        Флюоресцентная булка R2-D3
                    </p>

                    <div className = {`${orderFeedStyle.wrapper}`}>
                        <span className="text text_type_digits-default mr-2">2</span>
                        <span className="text text_type_digits-default mr-2">x</span>
                        <span className="text text_type_digits-default mr-2">480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>

                <div className = {`${orderFeedStyle.wrapper} mb-4 mr-6`}>
                    <div className= {orderFeedStyle.ingredients_wrapper}>
                        <div className={orderFeedStyle.round_modern}>
                            <img src={bun} alt="ingredient" />
                        </div>
                    </div>

                    <p className= {`${orderFeedStyle.ingr_name} text text_type_main-defaul ml-4`}>
                        Флюоресцентная булка R2-D3
                    </p>

                    <div className = {`${orderFeedStyle.wrapper}`}>
                        <span className="text text_type_digits-default mr-2">2</span>
                        <span className="text text_type_digits-default mr-2">x</span>
                        <span className="text text_type_digits-default mr-2">480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div className = {`${orderFeedStyle.wrapper} mb-4 mr-6`}>
                    <div className= {orderFeedStyle.ingredients_wrapper}>
                        <div className={orderFeedStyle.round_modern}>
                            <img src={bun} alt="ingredient" />
                        </div>
                    </div>

                    <p className= {`${orderFeedStyle.ingr_name} text text_type_main-defaul ml-4`}>
                        Флюоресцентная булка R2-D3
                    </p>

                    <div className = {`${orderFeedStyle.wrapper}`}>
                        <span className="text text_type_digits-default mr-2">2</span>
                        <span className="text text_type_digits-default mr-2">x</span>
                        <span className="text text_type_digits-default mr-2">480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div className = {`${orderFeedStyle.wrapper} mb-4 mr-6`}>
                    <div className= {orderFeedStyle.ingredients_wrapper}>
                        <div className={orderFeedStyle.round_modern}>
                            <img src={bun} alt="ingredient" />
                        </div>
                    </div>

                    <p className= {`${orderFeedStyle.ingr_name} text text_type_main-defaul ml-4`}>
                        Флюоресцентная булка R2-D3
                    </p>

                    <div className = {`${orderFeedStyle.wrapper}`}>
                        <span className="text text_type_digits-default mr-2">2</span>
                        <span className="text text_type_digits-default mr-2">x</span>
                        <span className="text text_type_digits-default mr-2">480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>

                <div className = {`${orderFeedStyle.wrapper} mb-4 mr-6`}>
                    <div className= {orderFeedStyle.ingredients_wrapper}>
                        <div className={orderFeedStyle.round_modern}>
                            <img src={bun} alt="ingredient" />
                        </div>
                    </div>

                    <p className= {`${orderFeedStyle.ingr_name} text text_type_main-defaul ml-4`}>
                        Флюоресцентная булка R2-D3
                    </p>

                    <div className = {`${orderFeedStyle.wrapper}`}>
                        <span className="text text_type_digits-default mr-2">2</span>
                        <span className="text text_type_digits-default mr-2">x</span>
                        <span className="text text_type_digits-default mr-2">480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>

                
            </div>

            <div className = {`${orderFeedStyle.info_wrapper} mt-10`}>
                <p className = "text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p> 
                <div className = {`${orderFeedStyle.wrapper}`}>
                    <span className="text text_type_digits-default mr-2">510</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>


        </div>
    )
}