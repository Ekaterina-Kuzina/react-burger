import React, {useEffect, useState} from 'react';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderFeedStyle from '../components/order-feed/order-feed.module.css'
import bun from "../images/bun.png";
import { useSelector } from '../services/hooks';
import { TWsOrder, TItemData } from '../services/types/data'
import { useParams } from 'react-router';
import { AnySet } from '@reduxjs/toolkit/node_modules/immer/dist/internal';

type TParamTypes = {
    id: string;
}

export default function OrderFullPage() {
    const ingredients = useSelector(state => state.ingredientsData.ingredients)
    const wsOrders = useSelector(state => {
        if(state.wsReducer.messages[0]) {
            return state.wsReducer.messages[0].orders
        }
    });

    const [selectedOrder, setSelectedOrder] = useState<TWsOrder| null>(null)
    const [ingredientsForFullPage, setIngredientsForFullPage] = useState<any>(null)
    let { id } = useParams<any>();
    console.log(id);

    useEffect(() => {
        if(wsOrders){
            let item = wsOrders.find((order:TWsOrder)=>{
                if(order.number == id){
                    return order
                }
            })
            setSelectedOrder(item)

            let obj: any = {}
            ingredients.forEach((item)=>{
              obj[item._id] = item
            })

            if(item){
               let orderIngredients = item.ingredients.map((idOfIngredient: string)=>{
                    return obj[idOfIngredient]
                })
                setIngredientsForFullPage(orderIngredients)
            }
        }

    }, [])

    return ( selectedOrder &&
        <div className = {`${orderFeedStyle.full_page_num} mb-4 mr-2`}>
            <p className ={`${orderFeedStyle.centered_text} text text_type_digits-default mb-10`}>{`#${selectedOrder.number}`}</p>
            <h2 className="text text_type_main-medium mb-3">{selectedOrder.name}</h2>
            <p className = "text text_type_main-default mb-15">{selectedOrder.status}</p> 

            <h3 className='text text_type_main-medium mb-6'>Состав:</h3>

            <div className ={`${orderFeedStyle.full_page_wrapper} ${orderFeedStyle.customScroll}`}>
                
            {ingredientsForFullPage &&
            ingredientsForFullPage.map((ingredientForFullPage: any) => {
                return(
                <div className = {`${orderFeedStyle.wrapper} mb-4 mr-6`}>
                    <div className= {orderFeedStyle.ingredients_wrapper}>
                        <div className={orderFeedStyle.round_modern}>
                            <img className={orderFeedStyle.round_img} src={ingredientForFullPage.image} alt="ingredient" />
                        </div>
                    </div>

                    <p className= {`${orderFeedStyle.ingr_name} text text_type_main-defaul ml-4`}>
                        {ingredientForFullPage.name}
                    </p>

                    <div className = {`${orderFeedStyle.wrapper}`}>
                        <span className="text text_type_digits-default mr-2">2</span>
                        <span className="text text_type_digits-default mr-2">x</span>
                        <span className="text text_type_digits-default mr-2">{ingredientForFullPage.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                )
            })}

                
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