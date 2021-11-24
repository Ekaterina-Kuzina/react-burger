import React from 'react';
import orderFeedStyle from './order-feed.module.css'
import { useSelector } from '../../services/hooks';
import { TWsOrder } from '../../services/types/data'

export default function OrderSummary() {
    const wsMessagesItem = useSelector(state => state.wsReducer?.messages[0]);

    return (wsMessagesItem ?
        <div className='ml-15'>
            <div className={`${orderFeedStyle.summary_wrapper}`}>
                <div className={orderFeedStyle.summary_block}>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>
                    <ul className={` ${orderFeedStyle.list}text text_type_digits-default`} style={{ height: '216px', overflow: 'hidden' }}>

                        {wsMessagesItem.orders.map((wsMessageOrder: TWsOrder, index: number) => {
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

                        {wsMessagesItem.orders.map((wsMessageOrder: TWsOrder, index: number) => {
                            return (wsMessageOrder.status === 'pending' &&
                                <li key={index} className={orderFeedStyle.list_of_ready}>{wsMessageOrder.number}</li>
                            )

                        })
                        }
                    </ul>
                </div>
            </div>


            <p className='text text_type_main-medium mt-15 '>Выполнено за все время:</p>
            <span className={`${orderFeedStyle.num} text text_type_digits-large`}>{wsMessagesItem.total}</span>

            <p className='text text_type_main-medium mt-15 '>Выполнено за сегодня:</p>
            <span className={`${orderFeedStyle.num} text text_type_digits-large`}>{wsMessagesItem.totalToday}</span>

        </div> :
        <div></div>

    )
}
