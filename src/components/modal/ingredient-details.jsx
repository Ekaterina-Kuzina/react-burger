import React from 'react'

import modalStyle from "./modal.module.css"
import { useSelector, useDispatch } from 'react-redux';

function IngredientDetails() {
    const selected = useSelector((state)=> state.selectedIngredient.selected)

    return (
        <div className='pl-15 pr-15'>
            <div className={modalStyle.ingredient_img}>
                <img src={selected.image_large} alt="ingredient" />
            </div>
            <h4 className='text text_type_main-medium mt-4'>{selected.name}</h4>
            <div className={`${modalStyle.info_wrapper} text text_type_main-default mt-8`}>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Калории,ккал</p>
                    <span className="text text_type_digits-default">{selected.calories}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Белки, г</p>
                    <span className="text text_type_digits-default ">{selected.proteins}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Жиры, г</p>
                    <span className="text text_type_digits-default">{selected.fat}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Углеводы, г</p>
                    <span className="  text text_type_digits-default ">{selected.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails;
