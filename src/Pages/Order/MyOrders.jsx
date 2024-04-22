import React, { useContext } from 'react'
import { AuthContext } from '../../Context/Auth.context.jsx';

export default function MyOrders() {
  const {user} = useContext(AuthContext);

  return (
    <>
    {/*== Start Product Area Wrapper ==*/}
    <section className="section-space">
        <div className="container">
            <div className="shopping-cart-form table-responsive">
                <form action="#" method="post">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th className="product-remove">&nbsp;</th>
                                <th className="product-thumbnail">&nbsp;</th>
                                <th className="product-name">Product</th>
                                <th className="product-quantity">Quantity</th>
                                <th className="product-price">Status</th>
                                <th className="product-subtotal">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tbody-item">
                                <td className="product-remove  btn-danger">
                                    <a className="remove" >X</a>
                                </td>
                                <td className="product-thumbnail">
                                    <div className="thumb">
                                        <a href="single-product.html">
                                            <img src="assets/images/shop/cart1.webp" width={68} height={84} alt="Image-HasTech" />
                                        </a>
                                    </div>
                                </td>
                                <td className="product-name"> 
                                    <a className="title" href="single-product.html">Condimentum posuere consectetur urna</a>
                                </td>
                                <td className="product-price">
                                    <span className="price">$115.00</span>
                                </td>
                                <td className="product-name">
                                    <div className="title">
                                      status
                                    </div>
                                </td>
                                <td className="product-subtotal">
                                    <span className="price">$115.00</span>
                                </td>
                            </tr>                                   
                        </tbody>
                    </table>
                </form>
            </div>
          
        </div>
    </section>
    {/*== End Product Area Wrapper ==*/}


</>
  )
}
