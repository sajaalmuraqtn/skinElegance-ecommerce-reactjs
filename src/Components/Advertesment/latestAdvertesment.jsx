import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import AdvertisementComponent from './advertesmentComponent.jsx';
import axios from 'axios';

export default function LatestNewAdvertisements() {
    const [advertisements, setAdvertisements] = useState([]);

    const getAdvertisements = async () => {
        try {
            const { data } = await axios.get(`/advertisement/allAdvertisements/active?limit=6&sort=-createdAt`);
            if (data.message === "success") {
                setAdvertisements(data.advertisements);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAdvertisements();
    }, []);

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array?.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    return (
        <section className="section-space" style={{ marginTop: "-170px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h2 className="title text-capitalize">Latest New Advertisements</h2>
                            <p>Embrace your beauty journey with confidence at our beauty center, where every service is crafted to empower </p>

                        </div>
                    </div>
                </div>
                {advertisements.length === 0 ? (
                    <Loading margin={100} height={200} fontSize={70} />
                ) : (
                    <div id='carouselExampleFade1' className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
                        <div className="carousel-inner">
                            {chunkArray(advertisements, 3).map((chunk, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                    <div class="row mb-n9">
                                        {chunk.map((advertisement) => (
                                            <AdvertisementComponent advertisement={advertisement} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-12">
                            <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
                                <li className="page-item">
                                    <a className="page-link previous" href='#carouselExampleFade1' role="button" data-bs-slide="prev">
                                        <span className="fa fa-chevron-left" aria-hidden="true" />
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link next" href='#carouselExampleFade1' role="button" data-bs-slide="next">
                                        <span className="fa fa-chevron-right" aria-hidden="true" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
