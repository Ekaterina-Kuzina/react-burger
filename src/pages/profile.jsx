import React from 'react';
import { PasswordInput, Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink} from "react-router-dom"
import formStyle from './forms.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_USER_INFO, USER_INFO } from '../services/actions'

export default function Profile() {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.saveUserInfo.userInfo);

    const [valueName, setValueName] = React.useState(userInfo.name)
    const inputRefName = React.useRef(null)
    const onIconClickName = () => {
        inputRefName.current.style.color = '#F2F2F3';
        inputRefName.current.focus()
    }

    const [value, setValue] = React.useState(userInfo.email)
    const onChange = e => {
        setValue(e.target.value)
    }

    const [valuePassword, setValuePassword] = React.useState('')
    const onChangePass = e => {
        setValuePassword(e.target.value)
    }

    async function logout() {
        return fetch(`https://norma.nomoreparties.space/api/auth/logout`, {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            }),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    const logoutRequest = async () => {
        if (localStorage.getItem('refreshToken')) {
            let res = await (await logout()).json()
            if (res.success) {
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('accessToken')
                dispatch({ type: CLEAR_USER_INFO })
            }
        }

    }

    const changedBody = {
        name: valueName,
        email: value
    }

    async function changeUserInfo() {
        return fetch(`https://norma.nomoreparties.space/api/auth/user`, {
            method: 'PATCH',
            body: JSON.stringify(changedBody),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('accessToken')
            },
        })
    }

    const changeUserInfoRequest = async () => {
        let res = await (await changeUserInfo()).json()
        if (res.success) {
            dispatch({ type: USER_INFO, userInfo: res.user })
            console.log(res);
        } else {
            console.log('err');
        }
    }

    return (
        <div className={formStyle.container}>
            <div className={`${formStyle.wrapper_profile} mt-30`}>
                <div className={`${formStyle.profile_link_wrapper} mr-15`}>
                    <NavLink to='/profile' activeClassName={formStyle.selected_link} className='text text_type_main-medium mt-6 mb-6'>Профиль</NavLink>
                    <NavLink to='/profile' className={`${formStyle.inactive_link} text text_type_main-medium mt-6 mb-6`}>История заказов</NavLink>
                    <NavLink to='/profile' onClick={(e) => {
                        e.preventDefault()
                        logoutRequest()
                    }} className={`${formStyle.inactive_link} text text_type_main-medium mt-6 mb-6`}>Выход</NavLink>

                    <p className={`${formStyle.subtext} text text_type_main-default mt-20`}>В этом разделе вы можете <br />
                        изменить свои персональные данные</p>
                </div>
                <form className={`${formStyle.form_profile}`} action="">
                    <div className='mb-6'>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => setValueName(e.target.value)}
                            value={valueName}
                            icon={'EditIcon'}
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
                    <Button type="secondary" size="medium" onClick={(e) => {
                        e.preventDefault()
                        setValueName(userInfo.name)
                        setValue(userInfo.email)
                    }
                    }>
                        Отмена
                    </Button>
                    <Button type="primary" size="medium" onClick={(e) => {
                        e.preventDefault()
                        changeUserInfoRequest()
                    }}>
                        Сохранить
                    </Button>

                </form>
            </div>
        </div>
    )
}
