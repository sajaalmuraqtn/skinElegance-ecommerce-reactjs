import React, { useState } from 'react'

import HomeContent from '../../Components/HomeContent/HomeContent.jsx'
import Categories from '../../Components/Categories/categories.jsx'
export default function Home() {

   return (
    < >
      <HomeContent />
      <Categories marginBottom={80} page={1} />
    </ >
  )
}
