import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup as a whole module
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import Loading from '../../Components/Loading/Loading.jsx';
import { ProductApiContext } from '../../Context/productApiContext.jsx';
import { CartContext } from '../../Context/CartContext.jsx';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import NotFound from '../../Components/NotFound/NotFound.jsx';

export default function ProductDetails() {

    const [product, setProduct] = useState(null);
    const { isCreatedThisMonth, selectRandomColor } = useContext(GlobalFunctionContext); // Access the context
    const { addToFavoriteList } = useContext(ProductApiContext);
    const { getCart } = useContext(CartContext);
    const [statusError, setStatusError] = useState(null);
    const [productId, setProductId] = useState(null);

    let location = useLocation()
    let navigate = useNavigate()

    const getProduct = async (productId) => {
        try {
            const { data } = await axios.get(`/products/${productId}`).catch((err) => {
                setStatusError(err.response.data.message);
            });
            if (data.message === "success") {
                setProduct(data.product);
            }
        } catch (error) {
         }
    };

    const addToCart = async (productId, quantity) => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            return navigate("/Login");
        }
        let objData = { productId, quantity };
        try {
            const response = await axios.post(`/cart`, objData, { headers: { authorization: `Saja__${token}` } });

            if (response.data && response.data.message === "success") {
                toast.success('Cart Updated successfully!');
                getCart();
            }  
        } catch (error) {
            // Handle error
             setStatusError(error.response.data.validationError[0].type);
            return setProductId(productId);
        }
    }

    const inputRef = useRef(null); // Create a ref for the input field

    const updateQuantity = async (productId) => {
        const newQuantity = inputRef.current.value; // Access the input field value using the ref
         await addToCart(productId, newQuantity);
    };
    // Define the validation schema using Yup
    const schema = Yup.object({
        comment: Yup.string().min(10, "Minimum characters is 10").max(100, "Maximum characters is 100").required("Comment is required"),
        rating: Yup.number().oneOf([1, 2, 3, 4, 5], "Invalid Rating").required("Rating is required"),
    });

    const formik = useFormik({
        initialValues: {
            comment: "",
            rating: ""
        },
        onSubmit: sendReviewData,
        validationSchema: schema
    });


    async function sendReviewData(values) {
        const token = localStorage.getItem('userToken');
        if (!token) {
            return navigate("/Login");
        }
        console.log(values);
        let { data } = await axios.post(`/products/${location.state.productId}/review/create`, values, { headers: { authorization: `Saja__${token}` } }).catch((err) => {
            setStatusError(err.response.data.message);
            if (statusError == "already review") {
                toast.error('Already Review');
            }
            else {
                toast.error('Can not add Review');
            }
        })
        if (data.message === "success") {
            toast.success('Review Made successfully!');
            getProduct(location.state.productId);
        } else {
        }
    }
    const addToFavorite = async (productId) => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            return navigate("/Login")
        }
        await addToFavoriteList(productId);
    }
    useEffect(() => {
        getProduct(location.state.productId);
    } , []);

    return (
        <> {/*== Start Product Details Area Wrapper ==*/}
            <Helmet>
                <meta charSet="utf-8" />
                <title>SkinElegance|Products-{location.state.slug}</title>
            </Helmet>
            < section className="section-space" >
                <div className="container">
                    {statusError?.includes('product not found') ? <NotFound title={'Product Not Found'} titlePage={'Products'} goTO={'/Products'} /> : <> {!product ? (
                        <Loading margin={100} height={500} fontSize={70} />
                    ) : <>
                        <div className="row product-details">
                            <div className="col-lg-6">
                                <div className="product-details-thumb">
                                    <img src={product.mainImage.secure_url} width={570} height={693} alt="Image" />
                                    {isCreatedThisMonth(product.createdAt) && (<span className="flag-new bg-danger">new</span>)}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product-details-content">
                                    <h5 className="product-details-collection text-capitalize">{product?.categoryName}</h5>
                                    <h3 className="product-details-title text-capitalize">{product.name}</h3>
                                    <div className="product-details-review">
                                        <div className="product-review-icon">
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-half-o" />
                                        </div>
                                        <button type="button" className="product-review-show">{product.reviews.length} reviews</button>
                                    </div>
                                    <div className="product-details-qty-list">
                                        <div className="qty-list-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="qtyList1" defaultChecked />
                                            <label className="form-check-label" htmlFor="qtyList1">{product.size=='OneSize'?product.size:`${product.size} ml bottol` } </label>
                                        </div>
                                    </div>
                                    <div className="product-details-pro-qty">
                                        <div className="pro-qty">
                                            <input ref={inputRef} id={`quantity-${product._id}`} type="text" className="quantity" title="Quantity" defaultValue={1} />
                                            {statusError === 'number.positive' && productId === product._id ? <p className="alert alert-danger mt-2">Negative Number!!</p> : ""}

                                        </div>
                                    </div>
                                    <div className="product-details-action">
                                        <h4 className="price text-decoration-line-through text-danger fs-3 ">₪{product.price.toFixed(2)}</h4>
                                        <h4 className="price fs-3" style={{ marginLeft: '10px' }}>₪{product.finalPrice.toFixed(2)}</h4>
                                        <div className="product-details-cart-wishlist">
                                            <button type="button" className="btn-wishlist" onClick={() => addToFavorite(product._id)}><i className="fa fa-heart-o" /></button>
                                            <button type="button" className="btn" onClick={() => updateQuantity(product._id)} >Add <i className="fas fa-cart-shopping"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginBottom: '-80px' }}>
                            <div className="col-lg-7">
                                <div className="nav product-details-nav" id="product-details-nav-tab" role="tablist">
                                    <button className="nav-link" id="specification-tab" data-bs-toggle="tab" data-bs-target="#specification" type="button" role="tab" aria-controls="specification" aria-selected="false">Specification</button>
                                    <button className="nav-link active" id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="true">Review</button>
                                </div>
                                <div className="tab-content" id="product-details-nav-tabContent">
                                    <div className="tab-pane" id="specification" role="tabpanel" aria-labelledby="specification-tab">
                                        <ul className="product-details-info-wrap">
                                            <li><span>Expired Date</span>
                                                <p> {product.expiredDate.split('T')[0]}</p>
                                            </li>
                                            <li><span>Description</span>
                                                <p>{product.description}</p>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="tab-pane fade show active" id="review" role="tabpanel" aria-labelledby="review-tab">
                                        {/*== Start Reviews Content Item ==*/}
                                        {
                                            product.reviews.length == 0 ?
                                                <h4>There is no review yet</h4> :
                                                product.reviews.map((review) => (

                                                    <div className="product-review-item" key={review._id}>
                                                        <div className="product-review-top">
                                                            <div className="product-review-thumb">
                                                                <img src={review.createdByUser.image.secure_url} width={90} alt="Images" />
                                                            </div>
                                                            <div className="product-review-content">
                                                                <span className="product-review-name fs-6">{review.createdByUser.userName}</span>
                                                                <div className="product-review-icon">
                                                                    {review.rating}
                                                                    {Array(review.rating).fill().map((_, index) => (
                                                                        <i key={index} className="fa fa-star" />
                                                                    ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="desc fs-4">{review.comment}</p>
                                                    </div>))}
                                        {/*== End Reviews Content Item ==*/}

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5" style={{ marginTop: "-50px" }}>
                                <div className="product-reviews-form-wrap">
                                    <h4 className="product-form-title">Leave a replay</h4>
                                    <div className="product-reviews-form">
                                        <form method='post' onSubmit={formik.handleSubmit}>
                                            <div className="form-input-item">
                                                <textarea className="form-control" name='comment' value={formik.values.comment} onChange={formik.handleChange} placeholder="Enter you feedback" defaultValue={""} />
                                                {formik.errors.comment ? <p className="alert alert-danger mt-2">{formik.errors.comment}</p> : ""}

                                            </div>
                                            <div className="form-input-item">
                                                <div className="form-ratings-item">
                                                    <select id="product-review-form-rating-select" name='rating' value={formik.values.rating} onChange={formik.handleChange} className="select-ratings">
                                                        <option>Rating</option>
                                                        <option value={1}>01</option>
                                                        <option value={2}>02</option>
                                                        <option value={3}>03</option>
                                                        <option value={4}>04</option>
                                                        <option value={5}>05</option>
                                                    </select>
                                                    <span className="title">Provide Your Ratings</span>
                                                    <div className="product-ratingsform-form-wrap">
                                                        <div className="product-ratingsform-form-icon">
                                                            <i className="fa fa-star-o" />
                                                            <i className="fa fa-star-o" />
                                                            <i className="fa fa-star-o" />
                                                            <i className="fa fa-star-o" />
                                                            <i className="fa fa-star-o" />
                                                        </div>

                                                    </div>
                                                </div>
                                                {formik.errors.rating ? <p className="alert alert-danger mt-2">{formik.errors.rating}</p> : ""}
                                                {statusError? <p className="alert alert-danger mt-2">{statusError}</p> : ""}
                                            </div>
                                            <div className="form-input-item mb-0">
                                                <button type="submit" className="btn" >add review</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div></>}</>

                    }
                </div>
            </section >
            {/*== End Product Details Area Wrapper ==*/}
        </>
    )
}
