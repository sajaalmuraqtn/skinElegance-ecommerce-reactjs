import React, { useContext, useEffect, useState } from 'react';
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import Categories from '../../Components/Categories/categories.jsx';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Loading from '../../Components/Loading/Loading.jsx';
import { ProductApiContext } from '../../Context/productApiContext.jsx';
import ProductComponent from '../../Components/Product/product.component.jsx';

export default function Product() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageFromURL = queryParams.get('page');
    const [page, setPage] = useState(parseInt(pageFromURL) || 1);
    const [selectedProduct, setSelectedProduct] = useState(null); // State variable to track the selected product
    const { isCreatedThisMonth, selectRandomColor } = useContext(GlobalFunctionContext);
    const { getProducts, products, setProducts } = useContext(ProductApiContext);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    
    const [totalPages,setTotalPages]=useState(0);
    useEffect(() => {
        console.log(location);
        if (location.state) {
            console.log(location.state);
        }
        else {
            getProducts(page, 'allProducts/active').then(data => {
                if (data && data.total) {
                    const totalPages = Math.ceil(data.total / 9); // Assuming 9 products per page
                    setTotalPages(totalPages);
                } else {
                    console.error('Invalid response data:', data);
                }
            }).catch(error => {
                console.error('Error fetching products:', error);
            });
        }
    }, [page]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        // Update the URL with the new page number
        navigate(`?page=${pageNumber}`); // Use navigate instead of history.push
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
                <Categories marginBottom={100} marginTop={40} />
                {/*== End Product Category Area Wrapper ==*/}


                {/*== Start Page Header Area Wrapper ==*/}
                <section className="page-header-area " data-bg-color="#FFF3DA">
                    <div className="container">
                        <div className="page-header-st3-content mt-10 ">
                            <h2 className="page-header-title">All Products</h2>
                        </div>
                    </div>
                </section>
                {/*== End Page Header Area Wrapper ==*/}
                {/*== Start Product Area Wrapper ==*/}
                <section className="section-space">
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
                            <div className="col-12">
                                <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
                                    <li className="page-item">
                                        <a className="page-link previous" aria-label="Previous">
                                            <span className="fa fa-chevron-left" aria-hidden="true" />
                                        </a>
                                    </li>
                                    {paginationButtons}
                                    <li className="page-item">
                                        <a className="page-link next"  aria-label="Next">
                                            <span className="fa fa-chevron-right" aria-hidden="true" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
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
