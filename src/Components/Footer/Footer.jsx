import React from 'react'
import style from './Footer.module.css'

export default function Footer() {
  return <>
  <footer className=' stickey-bottom bg-main-light py-5'>
    <div className="container">
      <h4>Get the FreshCart app</h4>
      <p>We will send you a link open it on your phone to download the app.</p>
      <div className="d-flex">
        <div className="col-sm-10">
          <input type='text' className='form-control py-2' placeholder='Email'/>
        </div>
        <div className="col-sm-2 ps-2">
          <button className='btn w-100 bg-main text-white'>Share App Link</button>
        </div>
      </div>
      <div className='line border-bottom border-2 my-4'></div>
      <div className="d-flex justify-content-between">
        <div className='d-flex align-items-center'>
          <span>Payment Partners </span>
          <i className="fa-brands fa-amazon-pay text-primary ms-2"></i>
          <i className="fa-brands fa-google-pay text-primary ms-2"></i>
          <i className="fa-brands fa-paypal text-primary ms-2"></i>          
        </div>
        <div className='d-flex align-items-center'>
          <span>Get deliveries with FreshCart </span>
          <i className="fa-brands fa-cc-apple-pay mx-2 display-6 text-secondary"></i>
          <i className="fa-brands fa-google-play display-6 text-secondary"></i>
        </div>
      </div>
      <div className='line border-bottom border-2 my-4'></div>
    </div>
  </footer>
  </>
}
