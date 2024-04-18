import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading.jsx';
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import { Link } from 'react-router-dom';
import { ProductApiContext } from '../../Context/productApiContext.jsx';
import { useLocation } from 'react-router-dom/dist/index.js';

export default function Categories({ marginBottom, marginTop, page, latestNew }) {
  const [categories, setCategories] = useState([]);
  const { isCreatedThisMonth, selectRandomColor } = useContext(GlobalFunctionContext); // Access the context

  const location = useLocation();
  const getCategory = async () => {
    try {
      let url = latestNew ? `/catagories/${latestNew}?limit=6&page=${page}` : `/catagories/active?limit=6&page=${page}`;
      const { data } = await axios.get(url);
      if (data.message === "success") {
        setCategories(data.activeCatagories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [goTo, setGoTo] = useState('');
  useEffect(() => {
    getCategory();
    if (location.pathname === "/Products") {
      setGoTo('category');
    } else if (location.pathname.includes("/Products/category")) {
      setGoTo('/Products/category');
    } else {
      setGoTo('Products/category');
    }
  }, [location.pathname]);
  

  return (
    <>
      {/* Start Product Category Area Wrapper */}
      <section className="section-space" style={{ marginBottom: `-${marginBottom}px`, marginTop: `-${marginTop}px` }} >
        <div className="container">
          <div className="row g-3 g-sm-6">
            {categories.length === 0 ? (
              <Loading margin={100} height={200} fontSize={70} />
            ) :
              categories.map((category) => (
                <div className="col-6 col-lg-4 col-lg-2 col-xl-2 mt-xl-0 mt-sm-6 mt-4" key={category._id}>
                  {/* Start Product Category Item */}
                  <Link
                    to={`${goTo}/${category.slug}`
                    }
                    state={{ categoryId: category._id, categoryName: category.name }}
                    className="product-category-item"
                    style={{ backgroundColor: selectRandomColor() }}
                  >
                    <img className="icon" src={category.image.secure_url} width={80} height={80} alt="Image-HasTech" />
                    <h3 className="title text-capitalize">{category.name}</h3>
                    {/* Conditionally render content based on whether the category was created this month */}
                    {isCreatedThisMonth(category.createdAt) && (
                      <span className="flag-new bg-danger">new</span>
                    )}
                  </Link>
                  {/* End Product Category Item */}
                </div>
              ))}

          </div>
        </div>
      </section>
      {/* End Product Category Area Wrapper */}
    </>
  );
}
