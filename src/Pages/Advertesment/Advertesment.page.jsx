import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Loading from '../../Components/Loading/Loading.jsx';
import axios from 'axios';
import AdvertisementComponent from '../../Components/Advertesment/advertesmentComponent.jsx';
import { Helmet } from 'react-helmet';

export default function Advertisements({logo}) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageFromURL = queryParams.get('page');
    const [page, setPage] = useState(parseInt(pageFromURL) || 1);


    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [advertisements, setAdvertisements] = useState([]);

    const getAdvertisements = async (page, urlAdvertisement) => {
        try {
            const separator = urlAdvertisement.includes('?') ? '&' : '?'; // to put the sort and other filters method
            const { data } = await axios.get(`/advertisement/${urlAdvertisement}${separator}page=${page}`);
            console.log(data);
            if (data.message === "success") {
                setAdvertisements(data.advertisements);
                console.log(advertisements);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        console.log(location);
        if (location.state) {
            console.log(location.state);
        }
        else {
            getAdvertisements(page, 'allAdvertisements/active').then(data => {
                if (data && data.total) {
                    const totalPages = Math.ceil(data.total / 9); // Assuming 9 products per page
                    setTotalPages(totalPages);
                } else {
                    console.error('Invalid response data:', data);
                }
            }).catch(error => {
                console.error('Error fetching products:', error);
            });
        }
    }, [page]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        // Update the URL with the new page number
        navigate(`?page=${pageNumber}`); // Use navigate instead of history.push
    };
    // Generate pagination buttons dynamically
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <li className="page-item" key={i}>
                <a className="page-link" onClick={() => handlePageChange(i)}>{i}</a>
            </li>
        );
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>SkinElegance|Advertisements</title>
                <meta property="og:image" content={`${logo}`} />
            </Helmet>
            <main className="main-content" style={{ marginBottom: '-50px' }}>

                {/*== End Product Category Area Wrapper ==*/}

                {/*== Start Page Header Area Wrapper ==*/}
                <section className="page-header-area pt-10" data-bg-color="#FFF3DA" style={{ marginBottom: `-100px` }}>
                    <div className="container">
                        <div className="page-header-st3-content pt-10">
                            <h2 className="page-header-title">All Advertisements</h2>
                            <p>Elevate your beauty ritual with our bespoke treatments, meticulously crafted to deliver exceptional results with every visit.</p>

                        </div>
                    </div>
                </section>
                {/*== End Page Header Area Wrapper ==*/}
                {/*== Start Product Area Wrapper ==*/}
                <section className="section-space mt-10">
                    <div className="container">
                        <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
                            {/*== Start Product Item ==*/}
                            {advertisements.length === 0 ? (
                                <Loading margin={100} height={500} fontSize={70} />
                            ) :
                                advertisements.map((advertisement) => (
                                    <AdvertisementComponent advertisement={advertisement} key={advertisement._id} />

                                ))}
                            {/*== End Product Item ==*/}
                            {advertisements.length > 9 ?
                                <div className="col-12">
                                    <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
                                        <li className="page-item">
                                            <a className="page-link previous" aria-label="Previous">
                                                <span className="fa fa-chevron-left" aria-hidden="true" />
                                            </a>
                                        </li>
                                        {paginationButtons}
                                        <li className="page-item">
                                            <a className="page-link next" aria-label="Next">
                                                <span className="fa fa-chevron-right" aria-hidden="true" />
                                            </a>
                                        </li>
                                    </ul>
                                </div> : ''}
                            {/*== Pagination ==*/}
                        </div>
                    </div>
                </section>
                {/*== End Product Area Wrapper ==*/}
            </main >
            {/*== Product Quick View Modal ==*/}

            {/*== End Product Quick View Modal ==*/}
        </>
    )
}
