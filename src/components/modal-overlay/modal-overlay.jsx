import React from "react";

import {modal_overlay} from "./modal-overlay.module.css"

function ModalOverlay(props){
    return(
        <div onClick={props.closeModal} className={modal_overlay}></div>
    )
}


export default ModalOverlay;