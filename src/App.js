import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../src/assets/images/favicon.webp'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

axios.defaults.baseURL = 'https://skinelegance-ecommerce-nodejs.onrender.com';
function App() {

  let routes = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { index: true, element: <ProductApiContextProvider><Home /> </ProductApiContextProvider>},
      { path: 'Products', element: <ProductApiContextProvider><Product /></ProductApiContextProvider> , },
      { path: 'Products/category/:CategoryId', element: <ProductApiContextProvider><ProductWithCategory /></ProductApiContextProvider> , },
      { path: 'Products', element: <ProductApiContextProvider><Product /></ProductApiContextProvider> , },
      { path: "Products/:productId", element: <ProductDetails/> },

      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound title={'Opps! You Lost'} titlePage={'Home'} goTO={''} /> },
    ]
  }


  ])

  return (
    <div className="App">
      <GlobalFunctionContextProvider>

        <RouterProvider router={routes}>

        </RouterProvider>
      </GlobalFunctionContextProvider>
    </div>
  );
}

export default App;
