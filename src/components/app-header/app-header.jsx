import React from 'react';
import header from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader(props) {
    return (
        <header className={`${header.header} text text_type_main-default m-10 p-4`}>
            <div className={header.container}>
                <div className={header.wrapper}>
                    <div style={{ display: 'flex' }} >
                        <a href="{#}" className={`${header.ref} pt-4 pb-4 pl-5 pr-5`}>
                            <BurgerIcon type="primary" />
                            <p className="ml-2">Конструктор</p>
                        </a>
                        <a href="{#}" className={`${header.ref} ml-2 pt-4 pb-4 pl-5 pr-5`}>
                            <ListIcon type="secondary" />
                            <p style={{ color: '#8585AD' }} className="ml-2">Лента заказов</p>
                        </a>
                    </div>

                    <a href="{#}" className={`${header.ref}`}>
                        <Logo />
                    </a>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 176 , opacity: 0 }}></div>
                        <a href="{#}" className={`${header.ref} pt-4 pb-4 pl-5 pr-5`}>
                            <ProfileIcon type="secondary" />
                            <p style={{ color: '#8585AD' }} className="ml-2">Личный кабинет</p>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;