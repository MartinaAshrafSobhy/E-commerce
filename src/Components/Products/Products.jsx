import React from 'react'
import style from './Products.module.css'
import { Helmet } from 'react-helmet'
import { decrease, increase } from '../../Redux/CounterReducer'
import { useDispatch } from 'react-redux'

export default function Products() {

  let dispatch = useDispatch();

  return <>
    <Helmet><title>My Products</title></Helmet>
  
    <div className="my-5 d-flex justify-content-around">
    <button onClick={()=>dispatch(increase())} className='btn bg-main text-white'> Add Product to Cart </button>
    <button onClick={()=>dispatch(decrease())} className='btn bg-main text-white'> Remove Product from Cart </button>
    </div>


  </>
}
