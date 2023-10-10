import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import { Bars } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { CartContext } from '../../Contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function Home() {

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

  
  // let [products,setProducts] = useState([]);
  // let [isLoading,setIsLoading] = useState(false);


  // useEffect(()=>{
  //  getAllProducts()
  // },[])

  // async function getAllProducts(){
  //   setIsLoading(true)
  //   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   console.log(data.data);
  //   setProducts(data.data)
  //   setIsLoading(false)
  // }

  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let {isLoading,isFetching,data} = useQuery('getAllProducts',getProducts,{
    cacheTime:1000
  })
  // console.log(data?.data.data);


  const [isActive, setIsActive] = useState(false);
  function handleClick() {
    setIsActive(current => !current);
  };

  return <>
  <Helmet><title>Home</title></Helmet>

  

  {isLoading? <div className="d-flex justify-content-center align-items-center my-4">
  <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  </div> : <>
  <MainSlider></MainSlider>
  <CategorySlider></CategorySlider>
  <div className="row">
    <Toaster/>
     {data?.data.data.map((product)=>(
       <div key={product._id} className="col-md-2">
       <div className="product overflow-hidden p-2">
        <Link to={`products/${product._id}`}>
         <img src={product.imageCover} className='w-100'/>
         <h5 className='text-main font-sm mt-2'>{product.category.name}</h5>
         <h5>{product.title.split(" ").slice(0,2).join(" ")}</h5>
         <div className='d-flex justify-content-between mt-4'>
           <span className='fw-bold'>{product.price} EGP</span> 
            <span className='text-muted'><i className='fa fa-star rating-color'></i>{product.ratingsAverage}</span>
         </div>
       </Link>
        <div className="d-flex mt-2 ">
         <button onClick={()=>addToCart(product._id)} className='btn bg-main text-white w-100 me-2'>Add to cart</button>
         <div className='cursor-pointer' style={{color: isActive ? 'red' : ''}}onClick={()=>handleClick()}><i className='fa-solid fa-heart'></i></div>
        </div>
       </div>
     </div>
     ))}
  </div>
  </>
  }
  
  </>
}
