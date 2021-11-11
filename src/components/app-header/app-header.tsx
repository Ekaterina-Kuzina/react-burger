import React from 'react';
import header from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom'

export default function AppHeader() {
    return (
        <header className={`${header.header} text text_type_main-default mr-10 ml-10 mb-10 p-4`}>
            <div className={header.container}>
                <div className={header.wrapper}>
                    <div style={{ display: 'flex' }} >
                        <NavLink to="/" className={`${header.ref} pt-4 pb-4 pl-5 pr-5`}>
                            <BurgerIcon type="primary" />
                            <p className="ml-2">Конструктор</p>
                        </NavLink>
                        <NavLink to="/" className={`${header.ref} ml-2 pt-4 pb-4 pl-5 pr-5`}>
                            <ListIcon type="secondary" />
                            <p style={{ color: '#8585AD' }} className="ml-2">Лента заказов</p>
                        </NavLink>
                    </div>

                    <NavLink to="/" className={`${header.ref}`}>
                        <Logo />
                    </NavLink>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 176, opacity: 0 }}></div>
                        <NavLink to='/profile' className={`${header.ref} pt-4 pb-4 pl-5 pr-5`}>
                            <ProfileIcon type="secondary" />
                            <p style={{ color: '#8585AD' }} className="ml-2">Личный кабинет</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}