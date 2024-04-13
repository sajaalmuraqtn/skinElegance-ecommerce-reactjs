import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import logo from '../../assets/images/logo.webp'


export default function Layout() {
  return (
    <>
      <Navbar logo={logo} />
      <Outlet>

      </Outlet>
      <Footer logo={logo}/>
    </>

    )
}
