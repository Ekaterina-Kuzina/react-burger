import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

type TTabsContentProps = {
  tabIndex: number;
  changeTabIndex: (index: number)=> void;
}

export default function TabsContent({tabIndex, changeTabIndex}: TTabsContentProps) {

  return (
    <div style={{ display: 'flex' }}>
      <Tab value= {'0'} active={tabIndex === 0} onClick={()=> changeTabIndex(0)}>
        Булки
      </Tab>
      <Tab value= {'1'} active={tabIndex === 1} onClick={()=> changeTabIndex(1)}>
        Начинки
      </Tab>
      <Tab value={'2'} active={tabIndex === 2} onClick={()=> changeTabIndex(2)}>
        Соусы
      </Tab>
    </div>
  )
}
