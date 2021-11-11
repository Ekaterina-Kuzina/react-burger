import React from 'react';

import {Link} from "react-router-dom";
import styleError from "./not-found-404.module.css"
import errorImg from "../images/error.png"

export default function Page404 (){
    return (
        <div className={styleError.wrapper}>
            <div className={styleError.img_wrapper}>
                <img className={styleError.img} src={errorImg} alt="" />
            </div>
            <h1 className="text text_type_digits-medium mt-2">404</h1>
            <h2 className="text text_type_main-medium mt-2">Ууупс, залетел не туда! </h2>
            <Link className={`${styleError.link} text text_type_main-small mt-8`} to ='/'>Вернуться на главную </Link>
        </div>
    )
}
