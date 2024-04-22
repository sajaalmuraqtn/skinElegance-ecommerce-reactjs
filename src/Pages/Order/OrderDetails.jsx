import React, { useContext } from 'react'
import { AuthContext } from '../../Context/Auth.context.jsx';

export default function OrderDetails() {
  const { user } = useContext(AuthContext);

  return (
    <> 
             {/*== Start Shopping Checkout Area Wrapper ==*/}
             <section className="shopping-checkout-wrap section-space">
                <div className="container">
     <div className="col-lg-6">
      {/*== Start Order Details Accordion ==*/}
      <div className="checkout-order-details-wrap">
        <div className="order-details-table-wrap table-responsive">
          <h2 className="title mb-25">Your order</h2>
          <table className="table">
            <thead>
              <tr>
                <th className="product-name">Product</th>
                <th className="product-total">Total</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="cart-item">
                <td className="product-name">Satin gown <span className="product-quantity">× 1</span></td>
                <td className="product-total">£69.99</td>
              </tr>
              <tr className="cart-item">
                <td className="product-name">Printed cotton t-shirt <span className="product-quantity">× 1</span></td>
                <td className="product-total">£20.00</td>
              </tr>
            </tbody>
            <tfoot className="table-foot">
              <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td>£89.99</td>
              </tr>
              <tr className="shipping">
                <th>Shipping</th>
                <td>Flat rate: £2.00</td>
              </tr>
              <tr className="order-total">
                <th>Total </th>
                <td>£91.99</td>
              </tr>
            </tfoot>
          </table>
          <div className="shop-payment-method">
            <div id="PaymentMethodAccordion">
              <div className="card">
                <div className="card-header" id="check_payments">
                  <h5 className="title" data-bs-toggle="collapse" data-bs-target="#itemOne" aria-controls="itemOne" aria-expanded="true">Direct bank transfer</h5>
                </div>
                <div id="itemOne" className="collapse show" aria-labelledby="check_payments" data-bs-parent="#PaymentMethodAccordion">
                  <div className="card-body">
                    <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="check_payments2">
                  <h5 className="title" data-bs-toggle="collapse" data-bs-target="#itemTwo" aria-controls="itemTwo" aria-expanded="false">Check payments</h5>
                </div>
                <div id="itemTwo" className="collapse" aria-labelledby="check_payments2" data-bs-parent="#PaymentMethodAccordion">
                  <div className="card-body">
                    <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="check_payments3">
                  <h5 className="title" data-bs-toggle="collapse" data-bs-target="#itemThree" aria-controls="itemTwo" aria-expanded="false">Cash on delivery</h5>
                </div>
                <div id="itemThree" className="collapse" aria-labelledby="check_payments3" data-bs-parent="#PaymentMethodAccordion">
                  <div className="card-body">
                    <p>Pay with cash upon delivery.</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="check_payments4">
                  <h5 className="title" data-bs-toggle="collapse" data-bs-target="#itemFour" aria-controls="itemTwo" aria-expanded="false">PayPal Express Checkout</h5>
                </div>
                <div id="itemFour" className="collapse" aria-labelledby="check_payments4" data-bs-parent="#PaymentMethodAccordion">
                  <div className="card-body">
                    <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="p-text">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#/">privacy policy.</a></p>
            <div className="agree-policy">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="privacy" className="custom-control-input visually-hidden" />
                <label htmlFor="privacy" className="custom-control-label">I have read and agree to the website terms and conditions <span className="required">*</span></label>
              </div>
            </div>
            <a href="account.html" className="btn-place-order">Place order</a>
          </div>
        </div>
      </div>
      {/*== End Order Details Accordion ==*/}
    </div></div></section>
    </>
  )
}
