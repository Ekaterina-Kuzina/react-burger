import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export default function TabsContent(props) {

  return (
    <div style={{ display: 'flex' }}>
      <Tab value= {0} active={props.tabIndex === 0} onClick={()=> props.changeTabIndex(0)}>
        Булки
      </Tab>
      <Tab value= {1} active={props.tabIndex === 1} onClick={()=> props.changeTabIndex(1)}>
        Начинки
      </Tab>
      <Tab value={2} active={props.tabIndex === 2} onClick={()=> props.changeTabIndex(2)}>
        Соусы
      </Tab>
    </div>
  )
}
