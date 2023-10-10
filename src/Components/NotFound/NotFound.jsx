import React from 'react'
import style from './NotFound.module.css'
import err from '../../Assets/Images/error.svg'
import { Discuss } from 'react-loader-spinner'

export default function NotFound() {
  return <>
  <div className='d-flex justify-content-center align-items-center my-5'>
  <img src={err}/>
  </div>
  </>
}
