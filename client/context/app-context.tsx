'use client'

import React, { createContext, useState } from "react";
import {AppContextType,LinkType, ThemePouriaType} from '../types/types'
export const AppContext = createContext<AppContextType | null>({
  theme: {
    primary:"",
    secondary:"",
    background:""
  },
  changeTheme: () => { },
  items: [],
  removeItem: () => { },
  addItem: () => { },
  updateItem: () => { },
});

const AppContextProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
  
  const [items, setItems] = useState<LinkType[]>([])
  const [theme, setTheme] = useState<ThemePouriaType>({
    background: '#3C3633',
    primary:'#E0CCBE',
    secondary:'#EEEDEB'
  })

  const removeItem = (item: LinkType) => {
    const filteredItems = items.filter(currentItem => item.address !== item.address)
    setItems(filteredItems)
  }
  const addItem = (item: LinkType) => {

    const concatanatedItems = items.concat(item)
    setItems(concatanatedItems)
  }
  const updateItem = (item: LinkType) => {
    const targetedItemIndex = items.findIndex(currentItem => currentItem.id === item.id);
    const updatedItems = [...items.slice(0, targetedItemIndex), item, ...items.slice(targetedItemIndex + 1, items.length)]

    setItems(updatedItems)
  }

  const changeTheme = (themeSample: ThemePouriaType) => {
    setTheme(themeSample)
  }

  return (
    <AppContext.Provider
    value={{
        theme,
        changeTheme,
        items,
        removeItem,
        addItem,
        updateItem

    }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

