import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup as a whole module
import axios from 'axios';
import { CartContext } from '../../Context/CartContext.jsx';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import NotFound from '../../Components/NotFound/NotFound.jsx';
import { AuthContext } from '../../Context/Auth.context.jsx';
import { Helmet } from 'react-helmet';

export default function MakeOrder({logo}) {
    let [errors, setErrors] = useState([]);
    let [statusError, setStatusError] = useState('');
    let navigate = useNavigate();
    const [coupons, setCoupons] = useState([]);
    const { getProfile, user } = useContext(AuthContext);
    const { getCart, cart, isEmpty, setIsEmpty } = useContext(CartContext);

    const getCoupons = async () => {
        try {
            let url = `/coupon/active`;
            const { data } = await axios.get(url);

            if (data.message === "success") {
                setCoupons(data.coupons);
                console.log(data.coupons); // Access the updated state directly here
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Define the validation schema using Yup
    const schema = Yup.object({
        firstName: Yup.string().required("First Name is required").min(3, "Minimum characters is 3").max(15, "Maximum characters is 30"),
        lastName: Yup.string().required("Last Name is required").min(3, "Minimum characters is 3").max(15, "Maximum characters is 30"),
        note: Yup.string().min(10, "Minimum characters is 10").max(100, "Maximum characters is 100"),
        city: Yup.string().oneOf(['Hebron', 'Nablus', 'Jerusalem', 'Ramallah', 'Tulkarm', 'Jenin', 'Al-Bireh', 'Jericho', 'Yatta', 'Beit Jala'], "Invalid city").required("City is required"),
        couponName: Yup.string().min(3, "Minimum characters is 3").max(30, "Maximum characters is 30"),
        address: Yup.string().min(10, "Minimum characters is 10").max(100, "Maximum characters is 100"),
        phoneNumber: Yup.string().length(10, "Phone number must be exactly 10 characters")
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            note: "",
            city: "",
            couponName: "",
            address: "",
            phoneNumber: ""
        },
        onSubmit: sendOrderData,
        validationSchema: schema
    });

    const handlePlaceOrder = () => {
        const privacyCheckbox = document.getElementById("privacy");
        if (privacyCheckbox.checked) {
            formik.handleSubmit();
        } else {
            toast.error('Please agree to the terms and conditions.');
        }
    };
    async function sendOrderData(values) {
        const token = localStorage.getItem('userToken');
        if (values.note === '') {
            values.note = '----------';
        }
        if (values.phoneNumber === '') {
            values.phoneNumber = user.phoneNumber;
        }
        if (values.address === '') {
            values.address = user.address;
        }
        // Make the request to the server
        let { data } = await axios.post('/order', values, { headers: { authorization: `Saja__${token}` } }).catch((err) => {
            setStatusError(err.response.data.message);
            console.error(err.response.data.message);
        })

        if (data.message === "success") {
            toast.success('Order Made successfully!');
            setStatusError('');
            setErrors([]);
            console.log(data);
        } else {
            setErrors(data.validationError);
        }

    }

    useEffect(() => {
        getCoupons();
        getCart();
        getProfile();

    }, [])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>SkinElegance|MakeOrder</title>
                <meta property="og:image" content={`${logo}`} />
            </Helmet>
            {/*== Start Shopping Checkout Area Wrapper ==*/}
            <section className="shopping-checkout-wrap section-space">
                <div className="container">
                    {isEmpty ? <NotFound title={'You don`t Product in your Cart'} titlePage={'Products'} goTO={'/Products'} /> : <div className="row">
                        <div className="col-lg-6">
                            {/*== Start Billing Accordion ==*/}
                            <div className="checkout-billing-details-wrap">
                                <h2 className="title">Billing details</h2>
                                <div className="billing-form-wrap">
                                    <form method="post" onSubmit={formik.handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="order-firstName">First name <abbr className="required" title="required">*</abbr></label>
                                                    <input type="text" id="order-firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} className="form-control" />
                                                    {formik.errors.firstName ? <p className="alert alert-danger mt-2">{formik.errors.firstName}</p> : ""}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="order-lastName">Last name <abbr className="required" title="required">*</abbr></label>
                                                    <input type="text" id="order-lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} className="form-control" />
                                                    {formik.errors.lastName ? <p className="alert alert-danger mt-2">{formik.errors.lastName}</p> : ""}
                                                </div>
                                            </div>

                                            <div className="col-md-12 mt-5">
                                                <div className="form-group">
                                                    <label htmlFor="order-city">Town / City <abbr className="required" title="required">*</abbr></label>
                                                    <select id="order-city" name="city" value={formik.values.city} onChange={formik.handleChange} className="form-control wide">
                                                        <option>Select City</option>
                                                        <option value={"Hebron"}>Hebron</option>
                                                        <option value={"Nablus"}>Nablus</option>
                                                        <option value={"Jerusalem"}>Jerusalem</option>
                                                        <option value={"Ramallah"}>Ramallah</option>
                                                        <option value={"Tulkarm"}>Tulkarm</option>
                                                        <option value={"Jenin"}>Jenin</option>
                                                        <option value={"Al-Bireh"}>Al-Bireh</option>
                                                        <option value={"Jericho"}>Jericho</option>
                                                        <option value={"Yatta"}>Yatta</option>
                                                        <option value={"Beit Jala"}>Beit Jala</option>
                                                    </select>
                                                    {formik.errors.city ? <p className="alert alert-danger mt-2">{formik.errors.city}</p> : ""}
                                                </div>
                                            </div>

                                            <div className="col-md-12 mt-5">
                                                <div className="form-group">
                                                    <label htmlFor="street-address">Street address (optional) <abbr className="required" title="required">*</abbr></label>
                                                    <input type="text" id="street-address" name="address" className="form-control" value={formik.values.address} onChange={formik.handleChange} placeholder="House number and street name" />
                                                    {formik.errors.address ? <p className="alert alert-danger mt-2">{formik.errors.address}</p> : ""}
                                                </div>
                                            </div>

                                            <div className="col-md-12 mt-5">
                                                <div className="form-group">
                                                    <label htmlFor="order-phone">Phone (optional)</label>
                                                    <input type="text" id="order-phone" name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} className="form-control" />
                                                    {formik.errors.phoneNumber ? <p className="alert alert-danger mt-2">{formik.errors.phoneNumber}</p> : ""}
                                                </div>
                                            </div>


                                            <div className="col-md-12 mt-5">
                                                <div className="form-group mb-0">
                                                    <label htmlFor="order-notes">Order notes (optional)</label>
                                                    <textarea id="order-notes" name="note" className="form-control" value={formik.values.note} onChange={formik.handleChange} placeholder="Notes about your order, e.g. special notes for delivery." />
                                                    {formik.errors.note ? <p className="alert alert-danger mt-2">{formik.errors.note}</p> : ""}
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-5">
                                                <div className="form-group">
                                                    <label htmlFor="order-couponName">Coupon <abbr className="required" title="required">*</abbr></label>

                                                    <select id="order-couponName" name="couponName" value={formik.values.couponName} onChange={formik.handleChange} className="form-control wide">
                                                        {coupons?.map((coupon) => (
                                                            <option key={coupon._id} value={coupon.name}>
                                                                {coupon.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {(statusError && statusError.includes('coupon')) ? <p className="alert alert-danger mt-2">{statusError}</p> : ''}

                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            {/*== End Billing Accordion ==*/}
                        </div>
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
                                            {cart?.products?.map((product) => (
                                                <tr className="cart-item" key={product._id}>
                                                    <td className="product-name text-capitalize">{product?.productName} <span className="product-quantity">× {product?.quantity}</span></td>
                                                    <td className="product-total">₪{product?.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="table-foot">
                                            <tr className="cart-subtotal">
                                                <th>Subtotal</th>
                                                <td>₪{cart?.totalPrice}</td>
                                            </tr>
                                            <tr className="shipping">
                                                <th>Shipping</th>
                                                <td>₪30.00</td>
                                            </tr>
                                            <tr className="order-total">
                                                <th>Total </th>
                                                <td>₪{cart?.totalPrice + 30}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div className="shop-payment-method">
                                        <div id="PaymentMethodAccordion">
                                            <div className="card">
                                                <div id="itemOne" className="collapse show" aria-labelledby="check_payments" data-bs-parent="#PaymentMethodAccordion">
                                                    <div className="card-body">
                                                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div id="itemTwo" className="collapse" aria-labelledby="check_payments2" data-bs-parent="#PaymentMethodAccordion">
                                                    <div className="card-body">
                                                        <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div id="itemThree" className="collapse" aria-labelledby="check_payments3" data-bs-parent="#PaymentMethodAccordion">
                                                    <div className="card-body">
                                                        <p>Pay with cash upon delivery.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="p-text">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#/">privacy policy.</a></p>
                                        <form method="post" onSubmit={formik.handleSubmit}>
                                            {/* Your form inputs */}
                                            <div className="agree-policy">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" id="privacy" className="custom-control-input visually-hidden" />
                                                    <label htmlFor="privacy" className="custom-control-label">
                                                        I have read and agree to the website terms and conditions <span className="required">*</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </form>

                                        <button type='submit' className="btn mt-5" onClick={handlePlaceOrder}>Place order</button>
                                    </div>
                                </div>
                            </div>
                            {/*== End Order Details Accordion ==*/}
                        </div>

                    </div>}
                </div>
            </section>
            {/*== End Shopping Checkout Area Wrapper ==*/}
        </>
    )
}
