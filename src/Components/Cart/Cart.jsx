import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Contexts/CartContext'
import { Bars } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


export default function Cart() {

  let [cartData,setCartData] = useState(null);
  let {getCartProduct,deleteCartItem,updateCartItem,setCartCounter}  = useContext(CartContext);

  async function getCartData(){
    let {data} = await getCartProduct()
    // console.log(data);
    // console.log( 'el cartttttttt' ,cartData);
    setCartData(data);
  }

  async function deleteItem(id){
    let {data} = await deleteCartItem(id)
    setCartData(data)
    // console.log(data);
  }

  async function updateCount(id,count){
    let {data} = await updateCartItem(id,count);
    setCartData(data)
    // console.log(data,count);
  } 
  
  useEffect(()=>{
    getCartData();
  },[])

  return <>
  <Helmet><title>My Cart</title></Helmet>
  {cartData?  <div className="bg-main-light my-5 p-4">
    <h2>Shop Cart </h2>
    <h6 className='text-main fw-bold'>Cart Items:  {cartData.numOfCartItems}</h6>
    <h6 className='text-main fw-bold'>Total Cart Price:  {cartData.data.totalCartPrice}</h6>
    {cartData.data.products.map((item)=>(
      <div key={item._id} className="row mt-3">
        <div className="col-md-2">
          <img src={item.product.imageCover} className='w-100'/>
        </div>
        <div className="col-md-10 d-flex justify-content-between">
          <div>
          <h4 className='my-3'>{item.product.title}</h4>
          <h5 className='text-main fw-bold my-3'>price: {item.price}</h5>
          <button className='btn' onClick={()=>deleteItem(item.product.id)}> <i className='fa fa-trash text-main'></i> Remove</button>
          </div>
          <div>
            <button className='btn btn-outline-success' onClick={()=>updateCount(item.product._id,item.count+1)}><i className='fas fa-plus'></i></button>
            <span className='mx-3'>{item.count}</span>
            <button className='btn btn-outline-success' onClick={()=>updateCount(item.product._id,item.count-1)}><i className='fas fa-minus'></i></button>
          </div>
        </div>
      </div>
    ))}
    <Link to={`/payment/${cartData.data._id}`} className='bg-main btn text-white mt-3'>Pay Online</Link>
  </div> : <div className='d-flex justify-content-center align-items-center my-5'>
  <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </div>}
 
  </>
}
