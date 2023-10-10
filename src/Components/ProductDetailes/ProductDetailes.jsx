import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetailes.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Bars } from 'react-loader-spinner';
import Slider from 'react-slick';
import { CartContext } from '../../Contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';


export default function ProductDetailes() {

  let {addProductToCart} = useContext(CartContext)

  async function addToCart(id){

    let {data} = await addProductToCart(id)
    // console.log(data)
    if (data.status=="success"){

      toast("Product added to cart", {
        style: {
          border: '1px solid green',
        },
        icon: '🛒'
      })
    }
    
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let {id} = useParams()
  // console.log(id);

   function getProductDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

 let {isLoading,isError,data} = useQuery('productDetails',()=>getProductDetails(id))

 const [isActive, setIsActive] = useState(false);
  function handleClick() {
    setIsActive(current => !current);
  };

  return <>
  {data?.data.data ? <div className="row p-5 align-items-center">
  <Toaster/>
    <div className="col-md-4">
      <Slider {...settings}>
          {data?.data.data.images.map((imgSrc)=>(
            <img key={imgSrc} src={imgSrc} className='w-100'/>
          ))}
        </Slider>
    </div>
    <div className="col-md-8">
      <h5 className='mb-5'>{data?.data.data.description}</h5>
      <h2 className='text-main font-sm'>{data?.data.data.title}</h2>
      <span>{data?.data.data.category.name}</span>

      <div className="d-flex justify-content-between align-items-center">
      <span className='fw-bold'>{data?.data.data.price} EGP</span> 
      <span className='text-muted'><i className='fa fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
      </div>

      <div className="d-flex align-items-center my-3">
      <button onClick={()=>addToCart(data?.data.data._id)} className='btn bg-main text-white w-100 me-3'>Add to cart</button>
      <div className='cursor-pointer h3' style={{color: isActive ? 'red' : ''}}onClick={()=>handleClick()}><i className='fa-solid fa-heart'></i></div>
      </div>
    </div>
  </div> : ''}
  
  </>
}
