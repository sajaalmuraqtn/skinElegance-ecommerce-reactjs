import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading.jsx';
import ProductComponent from '../../Components/Product/product.component.jsx';
import CategoryComponent from '../../Components/Categories/categoryComponent.jsx';
import { ProductApiContext } from '../../Context/productApiContext.jsx';

export default function Product() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const { getProducts, products = [], getSearchProducts, statusError } = useContext(ProductApiContext);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useSearchParams();

  const handleSearch = (e) => {
    const query = e.target.value;
    setPage(1); // Reset page to 1 when performing a new search
    setParams({ query }); // Update URL query parameters with the new search query
  };


  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const getCategory = async () => {
    try {
      const { data } = await axios.get('/catagories/active');
      if (data.message === "success") {
        setCategories(data.activeCatagories);
      }
    } catch (error) {
     }
  };

  useEffect(() => {
    getCategory();
    const searchQuery = params.get('query'); // Get the search query from URL parameters
    const itemsPerPage = 9; // Set number of items per page
    if (searchQuery) {
      getSearchProducts(page, 'allProducts/active', searchQuery).then(data => {
        if (data && data.total) {
          const totalPages = Math.ceil(data.total / itemsPerPage);
          setTotalPages(totalPages);
        }
      }).catch(error => {
      });
    } else {
      getProducts(page, 'allProducts/active').then(data => {
        if (data && data.total) {
          const totalPages = Math.ceil(data.total / itemsPerPage);
          setTotalPages(totalPages);
        }
      }).catch(error => {
      });
    }
  }, [page, params]);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SkinElegance | Products</title>
      </Helmet>
      <main className="main-content">
        {/*== Start Product Category Area Wrapper ==*/}
        <section className="page-header-area pt-10" data-bg-color="#FFF3DA">
          <div className="container">
            <div className="page-header-st3-content mt-10">
              <h2 className="page-header-title mt-10">All Categories</h2>
            </div>
          </div>
        </section>
        {/*== End Page Header Area Wrapper ==*/}
        <section className="section-space" style={{ marginBottom: '-100px', marginTop: '-40px' }}>
          <div className="container">
            {categories?.length === 0 ? (
              <Loading margin={100} height={200} fontSize={70} />
            ) : (
              <div id="carouselExampleFade5" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
                <div className="carousel-inner">
                  {chunkArray(categories, 6).map((chunk, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                      <div className="row g-3 g-sm-6">
                        {chunk.map((category) => (
                          <CategoryComponent category={category} key={category._id} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {categories.length > 6 && (
                  <div className="col-12">
                    <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
                      <li className="page-item">
                        <button className="page-link previous" href="#carouselExampleFade5" role="button" data-bs-slide="prev">
                          <span className="fa fa-chevron-left" aria-hidden="true" />
                        </button>
                      </li>
                      <li className="page-item">
                        <button className="page-link next" href="#carouselExampleFade5" role="button" data-bs-slide="next">
                          <span className="fa fa-chevron-right" aria-hidden="true" />
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        {/*== End Product Category Area Wrapper ==*/}
        <div className="page-header-area">
          <div className="container">
            <div className="shop-top-bar">
              <div className="select-price-range">
                <input
                  value={params.get('query') || ''}
                  onChange={handleSearch}
                  className="search form-control"
                  type="search"
                  name="search"
                  placeholder="Search on Products (title, description ,...)"
                />
              </div>

              <div className="select-on-sale d-none d-md-flex">

              </div>
            </div>
          </div>
        </div>
        {/*== Start Page Header Area Wrapper ==*/}
        <section className="page-header-area" data-bg-color="#FFF3DA">
          <div className="container">
            <div className="page-header-st3-content mt-10">
              <h2 className="page-header-title">All Products</h2>
              <p>Experience the magic of our beauty products, meticulously formulated to empower you to look and feel your best, every day.</p>
            </div>
          </div>
        </section>
        {/*== End Page Header Area Wrapper ==*/}
        {/*== Start Product Area Wrapper ==*/}
        <section className="section-space" style={{ marginTop: '-50px' }}>
          <div className="container">
            <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
              {/*== Start Product Item ==*/}
              {(!params.get('query') && products?.length === 0) ? (
                <Loading margin={100} height={200} fontSize={70} />
              ) : (
                products.map((product) => (
                  <ProductComponent product={product} key={product._id} />
                ))
              )}
              {/*== End Product Item ==*/}
              {totalPages > 1 && (
                <div className="col-12">
                  <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
                    <li className="page-item">
                      <button
                        className="page-link previous"
                        aria-label="Previous"
                      >
                        <span className="fa fa-chevron-left" aria-hidden="true" />
                      </button>
                    </li>
                    <button className="page-link" onClick={() => setPage(1)}>1</button>
                    <li className="page-item">
                      <button
                        className="page-link next"
                        aria-label="Next"
                      >
                        <span className="fa fa-chevron-right " aria-hidden="true" />
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              {/*== Pagination ==*/}
            </div>
          </div>
        </section>
        {/*== End Product Area Wrapper ==*/}
        {statusError?.includes('product') && (
          <div className="alert alert-danger" role="alert">
            There was an error fetching the product data.
          </div>
        )}
      </main>
    </>
  );
}
