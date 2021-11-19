import React from 'react';
import orderFeedStyle from './order-feed.module.css'
import { useSelector, useDispatch } from '../../services/hooks';
import { TWsUserOrders, TWsOrder } from '../../services/types/data'

export default function OrderSummary() {
    const wsMessages = useSelector(state => state.wsReducer.messages);
    const wsMessagesItem = useSelector(state => state.wsReducer.messages[0]);

    return (
        <div className='ml-15'>
            <div className={`${orderFeedStyle.summary_wrapper}`}>
                <div className={orderFeedStyle.summary_block}>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>
                    <ul className={` ${orderFeedStyle.list}text text_type_digits-default`} style={{height:'216px', overflow: 'hidden'}}>

                            {wsMessagesItem &&
                            wsMessagesItem.orders.map((wsMessageOrder: any, index: number) => {
                                    return (wsMessageOrder.status === 'done' &&
                                        <li key={index} className={orderFeedStyle.list_of_ready}>{wsMessageOrder.number}</li>
                                    )

                                })
                            }

                    </ul>
                </div>

                <div className={orderFeedStyle.summary_block}>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>
                    <ul className='text text_type_digits-default'>

                        {wsMessagesItem &&
                        wsMessagesItem.orders.map((wsMessageOrder: any, index: number) => {
                            return (wsMessageOrder.status === 'pending' &&
                                <li key={index} className={orderFeedStyle.list_of_ready}>{wsMessageOrder.number}</li>
                            )

                            })
                        }
                    </ul>
                </div>
            </div>

            <p className='text text_type_main-medium mt-15 '>Выполнено за все время:</p>
            {wsMessages.map((wsMessage: any, index: number) => {
                return (
                    <span key={index} className={`${orderFeedStyle.num} text text_type_digits-large`}>{wsMessage.total}</span>
                )}
            )}

            <p className='text text_type_main-medium mt-15 '>Выполнено за сегодня:</p>
            {wsMessages.map((wsMessage: any, index: number) => {
                return (
                    <span key={index} className={`${orderFeedStyle.num} text text_type_digits-large`}>{wsMessage.totalToday}</span>
                )}
            )}

        </div>

    )
}