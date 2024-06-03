import React, { useContext, useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useLocation } from 'react-router-dom/dist/index.js';
import CategoryComponent from './categoryComponent.jsx';

export default function Categories({ marginBottom, marginTop, page, latestNew }) {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const [goTo, setGoTo] = useState('');

  useEffect(() => {
    if (location.pathname === "/Products") {
      setGoTo('category');
    } else if (location.pathname.includes("/Products/category")) {
      setGoTo('/Products/category');
    } else {
      setGoTo('Products/category');
    }
  }, [location.pathname]); // Update effect when location.pathname or CoucalId changes

  return (
    <>
      {/* Start Product Category Area Wrapper */}
      <section className="section-space" style={{ marginBottom: `-${marginBottom}px`, marginTop: `-${marginTop}px` }}>
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
      {/* End Product Category Area Wrapper */}
    </>
  );
}
