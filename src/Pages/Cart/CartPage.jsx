import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/Auth.context.jsx';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext.jsx';
import NotFound from '../../Components/NotFound/NotFound.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function CartPage() {

    const { user } = useContext(AuthContext);
    const { getCart, cart, isEmpty,setIsEmpty } = useContext(CartContext);
    async function removeItem(productId) {
        try {
            const token = localStorage.getItem('userToken');
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
            const { data } = await axios.delete(`/cart/clearCart`, { headers: { authorization: `Saja__${token}` } });
            if (data.message == "success") {
                toast.success('Clear successfully!');
                getCart()
                setIsEmpty(true);
            }
        } catch (error) {
            toast.error('Error Clear');
        }
    }
    useEffect(() => {
        getCart();
        console.log("cart", cart);
    }, [])

    return (
        <>
            {/*== Start Product Area Wrapper ==*/}
            <section className="section-space">
                    {isEmpty ? <NotFound title={'You don`t Product in your Cart'} titlePage={'Products'} goTO={'/Products'} /> :
                <> <div className="container">
                     <div className='row mt-3 mb-5'>
                                <div className="col-md-1">
                                </div>
                                {/* onClick={() => clearFavoriteList()} */}
                                <button className='btn btn-danger'  style={{ width: '200px' }}>Clear</button>
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
                                                    <a className="remove" onClick={()=>removeItem(product.productId)}>×</a>
                                                </td>
                                                <td className="product-thumbnail">
                                                    <div className="thumb">
                                                        <Link to={`/Products/${product.productSlug}`} state={{ productId: product.productId }}>
                                                            <img src={product.mainImage.secure_url}  alt="Image-HasTech" />
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="product-name">
                                                <Link className="title text-capitalize fs-5" to={`/Products/${product.productSlug}`} state={{ productId: product.productId }}>{product.productName}</Link>
                                                </td>
                                                <td className="product-quantity">
                                                    <div className="pro-qty">
                                                        <input type="text" className="quantity" title="Quantity" defaultValue={1} />
                                                    </div>
                                                </td>
                                                <td className="product-subtotal">
                                                    <span className="price">₪{product.price}</span>
                                                </td>
                                                <td className="product-price">
                                                    <span className="price btn btn-info">Update</span>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                            </form>
                        </div>
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <div className="coupon-wrap">
                                        <h4 className="title">Coupon</h4>
                                        <p className="desc">Enter your coupon code if you have one.</p>
                                        <input type="text" className="form-control" placeholder="Coupon code" />
                                        <button type="button" className="btn-coupon">Apply coupon</button>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="cart-totals-wrap">
                                        <h2 className="title">Cart totals</h2>
                                        <table>
                                            <tbody>
                                                <tr className="cart-subtotal">
                                                    <th>Subtotal</th>
                                                    <td>
                                                        <span className="amount">₪{cart?cart.totalPrice :''}</span>
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
                                                        <span className="amount">₪{cart?cart.totalPrice + 30:''}</span>
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
