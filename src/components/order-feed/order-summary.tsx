import React from 'react';
import orderFeedStyle from './order-feed.module.css'

export default function OrderSummary() {
    return (
        <div className= 'ml-15'>
            <div className = {`${orderFeedStyle.summary_wrapper}`}>
                <div className = {orderFeedStyle.summary_block}>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>
                    <ul className={` ${orderFeedStyle.list_of_ready}text text_type_digits-default`}>
                        <li className ={orderFeedStyle.list_of_ready}>034533</li>
                        <li className={orderFeedStyle.list_of_ready}>034532</li>
                        <li className={orderFeedStyle.list_of_ready}>034530</li>
                        <li className={orderFeedStyle.list_of_ready}>034527</li>
                        <li className={orderFeedStyle.list_of_ready}>034525</li>
                    </ul>
                </div>

                <div className = {orderFeedStyle.summary_block}>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>
                    <ul className='text text_type_digits-default'>
                        <li className={orderFeedStyle.list_in_progress}>034538</li>
                        <li className={orderFeedStyle.list_in_progress}>034541</li>
                        <li className={orderFeedStyle.list_in_progress}>034542</li>
                    </ul>
                </div>
            </div>

            <p className='text text_type_main-medium mt-15 '>Выполнено за все время:</p>
            <span className={`${orderFeedStyle.num} text text_type_digits-large`}>28 752</span>

            <p className='text text_type_main-medium mt-15 '>Выполнено за сегодня:</p>
            <span className={`${orderFeedStyle.num} text text_type_digits-large`}>138</span>
        </div>
    )
}