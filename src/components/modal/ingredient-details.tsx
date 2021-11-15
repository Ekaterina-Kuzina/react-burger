import React from 'react'

import modalStyle from "./modal.module.css"
import { useSelector } from 'react-redux';
import {
    useParams
} from "react-router-dom";
import {TItemData} from '../../services/types/data'

type TParamTypes = {
    id: string;
}
export default function IngredientDetails() {
    let { id } = useParams<TParamTypes>();
    const ingredients = useSelector((state: any) => state.ingredientsData.ingredients)
    const flagSuccess = useSelector((state: any) => state.ingredientsData.flagSuccess)
    let setIng = ingredients.find((item:TItemData)=> item._id === id)

        return (flagSuccess &&
            <div className={`${modalStyle.wrapper} pl-15 pr-15`}>
                <div className={modalStyle.ingredient_img}>
                    <img src={setIng.image_large} alt="ingredient" />
                </div>
                <h4 className='text text_type_main-medium mt-4'>{setIng.name}</h4>
                <div className={`${modalStyle.info_wrapper} text text_type_main-default mt-8`}>
                    <div className={modalStyle.info_item}>
                        <p className="mb-2">Калории,ккал</p>
                        <span className="text text_type_digits-default">{setIng.calories}</span>
                    </div>
                    <div className={modalStyle.info_item}>
                        <p className="mb-2">Белки, г</p>
                        <span className="text text_type_digits-default ">{setIng.proteins}</span>
                    </div>
                    <div className={modalStyle.info_item}>
                        <p className="mb-2">Жиры, г</p>
                        <span className="text text_type_digits-default">{setIng.fat}</span>
                    </div>
                    <div className={modalStyle.info_item}>
                        <p className="mb-2">Углеводы, г</p>
                        <span className="  text text_type_digits-default ">{setIng.carbohydrates}</span>
                    </div>
                </div>
            </div>
        )
    }

