import React, { useContext, useEffect, useState } from 'react';
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import Categories from '../../Components/Categories/categories.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading.jsx';
import { ProductApiContext } from '../../Context/productApiContext.jsx';
import ProductComponent from '../../Components/Product/product.component.jsx';
import NotFound from '../../Components/NotFound/NotFound.jsx';
import CategoryComponent from '../../Components/Categories/categoryComponent.jsx';
import axios from 'axios';

export default function ProductWithCategory() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageFromURL = queryParams.get('page');
    const [page, setPage] = useState(parseInt(pageFromURL) || 1);
    const { isCreatedThisMonth, selectRandomColor } = useContext(GlobalFunctionContext);
    const { getProducts, products, setProducts } = useContext(ProductApiContext);
    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(0);

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
          let url = `/catagories/active`;
          const { data } = await axios.get(url);
          if (data.message === "success") {
            setCategories(data.activeCatagories);
          }
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getCategory()
        if (location.state) {
            getProducts(page, `category/${location.state.categoryId}`)
                .then(data => {
                    const totalPages = Math.ceil(data.total / 9);
                    setTotalPages(totalPages);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [location, page]);


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
            <main className="main-content">
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

              <div className="col-12">
                <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
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
              </div>
            </div>
          )}
        </div>
      </section>              
        <section className="page-header-area" data-bg-color="#FFF3DA">
                    <div className="container">
                        <div className="page-header-st3-content mt-10">
                            <h2 className="page-header-title text-Capitalize">{location.state.categoryName}</h2>
                        </div>
                    </div>
                </section>
                <section className="section-space">
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
                                </div>
                            </>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
