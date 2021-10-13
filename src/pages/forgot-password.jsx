import React from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom"
import formStyle from './forms.module.css'

const url = 'https://norma.nomoreparties.space/api/password-reset'

export default function ForgotPassword() {

    const [valueEmail, setValueEmail] = React.useState('')
    const inputRefEmail = React.useRef(null)
    const onIconClickEmail = () => {
        setTimeout(() => inputRefEmail.current.focus(), 0)
        alert('Icon Click Callback')
    }
    const newPost = {
        email: valueEmail
    }

    const onSubmit = (e) => {
        e.preventDefault()
        fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost), 
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
        <div className ={formStyle.wrapper }>
            <form  className={`${formStyle.form}`} action="">
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
                    <Button type="primary" size="large" onClick = {onSubmit}>
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