import React from 'react';
import { PasswordInput, Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink } from "react-router-dom"
import formStyle from './forms.module.css'

export default function Profile() {
    const [valueName, setValueName] = React.useState('')
    const inputRefName = React.useRef(null)
    const onIconClickName = () => {
        // setTimeout(() => inputRefName.current.focus(), 0)
        inputRefName.current.focus()
    }

    const [value, setValue] = React.useState('bob@example.com')
    const onChange = e => {
      setValue(e.target.value)
    }

    // const [valueEmail, setValueEmail] = React.useState('')
    // const inputRefEmail = React.useRef(null)
    // const onIconClickEmail = () => {
    //     setTimeout(() => inputRefEmail.current.focus(), 0)
    //     alert('Icon Click Callback')
    // }

    const [valuePassword, setValuePassword] = React.useState('')
    const onChangePass = e => {
        setValuePassword(e.target.value)
    }
    return (
        <div className = {formStyle.container}>
        <div className ={`${formStyle.wrapper_profile} mt-30` }>
            <div className={`${formStyle.profile_link_wrapper} mr-15`}>
                <NavLink to='/profile' activeClassName={formStyle.selected_link} className = 'text text_type_main-medium mt-6 mb-6'>Профиль</NavLink>
                <NavLink to='/profile' className = {`${formStyle.inactive_link} text text_type_main-medium mt-6 mb-6`}>История заказов</NavLink>
                <NavLink to='/profile' className = {`${formStyle.inactive_link} text text_type_main-medium mt-6 mb-6`}>Выход</NavLink>

                <p className={`${formStyle.subtext} text text_type_main-default mt-20`}>В этом разделе вы можете <br />
                    изменить свои персональные данные</p>
            </div>
            <form  className={`${formStyle.form_profile}`} action="">
                <div  className='mb-6'>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setValueName(e.target.value)}
                        value={valueName}
                        icon ={'EditIcon'}
                        name={'name'}
                        error={false}
                        ref={inputRefName}
                        onIconClick={onIconClickName}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className='mb-6'>
                    <EmailInput onChange={onChange} value={value} name={'email'} />
                </div>

                <div className='mb-6'>
                    <PasswordInput className='mb-6' onChange={onChangePass} value={valuePassword} name={'password'} />
                </div>

            </form>
        </div>
        </div>
    )
}
