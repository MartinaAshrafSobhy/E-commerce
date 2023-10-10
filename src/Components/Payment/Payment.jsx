import React, { useContext } from 'react'
import style from './Payment.module.css'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik'
import { CartContext } from '../../Contexts/CartContext'
import { useParams } from 'react-router-dom'

export default function Payment() {

  let {id} = useParams();

  let {pay} = useContext(CartContext);

  const handlePayment = async(values)=>{
    let {data} = await pay(values,id)
    if (data.status == 'success'){
      window.location.href=data.session.url;
    }
  }

  let formik=useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit:handlePayment
  })

  return <>
  <Helmet><title>Checkout</title></Helmet>

  <form onSubmit={formik.handleSubmit} className='my-5'>
    <label htmlFor='Details'>Details</label>
    <input className='form-control' type='text' name='details' onChange={formik.handleChange} onBlur={formik.handleBlur} id='Details'></input>

    <label htmlFor='Phone'>Phone</label>
    <input className='form-control' type='tel' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} id='Phone'></input>

    <label htmlFor='City'>City</label>
    <input className='form-control' type='text' name='city' onChange={formik.handleChange} onBlur={formik.handleBlur} id='City'></input>

    <button type='submit' className='btn bg-main text-white mt-4'>Pay Now</button>
  </form>
  </>
}
