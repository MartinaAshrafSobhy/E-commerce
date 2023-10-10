import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup';
import axios from 'axios';
import { ProgressBar } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';



export default function Login() {

  let {setUserToken}=useContext(UserContext);

  let baseURL = 'https://ecommerce.routemisr.com';

  let navigate = useNavigate();
  let [isLoading, setLoading] = useState(false);
  let [err,setErr]=useState(null);


  const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  async function sendData(values) {
    setLoading(true);
    let { data } = await axios.post(`${baseURL}/api/v1/auth/signin`, values)
    .catch((err)=>{
      console.log(err.response.data.message);
      setErr(err.response.data.message);
      setLoading(false);
    })
    console.log("response", data);
    if (data.message == 'success') {
      setLoading(false);
      console.log('logged');
      localStorage.setItem('userToken',data.token)
      setUserToken(data.token)
      navigate('/');
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: sendData,
  })

  return <>
    <div className='w-75 mx-auto my-5'>

      <h3>Login to your account:</h3>

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor='userEmail'>Email: </label>
        <input id='userEmail' className='form-control' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" name='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

        <label htmlFor='userPass'>Password: </label>
        <input id='userPass' className='form-control' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" name='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}


        {isLoading ? <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor='#0aad0a'
          barColor='#0aad0a'
        /> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white my-3'>Login</button>}
      </form>
    </div>
  </>
}
