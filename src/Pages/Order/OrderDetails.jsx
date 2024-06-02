import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProductApiContext } from '../../Context/productApiContext.jsx';
import { Helmet } from 'react-helmet';

export default function OrderDetails() {
  const [products, setProducts] = useState(null);
  const [order, setOrder] = useState(null);
  const { addToFavoriteList } = useContext(ProductApiContext);

  let location = useLocation()
  let navigate = useNavigate()

  const getOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        return navigate("/Login");
      }
      const { data } = await axios.get(`/order/${orderId}`, { headers: { authorization: `Saja__${token}` } });
      console.log(data);
      if (data.message === "success") {
        setProducts(data.order.products);
        setOrder(data.order);
        console.log(order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder(location.state.orderId);
  }
    , []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SkinElegance|Orders-OrderDetails</title>
      </Helmet>
      {/*== Start Product Area Wrapper ==*/}
      <section className="section-space" style={{ marginBottom: '-60px' }}>
        {!order ? <Loading margin={50} height={500} fontSize={70} /> :
          <> <div className="container">
            <div className='row mt-3 mb-5'>
              <div className="col-md-1">
                <h4>Products</h4>
              </div>
              <div className="col-md-4">
              </div>
            </div>
            <div className="shopping-cart-form table-responsive">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="product-name">Product Name</th>
                    <th className="product-subtotal">Unit Price</th>
                    <th className="product-subtotal">Discount</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-subtotal">Total</th>
                    <th className="product-price"></th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr className="tbody-item" key={product.productId}>

                      <td className="product-name">
                        <Link className="title text-capitalize fs-5" to={`/Products/${product.slug}`} state={{ productId: product.productId, slug: product.slug }}>{product.name}</Link>
                      </td>
                      <td className="product-subtotal">
                        <span className="price">₪{product.unitPrice}</span>
                      </td>
                      <td className="product-subtotal">
                        <span className="price">%{product.discount}</span>
                      </td>
                      <td className="product-quantity">
                        <div className="pro-qty">
                          <span className="price">{product.quantity}</span>
                        </div>
                      </td>
                      <td className="product-subtotal">
                        <span className="price">₪{product.finalPrice}</span>
                      </td>
                      <td className="product-price">
                        <button className="btn btn-info" onClick={() => addToFavoriteList(product.productId)}>
                          <i className="fa fa-heart-o" />
                        </button>
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-12 col-lg-4">

              </div>
              <div className="col-12 col-lg-7">
                <div className="cart-totals-wrap">
                  <h2 className="title">Order Details</h2>
                  <table>
                    <tbody>
                      <tr className="shipping-totals">
                        <th>Name</th>
                        <td>
                          <p className="destination"><strong>{order.firstName} {order.lastName}</strong>.</p>
                        </td>
                      </tr>
                      <tr className="shipping-totals">
                        <th>City/Address</th>
                        <td>
                          <p className="destination"><strong>{order?.city} / {order.address}</strong>.</p>
                        </td>
                      </tr>


                      <tr className="shipping-totals">
                        <th>Status</th>
                        <td>
                          <p className="destination"><strong>{order.status}</strong>.</p>
                        </td>
                      </tr>
                      {order.status === "cancelled" ? <tr className="shipping-totals">
                        <th>Reason Canceled</th>
                        <td>
                          <p className="destination"><strong>{order.reasonRejected}</strong>.</p>
                        </td>
                      </tr> : ''}
                      <tr className="shipping-totals">
                        <th>Status</th>
                        <td>
                          <p className="destination"><strong>{order.status}</strong>.</p>
                        </td>
                      </tr>
                      <tr className="shipping-totals">
                        <th>Phone Number</th>
                        <td>
                          <p className="destination"><strong>{order.phoneNumber}</strong>.</p>
                        </td>
                      </tr>
                      <tr className="shipping-totals">
                        <th>Payment Type</th>
                        <td>{order.paymentType === 'cash' ?
                          <p className="destination text-capitalize"><strong>{order.paymentType}</strong>.</p> :
                          <p className="destination text-capitalize"><strong><Link to={'/Orders/CardDetails'} state={{ orderId: order._id}}>{order.paymentType}</Link></strong>.</p>
                        }
                        </td>
                      </tr>
                      <tr className="shipping-totals">
                        <th>Created Date</th>
                        <td>
                          <p className="destination"><strong>{order.createdAt.split('T')[0]}</strong>.</p>
                          <p className="destination"><strong>{order.createdAt.split('T')[1]}</strong>.</p>
                        </td>
                      </tr>
                      <tr className="cart-subtotal">
                        <th>Subtotal</th>
                        <td>
                          <span className="amount">₪{order ? order?.finalPrice?.toFixed(2) : ''}</span>
                        </td>
                      </tr>
                      <tr className="shipping-totals">
                        <th>Shipping</th>
                        <td>
                          <p className="destination">Shipping to <strong>Cities of Palestine is ₪30</strong>.</p>
                        </td>
                      </tr>
                      <tr className="order-total">
                        <th>Total</th>
                        <td>
                          <span className="amount">₪{order ? (order?.finalPrice + 30).toFixed(2) : ''}</span>
                        </td>
                      </tr>
                      {order.contact ? <tr className="order-total">
                        <th>Contact</th>
                        <td>
                          <span className="destination ">{order.contact.adminEmail}</span> /
                          <span className="destination ">{order.contact.adminPhoneNumber}</span>
                        </td>
                      </tr> : ''}

                    </tbody>
                  </table>
                  <div className="mt-5">
                    {
                      order.status === "pending" ? <>
                        <Link to={'/MyOrders/CancelOrder'} state={{ orderId: order._id }} className="btn-danger p-3 m-3">Cancel Order</Link>
                      </> : ''}
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
