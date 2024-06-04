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

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import {AuthContextProvider } from './Context/Auth.context.jsx';
import MyOrders from './Pages/Order/MyOrders.jsx';
import OrderDetails from './Pages/Order/OrderDetails.jsx';
import CartPage from './Pages/Cart/CartPage.jsx';
import ProtectedRouter from './ProtectedRouter/ProtectedRouter.jsx';
import UpdateProfile from './Pages/Profile/UpdateProfile.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import FavoriteList from './Pages/FavoriteList/FavoriteList.jsx';
import MakeOrder from './Pages/Order/MakeOrder.jsx';
import UpdatePassword from './Pages/ForgotPassword/UpdatePassword.jsx';
import { CartContextProvider } from './Context/CartContext.jsx';
import ResetPassword from './Pages/ForgotPassword/ResetPassword.jsx';
import CancelOrder from './Pages/Order/cancelOrder.jsx';
import AdvertisementDetails from './Pages/Advertesment/AdvertesmentDetails.page.jsx';
import ServiceDetails from './Pages/Advertesment/ServiceDetails.jsx';
import Advertisements from './Pages/Advertesment/Advertesment.page.jsx';
import AboutPage from './Pages/About/AboutPage.jsx';
import Privacy from './Pages/Privacy/Privacy.jsx';
import Contacts from './Pages/Contacts/Contacts.jsx';
import Frequently from './Pages/Frequently/Frequently.jsx';
import AddPaymentMethod from './Pages/Order/AddPaymentMethod.jsx';
import CardDetails from './Pages/Order/CardDetails.jsx';

axios.defaults.baseURL = 'https://skinelegance-ecommerce-nodejs.onrender.com';

function App() {



  return (
    <div className="App">
    <GlobalFunctionContextProvider>
      <CartContextProvider>
        <AuthContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AuthContextProvider> <Layout /> </AuthContextProvider>}>
                <Route index element={<ProductApiContextProvider><Home /></ProductApiContextProvider>} />
                <Route path="Products" element={<ProductApiContextProvider><Product /></ProductApiContextProvider>} />
                <Route path="Products/category/:CategoryId" element={<ProductApiContextProvider><ProductWithCategory /></ProductApiContextProvider>} />
                <Route path="Products/:productId" element={<ProductApiContextProvider><ProductDetails /></ProductApiContextProvider>} />
                <Route path="Advertisements" element={<Advertisements />} />
                <Route path="AddPaymentMethod" element={<ProtectedRouter><AddPaymentMethod /></ProtectedRouter>} />
                <Route path="Advertisements/:advertisementId" element={<AdvertisementDetails />} />
                <Route path="Advertisements/:advertisementId/:serviceId" element={<ServiceDetails />} />
                <Route path="MyOrders" element={<ProtectedRouter><MyOrders /></ProtectedRouter>} />
                <Route path="MyOrders/Cancel" element={<ProtectedRouter><CancelOrder /></ProtectedRouter>} />
                <Route path="MyOrders/OrderDetails" element={<ProtectedRouter><OrderDetails /></ProtectedRouter>} />
                <Route path="Orders/CardDetails" element={<ProtectedRouter><CardDetails /></ProtectedRouter>} />
                <Route path="MyOrders/CancelOrder" element={<ProtectedRouter><CancelOrder /></ProtectedRouter>} />
                <Route path="Cart" element={<ProtectedRouter><CartPage /></ProtectedRouter>} />
                <Route path="FavoriteList" element={<ProtectedRouter><FavoriteList /></ProtectedRouter>} />
                <Route path="MakeOrder" element={<ProtectedRouter><MakeOrder /></ProtectedRouter>} />
                <Route path="Profile" element={<ProtectedRouter><Profile /></ProtectedRouter>} />
                <Route path="UpdateProfile" element={<ProtectedRouter><UpdateProfile /></ProtectedRouter>} />
                <Route path="ForgotPassword" element={<ForgotPassword />} />
                <Route path="UpdatePassword" element={<ProtectedRouter><UpdatePassword /></ProtectedRouter>} />
                <Route path="ResetPassword" element={<ResetPassword />} />
                <Route path="Login" element={<Login />} />
                <Route path="About" element={<AboutPage />} />
                <Route path="Frequently" element={<Frequently />} />
                <Route path="Privacy" element={<Privacy />} />
                <Route path="Contacts" element={<ProtectedRouter><Contacts /></ProtectedRouter>} />
                <Route path="Register" element={<Register />} />
                <Route path="*" element={<NotFound title={'Opps! You Lost'} titlePage={'Home'} goTO={''} />} />
              </Route>
            </Routes>
          </Router>
        </AuthContextProvider>
      </CartContextProvider>
    </GlobalFunctionContextProvider>
  </div>
  );
}

export default App;
