import React from 'react';
import { useEffect, useState, useCallback } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from '../modal/modal';

import app from "./app.module.css";

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [stateData, setStateData] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isClosed, setIsClosed] = useState(false)

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(data => setStateData(data))
            .catch(err => console.log(err))

    }, [])

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsClosed(true)
        setIsOpen(false)
    }
    const handleKeyDown=(e)=> {
        if (e.keyCode === 27) {
            setIsClosed(true)
            setIsOpen(false)
            console.log('You pressed the escape key!')
        }
    }

    useEffect(() => {
            document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown); //Why don't remove listener?
        };
    },[]);

    return (
        <div className="pt-10 pb-10">
            <AppHeader />

            <div style={{ display: 'flex', justifyContent: "space-between" }} className={app.container}>

                {stateData &&
                    <>
                        <BurgerIngredients data={stateData.data} openModal={handleOpenModal} />
                        <BurgerConstructor data={stateData.data} openModal={handleOpenModal}/>
                    </>
                }

            </div>

            {
                isOpen &&
                <Modal closeModal={handleCloseModal} />
            }

        </div>
    )
}

export default App;
