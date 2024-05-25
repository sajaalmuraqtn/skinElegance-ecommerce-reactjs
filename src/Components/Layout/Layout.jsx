import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import logo from '../../assets/logo.png'
import { AuthContext, AuthContextProvider } from '../../Context/Auth.context.jsx';
import { useNavigate } from "react-router-dom";


export default function Layout() {
  const { getProfile, user, setUser } = useContext(AuthContext);

  let navigate = useNavigate()
  function LogOut() {
    setUser(null);
    localStorage.removeItem("userToken");
    navigate('/Login')
    getProfile()
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getProfile()
    }
  }, [])

  return (
    <>
      <Navbar user={user} LogOut={LogOut} logo={logo} />
      <Outlet>

      </Outlet>
      <Footer />
    </>

  )
}
