import React, { useContext, useEffect, useState } from 'react';
 import {useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading.jsx';
import { ProductApiContext } from '../../Context/productApiContext.jsx';
import ProductComponent from '../../Components/Product/product.component.jsx';
 import CategoryComponent from '../../Components/Categories/categoryComponent.jsx';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function ProductWithCategory() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pageFromURL = searchParams.get('page');
  const [page, setPage] = useState(parseInt(pageFromURL) || 1);
   const { getProducts, products, getSearchProducts } = useContext(ProductApiContext);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [params, setParams] = useSearchParams();

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const getCategory = async () => {
    try {
      let url = `/catagories/active`;
      const { data } = await axios.get(url);
      if (data.message === "success") {
        setCategories(data.activeCatagories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setPage(1); // Reset page to 1 when performing a new search
    setParams({ query }); // Update URL query parameters with the new search query
  };

  useEffect(() => {
    getCategory();
    const searchQuery = params.get('query'); // Get the search query from URL parameters
    if (searchQuery) {
      getSearchProducts(page, `category/${location.state.categoryId}`, searchQuery).then(data => {
        if (data && data.total) {
          const totalPages = Math.ceil(data.total / 9); // Assuming 9 products per page
          setTotalPages(totalPages);
        }  
      }).catch(error => {
       });
    } else {
      getProducts(page, `category/${location.state.categoryId}`).then(data => {
          if (data && data.total) {
            const totalPages = Math.ceil(data.total / 9); // Assuming 9 products per page
            setTotalPages(totalPages);
          }  
        }).catch(error => {
         });
    }
  }, [location, page, params]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li className="page-item" key={i}>
        <a className="page-link" onClick={() => handlePageChange(i)}>{i}</a>
      </li>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SkinElegance|CategoryProducts-{location.state.slug}</title>
      </Helmet>
      <main className="main-content" style={{ marginBottom: '-70px' }}>
        <section className="page-header-area pt-10" data-bg-color="#FFF3DA">
          <div className="container">
            <div className="page-header-st3-content mt-10">
              <h2 className="page-header-title mt-10">All Categories</h2>
            </div>
          </div>
        </section>

        <section className="section-space" style={{ marginBottom: `-100px`, marginTop: `-40px` }}>
          <div className="container">
            {categories.length === 0 ? (
              <Loading margin={100} height={200} fontSize={70} />
            ) : (
              <div id='carouselExampleFade4' className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
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
                      
              { categories.length>6? 
              <div className="col-12">
                  <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-sm-10">
                    <li className="page-item">
                      <a className="page-link previous" href='#carouselExampleFade4' role="button" data-bs-slide="prev">
                        <span className="fa fa-chevron-left" aria-hidden="true" />
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link next" href='#carouselExampleFade4' role="button" data-bs-slide="next">
                        <span className="fa fa-chevron-right" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div>:''}
              </div>
            )}
          </div>
        </section>
        <div className="page-header-area">
          <div className="container">
            {/* <div className="shop-top-bar">
              <div className="select-price-range">
                <input
                  value={params.get('query') || ''}
                  onChange={handleSearch}
                  className="search form-control"
                  type="search"
                  name="search"
                  placeholder='Search on Products'
                />
              </div>

              <div className="select-on-sale d-none d-md-flex">
                <span>On Sale :</span>
                <select className="select-on-sale-form">
                  <option selected>Yes</option>
                  <option value="1">No</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
        <section className="page-header-area" data-bg-color="#FFF3DA" style={{ marginTop: '-50px' }}>
          <div className="container">
            <div className="page-header-st3-content mt-10">
              <h2 className="page-header-title text-capitalize">{location.state.categoryName}</h2>
            </div>
          </div>
        </section>
        <section className="section-space" style={{ marginTop: '-50px' }}>
          <div className="container">
            <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
              <>
                {products.length === 0 ? (
                  <Loading margin={100} height={200} fontSize={70} />
                ) : (
                  <>
                    {products.map((product) => (
                      <ProductComponent product={product} key={product._id} />
                    ))}
                  </>
                )}
                {/* <div className="col-12">
                  <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
                    <li className="page-item">
                      <a className="page-link previous" aria-label="Previous">
                        <span className="fa fa-chevron-left" aria-hidden="true" />
                      </a>
                    </li>
                    {paginationButtons}
                    <li className="page-item">
                      <a className="page-link next" aria-label="Next">
                        <span className="fa fa-chevron-right" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div> */}
              </>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
