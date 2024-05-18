import React, { useContext, useEffect, useState } from 'react'
import "../Profile/profile.css"
import Loading from '../../Components/Loading/Loading.jsx';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
export default function ServiceDetails({logo}) {
    const location = useLocation();
    let navigate = useNavigate();
    const { isCreatedThisMonth } = useContext(GlobalFunctionContext); // Access the context
    const [service, setService] = useState(null);
    const [advertisement, setAdvertisement] = useState(null);

    async function getAdvertisement() {
        const token = localStorage.getItem("adminToken");
        const { data } = await axios.get(`/advertisement/${location.state.advertisementId}`);
        setAdvertisement(data.advertisement);
    }

    async function getService() {
        const { data } = await axios.get(`/advertisement/${location.state.advertisementId}/services/${location.state.serviceId}`);
        setService(data.service);
    }


    useEffect(() => {
        getService();
        getAdvertisement();
    }, [])

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>SkinElegance|Services-Details</title>
            <meta property="og:image" content={`${logo}`} />
        </Helmet>
        < section className="section-space" style={{ marginBottom: '-200px' }}>
            <div className="container">
                {(!service && !advertisement) ? (
                    <Loading margin={60} height={550} fontSize={70} />
                ) : <>
                    <div className="row product-details">
                        <div className="col-lg-6">
                            <div className="product-details-thumb">
                                <img src={service?.mainImage.secure_url} width={570} height={693} alt="Image" />
                                {isCreatedThisMonth(service.createdAt) && (<span className="flag-new" style={{ backgroundColor: 'red' }}>new</span>)}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="product-details-content">
                                <h5 className="product-details-collection text-capitalize">{service?.advertisementName}</h5>
                                <h3 className="product-details-title text-capitalize">{service.name}</h3>
                                <p>{service.description}</p>


                                <div className="product-details-qty-list">
                                    <ul className="product-details-info-wrap">
                                        <li><span> Price</span>
                                            <div className="prices row ">
                                                <h4 className=" text-decoration-line-through text-danger fs-3 col-md-2">₪{service.price}</h4>
                                                <h4 className="price fs-3 col-md-2">₪{service.finalPrice}</h4>

                                            </div>
                                        </li>
                                        <li><span>City</span>
                                            <p>{advertisement?.city}</p>
                                        </li>
                                        <li><span>Address</span>
                                            <p>{advertisement?.address}</p>
                                        </li>

                                    </ul>
                                    <div className='social-Media'>
                                        <i class="fa-solid fa-phone fa-2xl" style={{ color: '#3ee302' }}></i>
                                        <span className='fs-4'> {advertisement?.phoneNumber}</span>
                                    </div>
                                    {advertisement?.facebookLink ? <div className='social-Media'>
                                        <i class="fa-brands fa-facebook fa-2xl" style={{ color: '#007fe0' }}></i>
                                        <a href={advertisement?.facebookLink} className='fs-4'> {advertisement.slug}</a>
                                    </div> : ''}
                                    {advertisement?.instagramLink ? <div className='social-Media'>
                                        <i class="fa-brands fa-instagram fa-2xl" style={{ color: '#f702aa' }}></i>
                                        <a href={advertisement?.instagramLink} className='fs-4'> {advertisement.slug}</a>
                                    </div> : ''}
                                </div>

                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </section ></>
    )
}
