import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/Auth.context.jsx';
import Loading from '../../Components/Loading/Loading.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NotFound from '../../Components/NotFound/NotFound.jsx';

export default function MyOrders() {
    const [myOrders, setMyOrders] = useState([]);
    const[isEmpty,setIsEmpty]=useState( false)
    const getMyOrders = async () => {
        try {
            const token = localStorage.getItem('userToken');
            let url = `/order/MyOrders`;
            const {data} = await axios.get(url, { headers: { authorization: `Saja__${token}` } });

            if (data.message == "success"&& data.orders.length== 0) {
                setIsEmpty(true)
            }
           else if (data.message === "success") {
                setMyOrders(data.orders);
             }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyOrders();
    }, [])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>SkinElegance|Orders</title>
            </Helmet>
            {/*== Start Product Area Wrapper ==*/}
            <section className="section-space" style={{ marginBottom: '-50px' }}>
    {isEmpty ? (
        <NotFound title={"You don`t have a Order list yet"} titlePage={"Cart"} goTO={"/Cart"} />
    ) : (
        myOrders.length === 0 ? (
            <Loading margin={50} height={500} fontSize={70} />
        ) : (
            <div className="container">
                <div className="shopping-wishlist-form table-responsive">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th className="product-name">Payment Type</th>
                                <th className="product-quantity">Coupon Name</th>
                                <th className="product-price">Created At</th>
                                <th className="product-price">Status</th>
                                <th className="product-subtotal">Shipping</th>
                                <th className="product-subtotal">Total</th>
                                <th className="product-remove">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders.map((order) => (
                                <tr className="tbody-item p-1" key={order._id}>
                                    <td className="product-name">
                                        <span className="text-capitalize">{order.paymentType}</span>
                                    </td>
                                    <td className="product-price">
                                        <span className="price">{order.couponName === "" ? ' -' : order.couponName}</span>
                                    </td>
                                    <td className="product-name">
                                        <div className="text-capitalize">
                                            {order.createdAt.split('T')[0]}
                                        </div>
                                        <div className="text-capitalize">
                                            {order.createdAt.split('T')[1]}
                                        </div>
                                    </td>
                                    <td className="product-name">
                                        <div className="text-capitalize">
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="product-subtotal">
                                        <span className="price">₪ 30</span>
                                    </td>
                                    <td className="product-subtotal">
                                        <span className="price">₪{order.finalPrice}</span>
                                    </td>
                                    <td className="product-price">
                                        <Link className="btn btn-info" state={{ orderId: order._id }} to={"OrderDetails"}>Details</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    )}
</section>

            {/*== End Product Area Wrapper ==*/}


        </>
    )
}
