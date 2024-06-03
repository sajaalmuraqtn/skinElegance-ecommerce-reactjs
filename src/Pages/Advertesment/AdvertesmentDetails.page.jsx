import React, { useContext, useEffect, useState } from 'react'
import "../Profile/profile.css"
import Loading from '../../Components/Loading/Loading.jsx';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import { Helmet } from 'react-helmet';
export default function AdvertisementDetails() {
    const { isCreatedThisMonth } = useContext(GlobalFunctionContext); // Access the context
    const [advertisement, setAdvertisement] = useState(null);
    const location = useLocation();

    async function getAdvertisement() {
        try {
            const { data } = await axios.get(`/advertisement/${location.state.advertisementId}`);
            setAdvertisement(data.advertisement);
        } catch (error) {
        }
    }

    useEffect(() => {
        getAdvertisement();
    }, [])

    return (
        <> {/*== Start Product Details Area Wrapper ==*/}
            <Helmet>
                <meta charSet="utf-8" />
                <title>SkinElegance|Advertisements-{location.state.slug} </title>
            </Helmet>
            < section className="section-space" style={{ marginBottom: '-200px' }} >
                <div className="container">
                    {!advertisement ? (
                        <Loading margin={200} height={900} fontSize={70} />
                    ) : <>
                        <div className="row product-details">
                            <div className="col-lg-5">
                                <div className="product-details-thumb " >
                                    <img src={advertisement.mainImage.secure_url} width={440} height={503} alt="Image" />
                                    {isCreatedThisMonth(advertisement?.createdAt) && (<span className="flag-new" style={{ backgroundColor: 'red' }}>new</span>)}

                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="product-details-content">
                                    <h3 className="product-details-title text-capitalize">{advertisement.name}</h3>
                                    <p>{advertisement.description}</p>

                                    <div className="product-details-qty-list">
                                        <ul className="product-details-info-wrap">
                                            <li><span> City</span>
                                                <p>{advertisement.city}</p>
                                            </li>
                                            <li><span>Address</span>
                                                <p>{advertisement.address}</p>
                                            </li>

                                        </ul>

                                        <div className='social-Media'>
                                            <i class="fa-solid fa-phone fa-2xl" style={{ color: '#3ee302' }}></i>
                                            <span className='fs-4'> {advertisement?.phoneNumber}</span>
                                        </div>
                                        {advertisement?.facebookLink !== '-' ? <div className='social-Media'>
                                            <i class="fa-brands fa-facebook fa-2xl" style={{ color: '#007fe0' }}></i>
                                            <a href={advertisement?.facebookLink} className='fs-4'> {advertisement.slug}</a>
                                        </div> : ''}
                                        {advertisement?.instagramLink !== '-' ? <div className='social-Media'>
                                            <i class="fa-brands fa-instagram fa-2xl" style={{ color: '#f702aa' }}></i>
                                            <a href={advertisement?.instagramLink} className='fs-4'> {advertisement.slug}</a>
                                        </div> : ''}
                                    </div>
                                </div>
                            </div>

                        </div>
                        {advertisement.Services.length === 0 ?
                            ''
                            :
                            <div className="app-content" style={{ marginTop: '-40px' }} >
                                {
                                    <>        <div class="app-content-header">
                                        <h1 class="app-content-headerText">Services</h1>

                                    </div>
                                        <div className="shopping-cart-form table-responsive">
                                            <table className="table text-center">
                                                <thead>
                                                    <tr>
                                                        <th className="product-remove">&nbsp;</th>
                                                        <th className="product-name">Product</th>
                                                        <th className="product-subtotal">Price</th>
                                                        <th className="product-subtotal">Discount</th>
                                                        <th className="product-subtotal">Final Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {advertisement?.Services?.map((service) => (
                                                        <tr className="tbody-item" key={service.productId}>

                                                            <td className="product-thumbnail">
                                                                <div className="thumb">
                                                                    <Link to={`/Advertisements/${advertisement.slug}/${service.slug}`} state={{ serviceId: service._id, advertisementId: advertisement._id, slug: service.slug }}>
                                                                        <img src={service.mainImage.secure_url} alt="Image-HasTech" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                            <td className="product-name">
                                                                <Link to={`/Advertisements/${advertisement.slug}/${service.slug}`} state={{ serviceId: service._id, advertisementId: advertisement._id, slug: service.slug }} className='title text-capitalize'>{service?.name}</Link>
                                                            </td>

                                                            <td className="product-subtotal">
                                                                <span className="price">₪{service.price}</span>
                                                            </td>
                                                            <td className="product-subtotal">
                                                                <span className="price">%{service.discount}</span>
                                                            </td>
                                                            <td className="product-subtotal">
                                                                <span className="price">₪{service.finalPrice}</span>
                                                            </td>

                                                        </tr>))}
                                                </tbody>
                                            </table>
                                        </div>


                                    </>}
                                {/*== Pagination ==*/}
                            </div >
                        }
                    </>}
                </div>
            </section >
            {/*== End Product Details Area Wrapper ==*/}
            <>

            </>
        </>
    )
}
