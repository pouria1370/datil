'use client'
import React, { useContext } from 'react'
import Communication from '../Communication/Communication'
import { AppContext } from '../../context/app-context'

const Communications = () => {
  const ctx = useContext(AppContext)
  return (
    <div>
      {ctx?.items.map(item =><Communication item={item}/> )}
    </div>
  )
}

export default Communications