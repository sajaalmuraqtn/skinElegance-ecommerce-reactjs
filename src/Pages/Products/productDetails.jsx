import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import Loading from '../../Components/Loading/Loading.jsx';
import { ProductApiContext } from '../../Context/productApiContext.jsx';

export default function ProductDetails() {

    const [product, setProduct] = useState(null);
    const { isCreatedThisMonth, selectRandomColor } = useContext(GlobalFunctionContext); // Access the context
    const { addToFavoriteList } = useContext(ProductApiContext);

    let location = useLocation()

    const getProduct = async (productId) => {
        try {
            const { data } = await axios.get(`/products/${productId}`);
            console.log(data);
            if (data.message === "success") {
                setProduct(data.product);
                console.log(product);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProduct(location.state.productId);
    }
        , []);



    return (
        <> {/*== Start Product Details Area Wrapper ==*/}

            < section className="section-space" >
                <div className="container">
                    {!product ? (
                        <Loading margin={100} height={200} fontSize={70} />
                    ) : <>
                        <div className="row product-details">
                            <div className="col-lg-6">
                                <div className="product-details-thumb">
                                    <img src={product.mainImage.secure_url} width={570} height={693} alt="Image" />
                                    {isCreatedThisMonth(product.createdAt) && (<span className="flag-new">new</span>)}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product-details-content">
                                    <h5 className="product-details-collection">Premioum collection</h5>
                                    <h3 className="product-details-title">{product.name}</h3>
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
                                            <label className="form-check-label" htmlFor="qtyList1">15 ml bottol <b>$250.00</b></label>
                                        </div>
                                        <div className="qty-list-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="qtyList2" />
                                            <label className="form-check-label" htmlFor="qtyList2">25 ml bottol <b>$350.00</b> <span className="extra-offer">extra 25%</span></label>
                                        </div>
                                    </div>
                                    <div className="product-details-pro-qty">
                                        <div className="pro-qty">
                                            <input type="text" title="Quantity" defaultValue={1} />
                                        </div>
                                    </div>
                                    <div className="product-details-shipping-cost">
                                        <input className="form-check-input" type="checkbox" defaultValue id="ShippingCost" defaultChecked />
                                        <label className="form-check-label" htmlFor="ShippingCost">Shipping from USA, Shipping Fees $4.22</label>
                                    </div>
                                    <div className="product-details-action">
                                        <h4 className="price">$254.22</h4>
                                        <div className="product-details-cart-wishlist">
                                            <button type="button" className="btn-wishlist" onClick={() => addToFavoriteList(product._id)}><i className="fa fa-heart-o" /></button>
                                            <button type="button" className="btn" >Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="nav product-details-nav" id="product-details-nav-tab" role="tablist">
                                    <button className="nav-link" id="specification-tab" data-bs-toggle="tab" data-bs-target="#specification" type="button" role="tab" aria-controls="specification" aria-selected="false">Specification</button>
                                    <button className="nav-link active" id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="true">Review</button>
                                </div>
                                <div className="tab-content" id="product-details-nav-tabContent">
                                    <div className="tab-pane" id="specification" role="tabpanel" aria-labelledby="specification-tab">
                                        <ul className="product-details-info-wrap">
                                            <li><span>Weight</span>
                                                <p>250 g</p>
                                            </li>
                                            <li><span>Dimensions</span>
                                                <p>10 x 10 x 15 cm</p>
                                            </li>
                                            <li><span>Materials</span>
                                                <p>60% cotton, 40% polyester</p>
                                            </li>
                                            <li><span>Other Info</span>
                                                <p>American heirloom jean shorts pug seitan letterpress</p>
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit corporis quo voluptate culpa soluta, esse accusamus, sunt quia omnis amet temporibus sapiente harum quam itaque libero tempore. Ipsum, ducimus. lorem</p>
                                    </div>
                                    <div className="tab-pane fade show active" id="review" role="tabpanel" aria-labelledby="review-tab">
                                        {/*== Start Reviews Content Item ==*/}
                                        <div className="product-review-item">
                                            <div className="product-review-top">
                                                <div className="product-review-thumb">
                                                    <img src="assets/images/shop/product-details/comment1.webp" alt="Images" />
                                                </div>
                                                <div className="product-review-content">
                                                    <span className="product-review-name">Tomas Doe</span>
                                                    <span className="product-review-designation">Delveloper</span>
                                                    <div className="product-review-icon">
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-half-o" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="desc">{product.description}</p>
                                            <button type="button" className="review-reply"><i className="fa fa fa-undo" /></button>
                                        </div>
                                        {/*== End Reviews Content Item ==*/}
                                        {/*== Start Reviews Content Item ==*/}
                                        <div className="product-review-item product-review-reply">
                                            <div className="product-review-top">
                                                <div className="product-review-thumb">
                                                    <img src="assets/images/shop/product-details/comment2.webp" alt="Images" />
                                                </div>
                                                <div className="product-review-content">
                                                    <span className="product-review-name">Tomas Doe</span>
                                                    <span className="product-review-designation">Delveloper</span>
                                                    <div className="product-review-icon">
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-half-o" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra amet, sodales faucibus nibh. Vivamus amet potenti ultricies nunc gravida duis. Nascetur scelerisque massa sodales.</p>
                                            <button type="button" className="review-reply"><i className="fa fa fa-undo" /></button>
                                        </div>
                                        {/*== End Reviews Content Item ==*/}
                                        {/*== Start Reviews Content Item ==*/}
                                        <div className="product-review-item mb-0">
                                            <div className="product-review-top">
                                                <div className="product-review-thumb">
                                                    <img src="assets/images/shop/product-details/comment3.webp" alt="Images" />
                                                </div>
                                                <div className="product-review-content">
                                                    <span className="product-review-name">Tomas Doe</span>
                                                    <span className="product-review-designation">Delveloper</span>
                                                    <div className="product-review-icon">
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-half-o" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra amet, sodales faucibus nibh. Vivamus amet potenti ultricies nunc gravida duis. Nascetur scelerisque massa sodales.</p>
                                            <button type="button" className="review-reply"><i className="fa fa fa-undo" /></button>
                                        </div>
                                        {/*== End Reviews Content Item ==*/}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="product-reviews-form-wrap">
                                    <h4 className="product-form-title">Leave a replay</h4>
                                    <div className="product-reviews-form">
                                        <form action="#">
                                            <div className="form-input-item">
                                                <textarea className="form-control" placeholder="Enter you feedback" defaultValue={""} />
                                            </div>
                                            <div className="form-input-item">
                                                <input className="form-control" type="text" placeholder="Full Name" />
                                            </div>
                                            <div className="form-input-item">
                                                <input className="form-control" type="email" placeholder="Email Address" />
                                            </div>
                                            <div className="form-input-item">
                                                <div className="form-ratings-item">
                                                    <select id="product-review-form-rating-select" className="select-ratings">
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
                                                        <div id="product-review-form-rating" className="product-ratingsform-form-icon-fill">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="reviews-form-checkbox">
                                                    <input className="form-check-input" type="checkbox" defaultValue id="ReviewsFormCheckbox" defaultChecked />
                                                    <label className="form-check-label" htmlFor="ReviewsFormCheckbox">Provide ratings anonymously.</label>
                                                </div>
                                            </div>
                                            <div className="form-input-item mb-0">
                                                <button type="submit" className="btn">SUBMIT</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div></>}
                    </div>
            </section >
            {/*== End Product Details Area Wrapper ==*/}
        </>
    )
}
