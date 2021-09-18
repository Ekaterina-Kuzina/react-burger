import React from 'react'

import modalStyle from "./modal.module.css"
import img from '../../images/meat-01.png'

function IngredientDetails(props) {
    return (
        <div className= 'pl-15 pr-15'>
            <div className={modalStyle.ingredient_img}>
                <img src={img} alt="ingredient" />
            </div>
            <h4 className='text text_type_main-medium mt-4'>Биокотлета из марсианской Магнолии</h4>
            <div className={`${modalStyle.info_wrapper} text text_type_main-default mt-8`}>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Калории,ккал</p>
                    <span className="text text_type_digits-default">22</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Белки, г</p>
                    <span className="text text_type_digits-default ">22</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Жиры, г</p>
                    <span className="text text_type_digits-default">11</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Углеводы, г</p>
                    <span className="  text text_type_digits-default ">22</span>
                </div>
            </div>
        </div>
    )
}
export default IngredientDetails;