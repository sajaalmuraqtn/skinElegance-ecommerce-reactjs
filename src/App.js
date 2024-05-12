import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../src/assets/images/favicon.webp'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../src/assets/css/vendor/bootstrap.min.css'

import '../src/assets/css/plugins/swiper-bundle.min.css'
import '../src/assets/css/plugins/font-awesome.min.css'
import '../src/assets/css/plugins/fancybox.min.css'
import '../src/assets/css/plugins/nice-select.css'

import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home/Home.jsx';
import NotFound from './Components/NotFound/NotFound';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import axios from 'axios';
import { GlobalFunctionContextProvider } from './Context/globalFunctionsContext.jsx';
import Product from './Pages/Products/Product.jsx';
import { ProductApiContextProvider } from './Context/productApiContext.jsx';
import ProductDetails from './Pages/Products/productDetails.jsx';
import ProductWithCategory from './Pages/Products/productWithCategory.jsx';
import ForgotPassword from './Pages/ForgotPassword/forgotPassword.jsx';
import { AuthContext, AuthContextProvider } from './Context/Auth.context.jsx';
import MyOrders from './Pages/Order/MyOrders.jsx';
import OrderDetails from './Pages/Order/OrderDetails.jsx';
import CartPage from './Pages/Cart/CartPage.jsx';
import ProtectedRouter from './ProtectedRouter/ProtectedRouter.jsx';
import { useContext, useEffect, useState } from 'react';
import UpdateProfile from './Pages/Profile/UpdateProfile.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import FavoriteList from './Pages/FavoriteList/FavoriteList.jsx';
import MakeOrder from './Pages/Order/MakeOrder.jsx';
import UpdatePassword from './Pages/ForgotPassword/UpdatePassword.jsx';
import { CartContextProvider } from './Context/CartContext.jsx';
import ResetPassword from './Pages/ForgotPassword/ResetPassword.jsx';
import SetCode from './Pages/ForgotPassword/SetCode.jsx';
import CancelOrder from './Pages/Order/cancelOrder.jsx';

axios.defaults.baseURL = 'https://skinelegance-ecommerce-nodejs.onrender.com';

function App() {

  let routes = createBrowserRouter([{
    path: '', element: <AuthContextProvider> <Layout /> </AuthContextProvider>, children: [
      { index: true, element: <ProductApiContextProvider><Home /> </ProductApiContextProvider> },
      { path: 'Products', element: <ProductApiContextProvider><Product /></ProductApiContextProvider>, },
      { path: 'Products/category/:CategoryId', element: <ProductApiContextProvider><ProductWithCategory /></ProductApiContextProvider>, },
      { path: "Products/:productId", element: <ProductApiContextProvider><ProductDetails /></ProductApiContextProvider> },
      { path: 'MyOrders', element: <AuthContextProvider><ProtectedRouter><MyOrders /></ProtectedRouter></AuthContextProvider> },
      { path: 'MyOrders/OrderDetails', element: <ProductApiContextProvider><ProtectedRouter><OrderDetails /></ProtectedRouter></ProductApiContextProvider> },
      { path: 'MyOrders/CancelOrder', element:<ProtectedRouter><CancelOrder /></ProtectedRouter>},
      { path: 'Cart', element: <AuthContextProvider><ProtectedRouter><CartPage /></ProtectedRouter></AuthContextProvider> },
      { path: 'FavoriteList', element: <ProductApiContextProvider><ProtectedRouter><FavoriteList /></ProtectedRouter> </ProductApiContextProvider> },
      { path: 'MakeOrder', element: <AuthContextProvider><ProtectedRouter><MakeOrder /></ProtectedRouter></AuthContextProvider> },
      { path: 'Profile', element: <AuthContextProvider><ProtectedRouter><Profile /></ProtectedRouter></AuthContextProvider> },
      { path: 'UpdateProfile', element: <AuthContextProvider><ProtectedRouter><UpdateProfile /></ProtectedRouter></AuthContextProvider> },
      { path: 'Cart', element: <AuthContextProvider><ProtectedRouter><CartPage /></ProtectedRouter></AuthContextProvider> },
      { path: 'ForgotPassword', element: <AuthContextProvider><ForgotPassword /></AuthContextProvider> },
      { path: 'UpdatePassword', element: <AuthContextProvider><ProtectedRouter><UpdatePassword /></ProtectedRouter></AuthContextProvider> },
      { path: 'ResetPassword', element: <AuthContextProvider><ResetPassword /></AuthContextProvider> },
      { path: 'SetCode', element: <AuthContextProvider><SetCode /></AuthContextProvider> },
      { path: 'Login', element: <Login /> },
      { path: 'Register', element: <AuthContextProvider> <Register /></AuthContextProvider> },
      { path: '*', element: <NotFound title={'Opps! You Lost'} titlePage={'Home'} goTO={''} /> },
    ]
  }


  ])

  return (
    <div className="App">
      <GlobalFunctionContextProvider>
        <CartContextProvider>

          <AuthContextProvider>
            <RouterProvider router={routes}>

            </RouterProvider>
          </AuthContextProvider>
        </CartContextProvider>
      </GlobalFunctionContextProvider>
    </div>
  );
}

export default App;
