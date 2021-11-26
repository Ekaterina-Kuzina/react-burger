import React, { useEffect } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom"
import formStyle from './forms.module.css'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from '../services/hooks';
import { forgotPassword } from '../services/actions/requests-from-forms'

export type TNewPost = {
    email: string;
}

export default function ForgotPassword() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [valueEmail, setValueEmail] = React.useState('')
    const inputRefEmail = React.useRef<HTMLInputElement>(null)
    const flagForgotPass = useSelector(state => state.flagForForgotPassword.flagForgotPass)

    const onIconClickEmail = () => {
        setTimeout(() => {
            if(inputRefEmail.current){
                inputRefEmail.current.focus()
            }
        }, 0)
    }
    const newPost : TNewPost = {
        email: valueEmail
    }

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (newPost.email) {
            dispatch(forgotPassword(newPost))
        }
    }

    useEffect(() => {
        if (flagForgotPass) {
            history.push('/reset-password')
        }
    }, [flagForgotPass, history])

    return (
        <div className={formStyle.wrapper}>
            <form onSubmit={onSubmit} className={`${formStyle.form}`} action="">
                <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

                <div className='mb-6'>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
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

                <div className='mb-20'>
                    <Button type="primary" size="large" >
                        Восстановить
                    </Button>
                </div>

                <div className={`${formStyle.link_wrapper} mb-4 text text_type_main-default`}>
                    <p className={formStyle.text}>Вспомнили пароль?</p>
                    <Link className={`${formStyle.link} ml-2`} to='/login'>Войти</Link>

                </div>
            </form>
        </div>
    )
}
