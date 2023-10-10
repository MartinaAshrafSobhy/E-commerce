import React from 'react'
import style from './CategorySlider.module.css'
import Slider from 'react-slick'
import { useQuery } from 'react-query';
import axios from 'axios';


export default function CategorySlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2
  };

  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data} = useQuery('getAllCategories',getCategories)

  return <>
  <h2 className='my-3'>Shop Popular Categories</h2>

  <Slider {...settings}>
      {data?.data.data.map((cat)=>(
       <div key={cat._id} className='mb-5'>
         <img src={cat.image} className='w-100' height={200}/>
         <span className='font-sm'>{cat.name}</span>
       </div>
      ))}
    </Slider>
  </>
}
