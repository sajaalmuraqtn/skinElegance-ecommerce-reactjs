import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup as a whole module
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function AddPaymentMethod() {
    let [errors, setErrors] = useState([]);
    let [statusError, setStatusError] = useState('');
    let navigate = useNavigate();

    const schema = Yup.object({
        cardNumber: Yup.string().required("Card Number is required").length(16, "Card Number must be exactly 16 digits"),
        expiryDate: Yup.string().required("Expiry Date is required")
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
        cvc: Yup.string().required("CVC is required").matches(/^[0-9]{3,4}$/, "CVC must be 3 or 4 digits"),
        cardholderName: Yup.string().required("Cardholder Name is required").min(3, "Minimum characters is 3").max(50, "Maximum characters is 50")
    });

    const formik = useFormik({
        initialValues: {
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            cardholderName: ""
        },
        onSubmit: sendCardData,
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

    async function sendCardData(values) {
        const token = localStorage.getItem('userToken');
        try { 
        let { data } = await axios.post('/PaymentMethod/AddPayment', values, { headers: { authorization: `Saja__${token}` } }).catch((err) => {
            setStatusError(err.response.data.message);
            console.error(err.response.data.message);
        });

        if (data.message === "success") {
            toast.success('Payment Method Added Successfully!');
            setStatusError('');
            setErrors([]);
            navigate('/MakeOrder');
        } else {
            setErrors(data.validationError);
        }
    } catch (error) {
      }
    }

    useEffect(() => { }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>SkinElegance | Add Payment Method</title>
            </Helmet>
            <section className="shopping-checkout-wrap section-space" style={{marginBottom:'-50px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="checkout-billing-details-wrap">
                                <h2 className="title">Card Details</h2>
                                <div className="billing-form-wrap">
                                    <form method="post" onSubmit={formik.handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="cardNumber">Card Number <abbr className="required" title="required">*</abbr></label>
                                                    <input type="text" id="cardNumber" name="cardNumber" value={formik.values.cardNumber} onChange={formik.handleChange} className="form-control" />
                                                    {formik.errors.cardNumber ? <p className="alert alert-danger mt-2">{formik.errors.cardNumber}</p> : ""}
                                                    {(statusError && statusError.includes('Payment')) ? <p className="alert alert-danger mt-2">{statusError}</p> : ''}
                                              
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="expiryDate">Expiry Date <abbr className="required" title="required">*</abbr></label>
                                                    <input type="text" id="expiryDate" name="expiryDate" value={formik.values.expiryDate} onChange={formik.handleChange} className="form-control" placeholder="MM/YY" />
                                                    {formik.errors.expiryDate ? <p className="alert alert-danger mt-2">{formik.errors.expiryDate}</p> : ""}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="cvc">CVC <abbr className="required" title="required">*</abbr></label>
                                                    <input type="text" id="cvc" name="cvc" value={formik.values.cvc} onChange={formik.handleChange} className="form-control" />
                                                    {formik.errors.cvc ? <p className="alert alert-danger mt-2">{formik.errors.cvc}</p> : ""}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="cardholderName">Cardholder Name <abbr className="required" title="required">*</abbr></label>
                                                    <input type="text" id="cardholderName" name="cardholderName" value={formik.values.cardholderName} onChange={formik.handleChange} className="form-control" />
                                                    {formik.errors.cardholderName ? <p className="alert alert-danger mt-2">{formik.errors.cardholderName}</p> : ""}
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-5">
                                                <p className="desc mb-4">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#/">privacy policy.</a></p>
                                                <form method="post" onSubmit={formik.handleSubmit}>
                                                    {/* Your form inputs */}
                                                    <div className="agree-policy">
                                                        <div className='d-flex'>
                                                            <input type="checkbox" id="privacy" style={{ width: '15px', marginRight: '20px' }} />
                                                            <label htmlFor="privacy" className='mt-1'>
                                                                I have read and agree to the website terms and conditions <sup>*</sup>
                                                            </label>

                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-12">
                                                <button type="button" className="btn mt-5" onClick={handlePlaceOrder}>Add Card</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
