import React, { useContext, useEffect, useState } from 'react'
import ProductComponent from './product.component.jsx'
import Loading from '../Loading/Loading.jsx'
import axios from 'axios';

export default function LatestNewProduct() {

  const [products, setProducts] = useState([]);
  const getProducts = async (page, urlProduct) => {
    try {
      const separator = urlProduct.includes('?') ? '&' : '?'; // to put the sort and other filters method
      const { data } = await axios.get(`/products/${urlProduct}${separator}page=${page}`);
      if (data.message === "success") {
        setProducts(data.products);
      }
    } catch (error) {
    }
  };  
  
  useEffect(() => {
    getProducts(1, 'allProducts/active?limit=6&sort=-createdAt');
   }, []); 

  return (
    <>
      {/*== Start Product Area Wrapper ==*/}
      <section className="section-space" style={{marginTop:"-170px"}}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title text-capitalize">latest new</h2>
                <p>Transform your beauty routine into a ritual of self-care with our enchanting selection of skincare treasures</p>

              </div>
            </div>
          </div>
          <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
            {/*== Start Product Item ==*/}
            {products.length === 0 ? (
              <Loading margin={100} height={200} fontSize={70} />
            ) :
              products.map((product) => (
                <ProductComponent product={product} key={product._id} />

              ))}
            {/*== End Product Item ==*/}      
                </div>
        </div>
      </section>
      {/*== End Product Area Wrapper ==*/}



    </>
  )
}
