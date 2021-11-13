import React from 'react';
import header from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useRouteMatch } from 'react-router-dom'

export default function AppHeader() {
    const isConstructor = !!useRouteMatch({ path: '/', exact: true });
    const isFeed = !!useRouteMatch('/feed');
    const isProfile = !!useRouteMatch('/profile');

    return (
        <header className={`${header.header} text text_type_main-default mr-10 ml-10 mb-10 p-4`}>
            <div className={header.container}>
                <div className={header.wrapper}>
                    <div style={{ display: 'flex' }} >
                        <NavLink exact to="/" activeClassName={header.selected} className={`${header.ref} pt-4 pb-4 pl-5 pr-5`}>
                            {isConstructor ? <BurgerIcon type="primary" /> : <BurgerIcon type="secondary" />}
                            <p className="ml-2">Конструктор</p>
                        </NavLink>
                        <NavLink exact to="/feed" activeClassName={header.selected} className={`${header.ref} ml-2 pt-4 pb-4 pl-5 pr-5`}>
                            {isFeed ? <ListIcon type="primary" /> : <ListIcon type="secondary" />}
                            <p className="ml-2">Лента заказов</p>
                        </NavLink>
                    </div>

                    <NavLink to="/" className={`${header.ref}`}>
                        <Logo />
                    </NavLink>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 176, opacity: 0 }}></div>
                        <NavLink exact to='/profile' activeClassName={header.selected} className={`${header.ref} pt-4 pb-4 pl-5 pr-5`}>
                            {isProfile ? <ProfileIcon type="primary" /> : <ProfileIcon type="secondary" />}
                            <p className="ml-2">Личный кабинет</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}
