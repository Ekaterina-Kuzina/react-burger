import React, {useEffect, useState} from 'react';
import OrderList from '../components/order-feed/order-list'
import OrderSummary from '../components/order-feed/order-summary'
import orderFeedStyle from '../components/order-feed/order-feed.module.css'
import { useSelector, useDispatch } from '../services/hooks';
import{wsInitConnection} from '../services/actions/wsActions'
import { wsGetMessage, wsSendMessage } from '../services/actions/wsActions';

export default function OrderFeed (){
    const userInfo = useSelector(state => state.getUserInfo.userInfo);
    const ingredients = useSelector(state => state.ingredientsData.ingredients)
    const dispatch = useDispatch()
    const [imgByIngredientId, setImgByIngredientId] = useState({})
    const [ingredientInfo, setIngredientInfo] = useState({})
    
    useEffect(
        () => {
          if (userInfo) {
            dispatch( wsInitConnection())
          }

          let objId: any = {}
          let obj: any = {}
          ingredients.forEach((item)=>{
            objId[item._id] = item.image_mobile
            obj[item._id] = item
          })
          setIngredientInfo(obj)
          setImgByIngredientId(objId)
        },
        [userInfo] 
      );
      console.log(ingredientInfo);
    return(
        <div className ={orderFeedStyle.feed_container}>
            <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
            <div className = {orderFeedStyle.page_wrapper}>
              {imgByIngredientId &&
                <OrderList  imgByIngredientId={imgByIngredientId} ingredientInfo={ingredientInfo}/>
              }

                <OrderSummary/>
            </div>
        </div>
    )
}

