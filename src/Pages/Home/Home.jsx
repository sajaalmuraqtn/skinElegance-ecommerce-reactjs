import React, { useState } from 'react'

import HomeContent from '../../Components/HomeContent/HomeContent.jsx'
import Categories from '../../Components/Categories/categories.jsx'
import LatestNewProduct from '../../Components/Product/latestnewproduct.jsx'
import CouponSection from '../../Components/Coupon/couponSection.jsx'
export default function Home() {

   return (
    <>
      <HomeContent />
      <Categories marginBottom={130} page={1} latestNew='LatestNewActiveCategory' />
      <LatestNewProduct/>
      <CouponSection/>
    </>
  )
}
