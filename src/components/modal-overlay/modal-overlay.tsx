import React from "react";
import modalOverlay  from "./modal-overlay.module.css"

type TModalOverlayProps = {
    closeModal: () => void
}

export default function ModalOverlay({closeModal}: TModalOverlayProps) {
    return (
        <div id = 'overlay' onClick={closeModal} className={modalOverlay.modal_overlay}></div>
    )
}
