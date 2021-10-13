import React from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom"
import formStyle from './forms.module.css'

export default function Registration() {
    const [valueName, setValueName] = React.useState('')
    const inputRefName = React.useRef(null)
    const onIconClickName = () => {
        setTimeout(() => inputRefName.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const [valueEmail, setValueEmail] = React.useState('')
    const inputRefEmail = React.useRef(null)
    const onIconClickEmail = () => {
        setTimeout(() => inputRefEmail.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const [valuePassword, setValuePassword] = React.useState('')
    const onChange = e => {
        setValuePassword(e.target.value)
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
                    <Button type="primary" size="large">
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
