import React, { useEffect, useState} from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from '../modal/modal';

import appStyle from "./app.module.css";

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [stateData, setStateData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [target, setTarget] = useState('');

    const switchOpenState = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        fetch(url)
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(res.status);
            })
            .then(data => setStateData(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={`${appStyle.app} pt-10 pb-10`}>
            <AppHeader />

            <div style={{ display: 'flex', justifyContent: "space-between" }} className={appStyle.container}>

                {stateData &&
                    <>
                        <BurgerIngredients data={stateData.data} switchOpenState={(e) => {
                            setTarget()
                            switchOpenState(e.target.tagName)
                        }} setSelectedItem={setSelectedItem} />
                        <BurgerConstructor data={stateData.data} switchOpenState={(e) => {
                            switchOpenState()
                            setTarget(e.target.tagName)
                        }} />
                    </>
                }

            </div>

            {isOpen &&
                <Modal target={target} switchOpenState={switchOpenState} closeModal={() => {
                    switchOpenState()
                    setSelectedItem()
                }} selectedItem={selectedItem} />
            }

        </div>
    )
}

export default App;
