import React, { useEffect } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory } from "react-router-dom"
import formStyle from './forms.module.css';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/actions/requests-from-forms'
import { Redirect } from 'react-router-dom'

export default function ResetPassword() {
    const history = useHistory()
    const [valuePass, setValuePass] = React.useState('')
    const [switchIcon, setSwitchIcon] = React.useState(true)
    const inputRefPass = React.useRef(null)

    const dispatch = useDispatch()
    const flagForgotPass = useSelector(state => state.flagForForgotPassword.flagForgotPass)
    const successResetPassword = useSelector(state => state.flagForForgotPassword.successResetPassword)

    const onIconClickPass = () => {
        setTimeout(() => inputRefPass.current.focus(), 0)
        setSwitchIcon(!switchIcon)
        if (inputRefPass.current.type === 'password') {
            inputRefPass.current.type = 'text';
        } else {
            inputRefPass.current.type = 'password'
        }
    }


    const [valueToken, setValueToken] = React.useState('')
    const inputRefToken = React.useRef(null)
    const onIconClickToken = () => {
        setTimeout(() => inputRefToken.current.focus(), 0)
    }

    const newPost = {
        password: valuePass,
        token: valueToken

    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPassword(newPost))

    }
    useEffect(() => {
        if(successResetPassword){
            history.push('/')
        }
    }, [history, successResetPassword])

        return (flagForgotPass?
            <div className={formStyle.wrapper}>
                <form className={`${formStyle.form}`} action="">
                    <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
                    <div className='mb-6'>
                        <Input
                            type={'password'}
                            placeholder={'Введите новый пароль'}
                            onChange={e => setValuePass(e.target.value)}
                            value={valuePass}
                            icon={switchIcon ? 'ShowIcon' : 'HideIcon'}
                            name={'name'}
                            error={false}
                            ref={inputRefPass}
                            onIconClick={onIconClickPass}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>
                    <div className='mb-6'>

                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={e => setValueToken(e.target.value)}
                            value={valueToken}
                            name={'name'}
                            error={false}
                            ref={inputRefToken}
                            onIconClick={onIconClickToken}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <div className='mb-20'>
                        <Button type="primary" size="large" onClick={onSubmit}>
                            Сохранить
                        </Button>
                    </div>

                    <div className={`${formStyle.link_wrapper} mb-4 text text_type_main-default`}>
                        <p className={formStyle.text}>Вспомнили пароль?</p>
                        <Link className={`${formStyle.link} ml-2`} to='/login'>Войти</Link>

                    </div>
                </form>
            </div>
            :
            <Redirect
            to={{
                pathname: '/forgot-password'
            }}
        />
        )
}
