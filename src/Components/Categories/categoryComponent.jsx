import React, { useContext, useEffect, useState } from 'react';
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/dist/index.js';

export default function CategoryComponent({category}) {
    const { isCreatedThisMonth, selectRandomColor } = useContext(GlobalFunctionContext);
    const location = useLocation();
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
            <div className="col-6 col-lg-4 col-lg-2 col-xl-2 mt-xl-0 mt-sm-6 mt-4" key={category._id}>
                {/* Start Product Category Item */}
                <Link
                    to={`${goTo}/${category.slug}`}
                    state={{ categoryId: category._id, categoryName: category.name }}
                    className="product-category-item"
                    style={{ backgroundColor: selectRandomColor() }}
                >
                    <img className="icon" src={category.image.secure_url} width={80} height={80} alt="Image-HasTech" />
                    <h3 className="title text-capitalize">{category.name}</h3>
                    {/* Conditionally render content based on whether the category was created this month */}
                    {isCreatedThisMonth(category.createdAt) && (
                        <span className="flag-new bg-danger mt-4">new</span>
                    )}
                </Link>
                {/* End Product Category Item */}
            </div>
        </>
    );
}
