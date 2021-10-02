import React from "react";
import PropTypes from 'prop-types';

import { modal_overlay } from "./modal-overlay.module.css"

export default function ModalOverlay(props) {
    return (
        <div onClick={props.closeModal} className={modal_overlay}></div>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func
}
