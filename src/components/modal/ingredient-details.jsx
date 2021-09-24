import React, {useContext} from 'react'
import { SelectedItemDataContext } from '../app/data-context';

import modalStyle from "./modal.module.css"

function IngredientDetails() {
    const [selectedItem] = useContext(SelectedItemDataContext)

    return (
        <div className='pl-15 pr-15'>
            <div className={modalStyle.ingredient_img}>
                <img src={selectedItem.image_large} alt="ingredient" />
            </div>
            <h4 className='text text_type_main-medium mt-4'>{selectedItem.name}</h4>
            <div className={`${modalStyle.info_wrapper} text text_type_main-default mt-8`}>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Калории,ккал</p>
                    <span className="text text_type_digits-default">{selectedItem.calories}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Белки, г</p>
                    <span className="text text_type_digits-default ">{selectedItem.proteins}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Жиры, г</p>
                    <span className="text text_type_digits-default">{selectedItem.fat}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Углеводы, г</p>
                    <span className="  text text_type_digits-default ">{selectedItem.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails;
