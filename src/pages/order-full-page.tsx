import React, { useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderFeedStyle from '../components/order-feed/order-feed.module.css'
import { useSelector, useDispatch } from '../services/hooks';
import { useParams } from 'react-router';
import { getDate, countPrice } from '../components/utils'
import { wsInitConnection, wsConnectionClosed } from '../services/actions/wsActions'
import { TUseParamsType , TWsOrder} from '../services/types/data'

type TOrderFullPageProps = {
    feed?: string,
    profile?: string
}

export default function OrderFullPage({ feed, profile }: TOrderFullPageProps) {
    const dispatch = useDispatch()
    const ingredientInfo = useSelector(state => state.ingredientsData.ingredientsObjectWithKeyId)
    const wsOrders = useSelector(state => {
        if (state.wsReducer.messages[0]) {
            return state.wsReducer.messages[0].orders
        }
    });

    const [selectedOrder, setSelectedOrder] = useState<TWsOrder| any>({})
    let { id } = useParams<TUseParamsType>();
    const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
    let date = getDate(selectedOrder.createdAt)
    useEffect(() => {
        if (feed) {
            dispatch(wsInitConnection('wss://norma.nomoreparties.space/orders/all'))
            return () => {
                dispatch(wsConnectionClosed());
            };
        }
        if (profile && token) {
            dispatch(wsInitConnection(`wss://norma.nomoreparties.space/orders?token=${token}`))
            return () => {
                dispatch(wsConnectionClosed());
            };
        }
    }, [])

    useEffect(() => {

        if (wsOrders) {
            let item = wsOrders.find((order: TWsOrder) => {
                if (String(order.number) === id) {
                    return order
                }
            })
            setSelectedOrder(item)
        }

    }, [wsOrders, id, ingredientInfo])


    return (selectedOrder &&
        <div className={`${orderFeedStyle.full_page_num} mb-4 mr-2`}>
            <p className={`${orderFeedStyle.centered_text} text text_type_digits-default mb-10`}>{`#${selectedOrder.number}`}</p>
            <h2 className="text text_type_main-medium mb-3">{selectedOrder.name}</h2>
            <p className="text text_type_main-default mb-15">{selectedOrder.status}</p>

            <h3 className='text text_type_main-medium mb-6'>Состав:</h3>

            <div className={`${orderFeedStyle.full_page_wrapper} ${orderFeedStyle.customScroll}`}>

                {selectedOrder.ingredients && ingredientInfo &&
                    selectedOrder.ingredients.map((ingredientId: string, index: number) => {
                        return (
                            <div key={index} className={`${orderFeedStyle.wrapper} mb-4 mr-6`}>
                                <div className={orderFeedStyle.ingredients_wrapper}>
                                    <div className={orderFeedStyle.round_modern}>
                                        <img className={orderFeedStyle.round_img} src={ingredientInfo[ingredientId].image} alt="ingredient" />
                                    </div>
                                </div>

                                <p className={`${orderFeedStyle.ingr_name} text text_type_main-defaul ml-4`}>
                                    {ingredientInfo[ingredientId].name}
                                </p>

                                <div className={`${orderFeedStyle.wrapper}`}>
                                    <span className="text text_type_digits-default mr-2">{ingredientInfo[ingredientId].price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        )
                    })
                }


            </div>

            <div className={`${orderFeedStyle.info_wrapper} mt-10`}>
                <p className="text text_type_main-default text_color_inactive">{date}</p>
                <div className={`${orderFeedStyle.wrapper}`}>
                    <span className="text text_type_digits-default mr-2">{countPrice(selectedOrder, ingredientInfo)}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </div>
    )
}
