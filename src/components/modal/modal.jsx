import React from "react";
import ReactDom from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import IngredientDetails from './ingredient-details'
import OrderDetails from './order-details'

import modalStyle from "./modal.module.css"

function Modal(props) {
    return ReactDom.createPortal(
        <>
            <ModalOverlay closeModal={props.closeModal} />
            <div className={`${modalStyle.modal_wrapper} pt-10 pr-10 pl-10 pb-15`}>
                <div className={modalStyle.header_of_modal}>
                    {props.targetName !== 'BUTTON'? 
                    <h3 className="text text_type_main-large">Детали ингредиента</h3>:
                    <h3 style={{fontSize: 0}} className="text text_type_main-large">Детали ингредиента</h3>
                    } 

                    <CloseIcon className={modalStyle.close} onClick={props.closeModal} type="primary" />
                </div>
                {props.targetName === 'BUTTON' ? <OrderDetails /> : <IngredientDetails data={props.data} />}
            </div>
        </>,
        document.getElementById('modal-root')
    )

}


export default Modal;