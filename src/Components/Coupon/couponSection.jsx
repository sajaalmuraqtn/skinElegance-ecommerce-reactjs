import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import axios from 'axios';
import CouponComponent from './coupon.component.jsx';

export default function CouponSection() {
    const [coupons, setCoupons] = useState([]);

    const getCoupons = async () => {
        try {
            let url = `/coupon/active`;
            const { data } = await axios.get(url);

            if (data.message === "success") {
                setCoupons(data.coupons);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCoupons();
    }, []);

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    return (
        <section className="section-space" style={{ marginTop: "-130px", marginBottom: "-50px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h2 className="title">Coupons</h2>
                            <p>Embark on a journey to luminous skin and effortless glamour with our thoughtfully curated beauty offerings</p>
                        </div>
                    </div>
                </div>
                    {coupons.length === 0 ? (
                        <Loading margin={100} height={200} fontSize={70} />
                    ) : (
                        <div id="carouselExampleFade2" className="carousel slide" data-bs-ride="carousel" data-bs-interval="10000">
                            <div className="carousel-inner">
                                {chunkArray(coupons, 3).map((chunk, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <div className="row mb-n9">
                                            {chunk.map((coupon, couponIndex) => (
                                                <CouponComponent key={couponIndex} coupon={coupon} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade2" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade2" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    )}
            </div>
        </section>
    );
}
