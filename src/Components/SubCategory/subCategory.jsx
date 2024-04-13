import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading.jsx';
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  let { isCreatedThisMonth,selectRandomColor } = useContext(GlobalFunctionContext); // Access the context

  const getCategory = async () => {
    try {
      const { data } = await axios.get('/catagories/active');
      console.log(data);
      if (data.message === "success") {
        setCategories(data.activeCatagories);
        console.log(categories);
      }
    } catch (error) {
      console.log(error);
    }
    for (let index = 0; index < 5; index++) {
      console.log(selectRandomColor());;
      
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {/* Start Product Category Area Wrapper */}
      <section className="section-space" style={{ marginBottom: '-80px' }} >
        <div className="container">
          <div className="row g-3 g-sm-6">
            {categories.length === 0 ? (
              <Loading margin={100} height={200} fontSize={} />
            ) : 

    categories.map((category) => {
                return <div className="col-6 col-lg-4 col-lg-2 col-xl-2 mt-xl-0 mt-sm-6 mt-4" key={category._id}>
                  {/* Start Product Category Item */}
                  <a href="product.html" className="product-category-item" style={{backgroundColor:selectRandomColor()}}>
                    <img className="icon" src={category.image.secure_url} width={80} height={80} alt="Image-HasTech" />
                    <h3 className="title text-capitalize">{category.name}</h3>
                    {/* Conditionally render content based on whether the category was created this month */}
                    {isCreatedThisMonth(category.createdAt) && (
                      <span className="flag-new bg-danger">new</span>
                    )}
                  </a>
                  {/* End Product Category Item */}
                </div>}
              )
          }
          </div>
        </div>
      </section>
      {/* End Product Category Area Wrapper */}
    </>
  );
}
