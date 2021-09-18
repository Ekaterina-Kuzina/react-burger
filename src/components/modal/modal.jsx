import React from "react";
import ReactDom from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import modalStyle from "./modal.module.css"

function Modal(props) {
    return ReactDom.createPortal(
        <>
            <ModalOverlay closeModal={props.closeModal} />
            <div className={`${modalStyle.modal_wrapper} pt-10 pr-10 pl-10 pb-15`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 className="text text_type_main-large">Детали ингредиента</h3>
                    <CloseIcon onClick={props.closeModal} style={{cursor:"pointer"}} type="primary" />
                </div>
            </div>
        </>,
        document.getElementById('modal-root')
    )

}


export default Modal;