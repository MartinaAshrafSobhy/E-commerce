import React from 'react'
import style from './Brands.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useQuery } from 'react-query'


export default function Brands() {

  function getBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let {data} = useQuery('getAllBrands',getBrands)

 


  return <>
    <Helmet><title>Brands</title></Helmet>

    <div className="row my-5">
    {data?.data.data.map((item)=>(
       <div key={item._id} className='col-md-3 product mb-5'>
         <img src={item.image} className='w-100' height={200}/>
       </div>
      ))}
    </div>
  
  </>
}
