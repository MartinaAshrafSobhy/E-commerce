import axios from "axios";
import { createContext, useState } from "react";


export let CartContext = createContext();

export default function CartContextProvider({children}){

    const headers={token:localStorage.getItem('userToken')}

    function addProductToCart(id){
        // console.log(id);
       return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
    {
      productId: id
    },
    {
      headers
    })
    .then(res=>res)
    .catch(err=>err)
    }

    function getCartProduct(){
       return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
    {
      headers
    })
    .then(res=>res)
    .catch(err=>err)
    }

    function deleteCartItem(id){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
      ,{
        headers
      })
      .then(res=>res)
      .catch(err=>err)
    }

    function updateCartItem(id,count){
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
      ,{
        count
      }
      ,{
        headers
      })
      .then(res=>res)
      .catch(err=>err)
    }

    let [cartCounter,setCartCounter] = useState(0);

    function pay(values,id){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      {
        shippingAddress:values
      },
      {
        headers
      })
      .then(res=>res)
      .catch(err=>err)
    }


    return <CartContext.Provider value={{addProductToCart,getCartProduct,deleteCartItem,updateCartItem,cartCounter,setCartCounter,pay}}>
        {children}
    </CartContext.Provider>
}