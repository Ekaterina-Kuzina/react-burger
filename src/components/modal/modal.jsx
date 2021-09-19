import React, { useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes from 'prop-types';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import modalStyle from "./modal.module.css"

import ModalOverlay from "../modal-overlay/modal-overlay"
import IngredientDetails from './ingredient-details'
import OrderDetails from './order-details'

function Modal(props) {

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            props.switchOpenState()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return ReactDom.createPortal(
        <>
            <ModalOverlay closeModal={props.closeModal} />
            <div className={`${modalStyle.modal_wrapper} pt-10 pr-10 pl-10 pb-15`}>
                <div className={modalStyle.header_of_modal}>
                    {props.target !== 'BUTTON' ?
                        <h3 className="text text_type_main-large">Детали ингредиента</h3> :
                        <h3 style={{ fontSize: 0 }} className="text text_type_main-large">Детали ингредиента</h3>
                    }

                    <CloseIcon className={modalStyle.close} onClick={props.closeModal} type="primary" />
                </div>
                {props.target === 'BUTTON' ? <OrderDetails /> : <IngredientDetails selectedItem={props.selectedItem} />}
            </div>
        </>,
        document.getElementById('modal-root')
    )
}

Modal.propTypes = {
    closeModal: PropTypes.func,
    switchOpenState: PropTypes.func
}

export default Modal;
