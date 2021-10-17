import React, {useState, useEffect} from 'react'

import modalStyle from "./modal.module.css"
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'

export default function IngredientDetailsForFullPage() {
    let { id } = useParams();
    const ingredients = useSelector((state) => state.ingredientsData.ingredients)
    const [ingForFullPageInfo, setIngForFullPageInfo] = useState(null)
    
    useEffect(() => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
        .then(res=> res.json())
        .then(res => {
            if (res && res.success) {
                setIngForFullPageInfo(res.data)
            } else {
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }, [])

    let viewIngredient = null;
    if(ingForFullPageInfo){
        viewIngredient = ingForFullPageInfo.find(element => element._id === id)
    }
    console.log(viewIngredient); 


    const selected = useSelector((state) => state.selectedIngredient.selected)

    return (
        <div className='pl-15 pr-15'>
            <div className={modalStyle.ingredient_img}>
                <img src={viewIngredient ? viewIngredient.image_large : ''} alt="ingredient" />
            </div>
            <h4 className='text text_type_main-medium mt-4'>{viewIngredient ? viewIngredient.name : ''}</h4>
            <div className={`${modalStyle.info_wrapper} text text_type_main-default mt-8`}>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Калории,ккал</p>
                    <span className="text text_type_digits-default">{ viewIngredient ? viewIngredient.calories : ''}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Белки, г</p>
                    <span className="text text_type_digits-default ">{ viewIngredient ? viewIngredient.proteins : ''}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Жиры, г</p>
                    <span className="text text_type_digits-default">{ viewIngredient ? viewIngredient.fat : ''}</span>
                </div>
                <div className={modalStyle.info_item}>
                    <p className="mb-2">Углеводы, г</p>
                    <span className="  text text_type_digits-default ">{viewIngredient ? viewIngredient.carbohydrates : ''}</span>
                </div>
            </div>
        </div>
    )
}