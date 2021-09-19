import React from 'react'
import PropTypes from 'prop-types';

import modalStyle from "./modal.module.css"

function IngredientDetails(props) {

    return (
        <div className='pl-15 pr-15'>
            <div className={modalStyle.ingredient_img}>
                <img src={props.selectedItem.image_large} alt="ingredient" />
            </div>
            <h4 className='text text_type_main-medium mt-4'>{props.selectedItem.name}</h4>
            <div className={`${modalStyle.info_wrapper} text text_type_main-default mt-8`}>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Калории,ккал</p>
                    <span className="text text_type_digits-default">{props.selectedItem.calories}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Белки, г</p>
                    <span className="text text_type_digits-default ">{props.selectedItem.proteins}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Жиры, г</p>
                    <span className="text text_type_digits-default">{props.selectedItem.fat}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Углеводы, г</p>
                    <span className="  text text_type_digits-default ">{props.selectedItem.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
        selectedItem: PropTypes.shape({
            __v: PropTypes.number.isRequired,
            _id: PropTypes.string.isRequired,
            calories: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
        })
}
export default IngredientDetails;
