import React from "react";
import {
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import IngredientDetailsForFullPage from '../components/modal/ingredients-details-for-full-page'
import {IngredientModal} from './index'

export default function ModalSwitch() {
    let location = useLocation();

    let background = location.state && location.state.background;
    location.state = null;
    return (
        <div>
            <Switch location={background || location}>
                <Route path='/ingredients/:id'>
                    <IngredientDetailsForFullPage />
                </Route>
            </Switch>

            {background && <Route path='/ingredients/:id'><IngredientModal /> </Route>}
        </div>
    );
}