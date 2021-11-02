import React from 'react';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/modal/ingredient-details';
import { useHistory } from 'react-router-dom'

export default function IngredientModal() {
    let history = useHistory();
    return (
        <Modal title='Детали ингредиента' closeModal={
            () => {
                history.goBack();
            }
        }>
            <IngredientDetails />
        </Modal>
    )

}
