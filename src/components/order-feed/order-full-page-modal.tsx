import React from 'react';
import Modal from '../modal/modal';
import OrderFullPage from '../../pages/order-full-page'
import {
    useHistory
} from "react-router-dom";

export default function OrderFullPageModal() {
    let history = useHistory();
    return (
        <Modal title='Детали ингредиента' closeModal={
            () => {
                history.goBack();
            }
        }>
            <OrderFullPage/>
        </Modal>
    )

}