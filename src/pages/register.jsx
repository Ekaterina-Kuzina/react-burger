import React from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom"
import formStyle from './forms.module.css'
import {useDispatch} from 'react-redux';
import { sendReqRegisterUser } from '../services/actions/requests-from-forms'

export default function Registration() {
    const dispatch = useDispatch();
    const [valueName, setValueName] = React.useState('')
    const inputRefName = React.useRef(null)
    const onIconClickName = () => {
        setTimeout(() => inputRefName.current.focus(), 0)
    }

    const [valueEmail, setValueEmail] = React.useState('')
    const inputRefEmail = React.useRef(null)
    const onIconClickEmail = () => {
        setTimeout(() => inputRefEmail.current.focus(), 0)
    }

    const [valuePassword, setValuePassword] = React.useState('')
    const onChange = e => {
        setValuePassword(e.target.value)
    }

    const body = {
        email: valueEmail, 
        password: valuePassword, 
        name: valueName 
    } 
    console.log(body);
    const sendRequest = (body) => {
        dispatch(sendReqRegisterUser(body))
    }


    return (
        <div className ={formStyle.wrapper }>
            <form  className={`${formStyle.form}`} action="">
                <p className="text text_type_main-medium mb-6">Регистрация</p>

                <div  className='mb-6'>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setValueName(e.target.value)}
                        value={valueName}
                        name={'name'}
                        error={false}
                        ref={inputRefName}
                        onIconClick={onIconClickName}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className='mb-6'>

                    <Input
                        type={'email'}
                        placeholder={'Email'}
                        onChange={e => setValueEmail(e.target.value)}
                        value={valueEmail}
                        name={'name'}
                        error={false}
                        ref={inputRefEmail}
                        onIconClick={onIconClickEmail}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className='mb-6'>
                    <PasswordInput className='mb-6' onChange={onChange} value={valuePassword} name={'password'} />
                </div>

                <div className='mb-20'>
                    <Button type="primary" size="large" onClick={(e)=>{
                        e.preventDefault()
                        sendRequest(body)}}>
                        Зарегистрироваться
                    </Button>
                </div>

                <div className={`${formStyle.link_wrapper} mb-4 text text_type_main-default`}>
                    <p className={formStyle.text}>Уже зарегистрированы?</p>
                    <Link className={`${formStyle.link} ml-2`} to='/login'>Войти</Link>

                </div>
            </form>
        </div>
    )
}
