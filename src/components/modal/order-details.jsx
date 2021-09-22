import React from 'react'

import modalStyle from "./modal.module.css";
import done from "../../images/done.png";

function OrderDetails(){
    return(
        <div className={`${modalStyle.order_wrapper} pl-15 pr-15`}>
            <p className="mt-4 text text_type_digits-large">034536</p>
            <p className='mt-8 text text_type_main-medium'>идентификатор заказа</p>
            <img className="mt-15" src={done} alt="ok" />
            <p className='mt-15 text text_type_main-medium'>Ваш заказ начали готовить</p>
            <p style={{color: '#8585AD'}} className='mt-2 text text_type_main-medium' >Дождитесь готовности на орбитальной станции</p>

        </div>
    )
}
export default OrderDetails;