import React from 'react';
import { PasswordInput, Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from "react-router-dom"
import formStyle from './forms.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfo } from '../services/actions/user-info'
import { sendReqLogOutUser } from '../services/actions/requests-from-forms'

type TChangedBody = {
    name: string,
    email: string
}
export default function Profile() {
    const dispatch = useDispatch()
    const userInfo = useSelector((state: any) => state.getUserInfo.userInfo);

    const [valueName, setValueName] = React.useState(userInfo.name)
    const inputRefName = React.useRef<HTMLInputElement>(null)
    const onIconClickName = () => {
        if(inputRefName.current){
            inputRefName.current.style.color = '#F2F2F3';
            inputRefName.current.focus()
        }
    }

    const [value, setValue] = React.useState(userInfo.email)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const [valuePassword, setValuePassword] = React.useState('')
    const onChangePass = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setValuePassword(e.target.value)
    }

    const changedBody = {
        name: valueName,
        email: value
    }
    const changeUserInfoRequest = (changedBody: TChangedBody) => {
        dispatch(changeUserInfo(changedBody))
    }
    const logoutRequest = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(sendReqLogOutUser())
    }
    const saveUser = (e: React.SyntheticEvent) => {
        e.preventDefault()
        changeUserInfoRequest(changedBody)
    }

    return (
        <div className={formStyle.container}>
            <div className={`${formStyle.wrapper_profile} mt-30`}>
                <div className={`${formStyle.profile_link_wrapper} mr-15`}>
                    <NavLink to='/profile' activeClassName={formStyle.selected_link} className='text text_type_main-medium mt-6 mb-6'>Профиль</NavLink>
                    <NavLink to='/profile' className={`${formStyle.inactive_link} text text_type_main-medium mt-6 mb-6`}>История заказов</NavLink>
                    <NavLink to='/profile' onClick={(e) => {
                        logoutRequest(e)
                    }} className={`${formStyle.inactive_link} text text_type_main-medium mt-6 mb-6`}>Выход</NavLink>

                    <p className={`${formStyle.subtext} text text_type_main-default mt-20`}>В этом разделе вы можете <br />
                        изменить свои персональные данные</p>
                </div>
                <form onSubmit={saveUser} className={`${formStyle.form_profile}`} action="">
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
                        <PasswordInput onChange={onChangePass} value={valuePassword} name={'password'} />
                    </div>
                    <Button type="secondary" size="medium" onClick={(e) => {
                        e.preventDefault()
                        setValueName(userInfo.name)
                        setValue(userInfo.email)
                    }
                    }>
                        Отмена
                    </Button>
                    <Button type="primary" size="medium" >
                        Сохранить
                    </Button>

                </form>
            </div>
        </div>
    )
}