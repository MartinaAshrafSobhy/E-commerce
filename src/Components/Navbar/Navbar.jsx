import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/Images/freshcart-logo.svg'
import { UserContext } from '../../Contexts/UserContext'
import { CartContext } from '../../Contexts/CartContext'
import { useSelector } from 'react-redux'

export default function Navbar() {

  let {count} = useSelector((state)=>state.counter)
  // console.log({count});

  let nav = useNavigate
  function logout(){
    localStorage.removeItem('userToken')
            setUserToken(null)
            nav('/Login');
  }
  let {userToken,setUserToken} = useContext(UserContext)
  let {cartCounter} = useContext(CartContext)


  return <>
   
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="">
      <img src={logo}></img>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

       {userToken? <>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
     
     <li className="nav-item">
       <Link className="nav-link" to="">Home</Link>
     </li>
   
     <li className="nav-item">
       <Link className="nav-link" to="cart">Cart</Link>
     </li>
   
     <li className="nav-item">
       <Link className="nav-link" to="products">Products</Link>
     </li>
   
     <li className="nav-item">
       <Link className="nav-link" to="categories">Categories</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link" to="brands">Brands</Link>
     </li>
     
   
       </ul>
       </> : null}


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
     
        <li className="nav-item d-flex align-items-center">
          <i className='mx-2 fa-brands fa-instagram'></i>
          <i className='mx-2 fa-brands fa-facebook'></i>
          <i className='mx-2 fa-brands fa-tiktok'></i>
          <i className='mx-2 fa-brands fa-twitter'></i>
          <i className='mx-2 fa-brands fa-linkedin'></i>
          <i className='mx-2 fa-brands fa-youtube'></i>
        </li>
      
        

        {userToken? <>
        
          <li className="nav-item">
          <Link className="nav-link" to="cart">
            <div className= 'crcl text-center text-white'>{count}</div>
            <i className="fa fa-cart-shopping "></i> 
          </Link>
          </li>

          <li className="nav-item">
          <Link className="nav-link" onClick={logout} >Logout</Link>
        </li>
        </> : <>
          <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        </>}
      
      </ul>
     
    </div>
  </div>
</nav>
   
  </>
}
