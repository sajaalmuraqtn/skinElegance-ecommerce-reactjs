import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/Auth.context.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext.jsx';
import NotFound from '../../Components/NotFound/NotFound.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function CartPage({logo}) {

    const { user } = useContext(AuthContext);
    const { getCart, cart, isEmpty, setIsEmpty } = useContext(CartContext);
    const [statusError, setStatusError] = useState(null);
    const [productId, setProductId] = useState(null);
    let navigate = useNavigate()

    async function removeItem(productId) {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                return navigate("/Login");
            }
            let objData = { productId };
            const { data } = await axios.patch(`/cart/removeItem`, objData, { headers: { authorization: `Saja__${token}` } });
            if (data.message == "success") {
                toast.success('Remove successfully!');
                getCart()
            }
        } catch (error) {
            toast.error('Error Remove');
        }
    }

    async function clearCart() {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                // Handle case where token is not available
                // For example, redirect to login page
                return;
            }

            const config = {
                headers: { authorization: `Saja__${token}` }
            };

            const { data } = await axios.patch(`/cart/clearCart`, {}, config);

            if (data.message === "success") {
                toast.success('Cleared successfully!');
                getCart();
                setIsEmpty(true);
            }
        } catch (error) {
        }
    }
    const addToCart = async (productId, quantity) => {
        const token = localStorage.getItem('userToken');
        let objData = { productId, quantity };

        try {
            const response = await axios.post(`/cart`, objData, { headers: { authorization: `Saja__${token}` } });

            if (response.data && response.data.message === "success") {
                toast.success('Cart Updated successfully!');
                getCart();
            } else {
                console.error("Invalid response from server:", response);
            }
        } catch (error) {
            // Handle error
            console.error("Error adding to cart:", error);
            setStatusError(error.response.data.validationError[0].type);
            return setProductId(productId);
        }
    }


    const updateQuantity = async (productId) => {
        const newQuantity = document.getElementById(`quantity-${productId}`).value;
        console.log(productId);
        await addToCart(productId, newQuantity);
    };

    useEffect(() => {
        getCart();
    }, [])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>SkinElegance|Cart</title>
                <meta property="og:image" content={`${logo}`} />
            </Helmet>
            {/*== Start Product Area Wrapper ==*/}
            <section className="section-space">
                {isEmpty ? <NotFound title={'You don`t Product in your Cart'} titlePage={'Products'} goTO={'/Products'} /> :
                    <> <div className="container">
                        <div className='row mt-3 mb-5'>
                            <div className="col-md-1">
                            </div>
                            <button className='btn btn-danger' style={{ width: '200px' }} onClick={() => clearCart()}>Clear</button>
                            <div className="col-md-4">
                            </div>
                        </div>
                        <div className="shopping-cart-form table-responsive">
                            <form action="#" method="post">
                                <table className="table text-center">
                                    <thead>
                                        <tr>
                                            <th className="product-remove">&nbsp;</th>
                                            <th className="product-thumbnail">&nbsp;</th>
                                            <th className="product-name">Product</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-subtotal">Total</th>
                                            <th className="product-price"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart?.products?.map((product) => (
                                            <tr className="tbody-item" key={product.productId}>
                                                <td className="product-remove btn-danger">
                                                    <a className="remove" onClick={() => removeItem(product.productId)}>×</a>
                                                </td>
                                                <td className="product-thumbnail">
                                                    <div className="thumb">
                                                        <Link to={`/Products/${product.productSlug}`} state={{ productId: product.productId,slug:product.productSlug }}>
                                                            <img src={product.mainImage.secure_url} alt="Image-HasTech" />
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="product-name">
                                                    <Link className="title text-capitalize fs-5" to={`/Products/${product.productSlug}`} state={{ productId: product.productId ,slug:product.productSlug }}>{product.productName}</Link>
                                                </td>
                                                <td className="product-quantity">
                                                    <div className="pro-qty">
                                                        <input id={`quantity-${product.productId}`} type="text" className="quantity" title="Quantity" defaultValue={product.quantity} />
                                                        {statusError == 'number.positive' && productId == product.productId ? <p className="alert alert-danger mt-2">Negative Number!!</p> : ""
                                                        }
                                                    </div>
                                                </td>
                                                <td className="product-subtotal">
                                                    <span className="price">₪{product.price}</span>
                                                </td>
                                                <td className="product-price">
                                                    <a className="btn btn-info" onClick={() => updateQuantity(product.productId)}>Update</a>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-4">

                            </div>
                            <div className="col-12 col-lg-7">
                                <div className="cart-totals-wrap">
                                    <h2 className="title">Cart totals</h2>
                                    <table>
                                        <tbody>
                                            <tr className="cart-subtotal">
                                                <th>Subtotal</th>
                                                <td>
                                                    <span className="amount">₪{cart ? cart.totalPrice.toFixed(2) : ''}</span>
                                                </td>
                                            </tr>
                                            <tr className="shipping-totals">
                                                <th>Shipping</th>
                                                <td>

                                                    <p className="destination">Shipping to <strong>Cities of Palestine is ₪30</strong>.</p>
                                                    <a href="javascript:void(0)" className="btn-shipping-address"></a>
                                                </td>
                                            </tr>
                                            <tr className="order-total">
                                                <th>Total</th>
                                                <td>
                                                    <span className="amount">₪{cart ? (cart.totalPrice + 30).toFixed(2) : ''}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="text-end">
                                        <Link to={'/MakeOrder'} className="checkout-button">Make Order</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></>}
            </section>
            {/*== End Product Area Wrapper ==*/}
        </>
    )
}
