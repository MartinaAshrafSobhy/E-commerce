import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserContextProvider, { UserContext } from './Contexts/UserContext';
import ProductDetailes from './Components/ProductDetailes/ProductDetailes';
import Payment from './Components/Payment/Payment';
import CartContextProvider from './Contexts/CartContext';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';


let routers = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:'brands',element:<Brands/>},
    {path:'cart',element:<Cart/>},
    {path:'categories',element:<Categories/>},
    {path:'products',element:<Products/>},
    {path:'products/:id',element:<ProductDetailes/>},
    {path:'payment/:id',element:<Payment/>},
    {path:'register',element:<Register/>},
    {path:'login',element:<Login/>},
    {path:'*',element:<NotFound/>},
  ]}
])

function App() {
  return (
    <>
    <Provider store={Store}>
    <UserContextProvider>
      <CartContextProvider>
    <RouterProvider router={routers}/>    
      </CartContextProvider>
    </UserContextProvider>
    </Provider>
    </>
  );
}

export default App;
