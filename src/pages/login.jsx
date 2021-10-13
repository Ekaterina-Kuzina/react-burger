import React from 'react';
import { EmailInput,PasswordInput,Input } from '@ya.praktikum/react-developer-burger-ui-components'

export default function SignIn () {
    // const [value, setValue] = React.useState('bob@example.com')
    // const onChange = e => {
    //   setValue(e.target.value)
    // }
    // const [valuePas, setValuePas] = React.useState('password')
    // const onChangePas = e => {
    //   setValuePas(e.target.valuePas)
    // }
    const [value, setValue] = React.useState('value')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
    }
    return(
        <div>
            <p className="text text_type_main-medium">Вход</p>
            {/* <EmailInput onChange={onChange} value={value} name={'email'} />
            <PasswordInput onChange={onChangePas} value={valuePas} name={'password'} /> */}
            <Input
      type={'text'}
      placeholder={'Email'}
      onChange={e => setValue(e.target.value)}
      value={value}
      name={'name'}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
    />
        </div>
    )
}