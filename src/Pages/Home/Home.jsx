import React, { useEffect, useState } from 'react'

import HomeContent from '../../Components/HomeContent/HomeContent.jsx'
import Categories from '../../Components/Categories/categories.jsx'
import LatestNewProduct from '../../Components/Product/latestnewproduct.jsx'
import CouponSection from '../../Components/Coupon/couponSection.jsx'
import CategoryComponent from '../../Components/Categories/categoryComponent.jsx'
import Loading from '../../Components/Loading/Loading.jsx'
import axios from 'axios'
export default function Home() {

  const [categories, setCategories] = useState([]);
  
  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };
  const getCategory = async () => {
    try {
      let url = `/categories/LatestNewActiveCategory?limit=6&sort=-createdAt`;
      const { data } = await axios.get(url);
      if (data.message === "success") {
        setCategories(data.activeCatagories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
getCategory()
  },[])
   return (
    <>
      <HomeContent />
      <section className="section-space" style={{ marginBottom: `-130px` }}>
        <div className="container">
          {categories.length === 0 ? (
            <Loading margin={100} height={200} fontSize={70} />
          ) : (
            <div id='carouselExampleFade' className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
              <div className="carousel-inner">
                {chunkArray(categories, 6).map((chunk, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <div className="row g-3 g-sm-6">
                      {chunk.map((category) => (
                        <CategoryComponent category={category} />

                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-12">
                <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
                  <li className="page-item">
                    <a className="page-link previous" href='#carouselExampleFade' role="button" data-bs-slide="prev">
                      <span className="fa fa-chevron-left" aria-hidden="true" />
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link next" href='#carouselExampleFade' role="button" data-bs-slide="next">
                      <span className="fa fa-chevron-right" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
      <LatestNewProduct/>
      <CouponSection/>
    </>
  )
}
