import React, { useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes from 'prop-types';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import modalStyle from "./modal.module.css"

import ModalOverlay from "../modal-overlay/modal-overlay"
function Modal(props) {

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            props.closeModal()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    return ReactDom.createPortal(
        <>
            <ModalOverlay closeModal={props.closeModal} />
            <div className={`${modalStyle.modal_wrapper} pt-10 pr-10 pl-10 pb-15`}>
                <div className={modalStyle.header_of_modal}>
                    {
                        props.title !== undefined ?
                        <h3 className="text text_type_main-large">{props.title}</h3>
                        :
                        <div></div>
                    }
                    <div className={modalStyle.close} >
                        <CloseIcon  onClick={props.closeModal} type="primary" />
                    </div>
                </div>
                {props.children}
            </div>
        </>,
        document.getElementById('modal-root')
    )
}

Modal.propTypes = {
    closeModal: PropTypes.func
}

export default Modal;
