import React from 'react'
import style from './Guard.module.css'
import { Navigate } from 'react-router-dom'

export default function Guard({children}) {

  if(localStorage.getItem('userToken'!=null)){
    return children
  } else{
    return <Navigate to='/'/>
  }

  return <>
  </>
}
