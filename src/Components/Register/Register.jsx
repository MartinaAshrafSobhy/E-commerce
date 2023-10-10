import React, { useState } from 'react'
import style from './Register.module.css'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup';
import axios from 'axios';
import { ProgressBar } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';



export default function Register() {


  let navigate = useNavigate();
  let [isLoading, setLoading] = useState(false);
  let [err,setErr]=useState(null);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


  const validationSchema = yup.object({
    name: yup.string('Must be string').min(3, 'length more than 3').max(15, 'length less than 15').required('Name is required'),
    email: yup.string().email('Email is not valid').required('Email is required'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,20}/, 'Password is not valid').required('Password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'Password does not match').required('required')
  })

  async function sendData(values) {
    setLoading(true);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .catch((err)=>{
      console.log(err.response.data.message);
      setErr(err.response.data.message);
      setLoading(false);
    })
    console.log("response", data);
    if (data.message == 'success') {
      setLoading(false);
      navigate('/login')
    }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: sendData,
  })

  return <>
    <div className='w-75 mx-auto my-5'>

      <h3>Register Now:</h3>

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor='userName'>Name: </label>
        <input id='userName' className='form-control' onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type="text" name='name' />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ''}

        <label htmlFor='userEmail'>Email: </label>
        <input id='userEmail' className='form-control' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" name='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

        <label htmlFor='userPass'>Password: </label>
        <input id='userPass' className='form-control' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" name='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

        <label htmlFor='userRePass'>RePassword: </label>
        <input id='userRePass' className='form-control' onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} type="password" name='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ''}

        <label htmlFor='userPhone'>Phone: </label>
        <input id='userPhone' className='form-control' onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} type="tel" name='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}


        {isLoading ? <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor='#0aad0a'
          barColor='#0aad0a'
        /> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white my-3 me-0'>Register</button>}
      </form>
    </div>
  </>
}
