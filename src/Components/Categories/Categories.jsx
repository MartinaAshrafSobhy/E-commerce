import React from 'react'
import style from './Categories.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'


export default function Categories() {

  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/subcategories')
  }

  let {data} = useQuery('getAllCategories',getCategories)

 


  return <>
    <Helmet><title>Categories</title></Helmet>

    <div className="row my-5">
    {data?.data.data.map((cat)=>(
       <div key={cat._id} className='col-md-3 product p-2 mb-5'>
         <Link to={`/categories/${cat._id}`}>
         <div className="p-5 bg-main text-white text-center border rounded-circle">
         <h1 className='font-sm mt-3 fw-bold'>{cat.name}</h1>
         </div>
         </Link>
       </div>
      ))}
    </div>
  
  </>
}
