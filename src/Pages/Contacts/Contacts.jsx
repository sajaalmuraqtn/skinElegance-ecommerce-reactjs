import React, { useState } from 'react';
import textThemeSlider from '../../assets/register_login.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup as a whole module
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function Contacts() {
    // Define the validation schema using Yup
    const schema = Yup.object({
        title: Yup.string()
            .oneOf(['Request an Advertisement', 'Support Team'], 'Invalid title')
            .required('Title is required'),
        message: Yup.string()
            .min(20, "Message can't be less than 20 characters")
            .max(150000, "Message can't be more than 150000 characters")
            .required('Message is required')
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            message: ""
        },
        onSubmit: sendContactData,
        validationSchema: schema
    });

    async function sendContactData(values) {
        const token = localStorage.getItem("userToken");
            const { data } = await axios.post('/ContactSupport/create', values, { headers: { authorization: `Saja__${token}` } });
            if (data.message === "success") {
                toast.success('Contact Send Successfully');
            } 
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>SkinElegance | Contacts</title>
            </Helmet>
            <main className="main-content">
                <section className="section-space">
                    <div className="container">
                        <div className="row mb-n8" style={{ marginTop: '70px' }}>
                            {/* Start Skin Elegance Section */}
                            <div className="col-12 col-md-6">
                                <div className="hero-slide-text-img" style={{ marginTop: '-20px' }}>
                                    <Link to="/"><img src={textThemeSlider} width={480} alt="Image" /></Link>
                                </div>
                            </div>
                            {/* End Skin Elegance Section */}

                            {/* Start Contact Section */}
                            <div className="col-lg-6 mb-8" style={{ marginTop: '-50px' }}>
                                <div className="section-title">
                                    <h2 className="title">Get in touch</h2>
                                    <p className="m-0">To request an advertisement, put in the title <span style={{ color: '#46D7D4' }}>“Support Team” </span>. If you want to write to the support team, write the phrase <span style={{ color: '#46D7D4' }}>“support team”</span> and then the name of the topic you want in the title.</p>
                                    <div className="faq-line" />
                                </div>
                                {/*== Start Contact Form ==*/}
                                <div className="contact-form">
                                    <form id="contact-form" onSubmit={formik.handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group"> 
                                                     <select id="order-city" name="title" value={formik.values.title} onChange={formik.handleChange} className="form-control wide">
                                                        <option>Select Title</option>
                                                        <option value={"Support Team"}>Support Team</option>
                                                        <option value={"Request an Advertisement"}>Request an Advertisement</option>
                                                    </select>
                                                    {formik.errors.title ? <p className="alert alert-danger mt-2">{formik.errors.title}</p> : ""}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control"
                                                        name="message"
                                                        placeholder="Message"
                                                        value={formik.values.message}
                                                        onChange={formik.handleChange}
                                                        rows={5}
                                                    />
                                                    {formik.errors.message ? <p className="alert alert-danger mt-2">{formik.errors.message}</p> : ""}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group mb-0">
                                                    <button className="btn btn-sm" type="submit">Send</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/*== End Contact Form ==*/}
                                {/*== Message Notification ==*/}
                                <div className="form-message" />
                            </div>
                            {/* End Contact Section */}
                        </div>
                    </div>
                </section>
                <div className="map-area">
                    <iframe className="w-100" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27194.552009099963!2d35.008594699999996!3d31.57029895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1678487798656!5m2!1sen!2s" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </main>
        </>
    );
}
