import React, { useContext, useEffect, useState } from 'react'
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { ProductApiContext } from '../../Context/productApiContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from '../../Context/CartContext.jsx';

export default function ProductComponent({ product }) {

    const { isCreatedThisMonth } = useContext(GlobalFunctionContext); // Access the context
    const { addToFavoriteList } = useContext(ProductApiContext);
    const { getCart, cart } = useContext(CartContext);
    let [statusError, setStatusError] = useState();
    let navigate = useNavigate()
    const addToCart = async (productId) => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            navigate("/Login")
        }
        else {
            await getCart()
            let match = false;
            if (cart) {
                for (let index = 0; index < cart.products.length; index++) {
                    if (cart.products[index].productId === productId) {
                        match = true;
                        toast.error('Product Already Exist');
                    }
                    break;
                }
            }
            if (!cart || !match) {
                let objData = { productId };
             try{ 
                  const { data } = await axios.post(`/cart`, objData, { headers: { authorization: `Saja__${token}` } });
                if (data.message == "success") {
                    toast.success('Product added successfully!');
                    await getCart()
                }
            } catch (error) {
            }
            }
        }
    }
    const addToFavorite = async (productId) => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            return navigate("/Login")
        }
        await addToFavoriteList(productId);
    }
    return (
        <div className="col-6 col-lg-4 mb-4 mb-sm-8">
            <div className="product-item">
                <div className="product-thumb">
                    <Link className="d-block" to={`/Products/${product.slug}`} state={{ productId: product._id,slug:product.slug }}>
                        <img className="product-image" src={product.mainImage.secure_url} width={370} height={450} alt="Image-HasTech" />
                    </Link>
                    {isCreatedThisMonth(product.createdAt) && (
                        <span className="flag-new bg-danger">new</span>
                    )}
                    <div className="product-action">

                        <Link className="product-action-btn action-btn-quick-view" to={`/Products/${product.slug}`} state={{ productId: product._id }}>
                            <i className="fa fa-expand" style={{ marginLeft: "15px" }} />
                        </Link>
                        <button type="button" className="product-action-btn action-btn-cart" onClick={() => addToCart(product._id)}>
                            <span>Add to cart</span>
                        </button>
                        <button type="button" className="product-action-btn action-btn-wishlist" onClick={() => addToFavorite(product._id)}>
                            <i className="fa fa-heart-o" />
                        </button>
                    </div>
                </div>
                <div className="product-info">
                    <div className="product-rating">
                        <div className="rating">
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-half-o" />
                        </div>
                        <div class="reviews">{product.reviews?.length} reviews</div>

                    </div>
                    <h4 className="title text-capitalize"><Link to={`/Products/${product.slug}`} state={{ productId: product._id,slug:product.slug }} >{product?.name.split(' ').slice(0,4).join(' ')}</Link></h4>
                    <div className="prices">
                        <span className="price"> ₪{product.finalPrice}</span>
                        <span className="price-old text-danger fs-6">{product.price}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

