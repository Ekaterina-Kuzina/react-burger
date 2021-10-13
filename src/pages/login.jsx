import React from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom"
import formStyle from './login.module.css'

export default function SignIn() {
    const [value, setValue] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const [valuePassword, setValuePassword] = React.useState('')
    const onChange = e => {
        setValuePassword(e.target.value)
    }

    return (
        <div className={formStyle.wrapper}>
            <form className={`${formStyle.form}`} action="">
                <p className="text text_type_main-medium mb-6">Вход</p>
                <div className='mb-6'>
                    <Input
                        type={'text'}
                        placeholder={'Email'}
                        onChange={e => setValue(e.target.value)}
                        value = {value}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className='mb-6'>
                    <PasswordInput className='mb-6' onChange={onChange} value={valuePassword} name={'password'} />
                </div>

                <div className='mb-20'>
                    <Button type="primary" size="large">
                        Войти
                    </Button>
                </div>

                <div className={`${formStyle.link_wrapper} mb-4 text text_type_main-default`}>
                    <p className ={formStyle.text}>Вы — новый пользователь?</p>
                    <Link className = {`${formStyle.link} ml-2`} to='/register'>Зарегистрироваться</Link>

                </div>

                <div className={`${formStyle.link_wrapper} text text_type_main-default`}>
                    <p className ={formStyle.text}>Забыли пароль?</p>
                    <Link className = {`${formStyle.link} ml-2`} to='/forgot-password' >Восстановить пароль</Link>
                </div>
            </form>
        </div>
    )
}
