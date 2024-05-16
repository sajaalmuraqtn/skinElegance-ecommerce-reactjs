import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading.jsx';
import ProductComponent from '../../Components/Product/product.component.jsx';
import CategoryComponent from '../../Components/Categories/categoryComponent.jsx';
import { ProductApiContext } from '../../Context/productApiContext.jsx';

export default function Product({ logo }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageFromURL = queryParams.get('page');
  const [page, setPage] = useState(parseInt(pageFromURL) || 1);
  const [categories, setCategories] = useState([]);
  const { getProducts, products } = useContext(ProductApiContext);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useSearchParams();

  const handleSearch = (e) => {
    const query = e.target.value;
    setPage(1); // Reset page to 1 when performing a new search
    setParams({ query }); // Update URL query parameters with the new search query
  }

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  useEffect(() => {
    getCategory();
    const searchQuery = params.get('query'); // Get the search query from URL parameters
    getProducts(page, 'allProducts/active', searchQuery).then(data => {
      if (data && data.total) {
        const totalPages = Math.ceil(data.total / 9); // Assuming 9 products per page
        setTotalPages(totalPages);
      } else {
        console.error('Invalid response data:', data);
      }
    }).catch(error => {
      console.error('Error fetching products:', error);
    });
  }, [page, params]);
  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };
  const getCategory = async () => {
    try {
      const { data } = await axios.get('/categories/active');
      if (data.message === "success") {
        setCategories(data.activeCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Generate pagination buttons dynamically
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
        <title>SkinElegance|Products</title>
        <meta property="og:image" content={`${logo}`} />
      </Helmet>
      <main className="main-content ">

        {/*== Start Product Category Area Wrapper ==*/}
        {/*== Start Page Header Area Wrapper ==*/}
        <section className="page-header-area pt-10" data-bg-color="#FFF3DA">
          <div className="container">
            <div className="page-header-st3-content mt-10">
              <h2 className="page-header-title mt-10">All Categories</h2>
            </div>
          </div>
        </section>
        {/*== End Page Header Area Wrapper ==*/}
        <section className="section-space" style={{ marginBottom: `-100px`, marginTop: `-40px` }}>
          <div className="container">
            {categories.length === 0 ? (
              <Loading margin={100} height={200} fontSize={70} />
            ) : (
              <div id='carouselExampleFade5' className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
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
                      <a className="page-link previous" href='#carouselExampleFade5' role="button" data-bs-slide="prev">
                        <span className="fa fa-chevron-left" aria-hidden="true" />
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link next" href='#carouselExampleFade5' role="button" data-bs-slide="next">
                        <span className="fa fa-chevron-right" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
        {/*== End Product Category Area Wrapper ==*/}
        <div class=" page-header-area ">
          <div class="container ">
            <div class="shop-top-bar"> 
              <div class="select-price-range">
                <input
                  value={params.get('query') || ''}
                  onChange={handleSearch}
                  className="search form-control"
                  type="search"
                  name="search"
                  placeholder='Search on Products'
                />
              </div>

              <div class="select-on-sale d-none d-md-flex">
                <span>On Sale :</span>
                <select class="select-on-sale-form">
                  <option selected>Yes</option>
                  <option value="1">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/*== Start Page Header Area Wrapper ==*/}
        <section className="page-header-area " data-bg-color="#FFF3DA" >
          <div className="container">
            <div className="page-header-st3-content mt-10 ">
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
              {products.length === 0 ? (
                <Loading margin={100} height={200} fontSize={70} />
              ) :
                products.map((product) => (
                  <ProductComponent product={product} key={product._id} />

                ))}
              {/*== End Product Item ==*/}
              {products.length > 9 ?
                <div className="col-12">
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
                </div> : ''}
              {/*== Pagination ==*/}
            </div>
          </div>
        </section>
        {/*== End Product Area Wrapper ==*/}
      </main >
      {/*== Product Quick View Modal ==*/}

      {/*== End Product Quick View Modal ==*/}
    </>
  )
}
