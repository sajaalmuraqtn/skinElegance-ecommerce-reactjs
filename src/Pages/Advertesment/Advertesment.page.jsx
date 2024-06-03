import React, {useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Loading from '../../Components/Loading/Loading.jsx';
import axios from 'axios';
import AdvertisementComponent from '../../Components/Advertesment/advertesmentComponent.jsx';
import { Helmet } from 'react-helmet';

export default function Advertisements() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageFromURL = queryParams.get('page');
    const [page, setPage] = useState(parseInt(pageFromURL) || 1);

    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [advertisements, setAdvertisements] = useState([]);
    const [params, setParams] = useSearchParams();

    const handleSearch = (e) => {
        const query = e.target.value;
        setPage(1); // Reset page to 1 when performing a new search
        setParams({ query }); // Update URL query parameters with the new search query
    };
    const getAdvertisements = async (page, urlAdvertisement) => {
        try {
            const separator = urlAdvertisement.includes('?') ? '&' : '?'; // to put the sort and other filters method
            const { data } = await axios.get(`/advertisement/${urlAdvertisement}${separator}page=${page}`);
             if (data.message === "success") {
                setAdvertisements(data.advertisements);
             }
        } catch (error) {
         }
    };

    const getSearchAdvertisements = async (page, urlAdvertisement, searchQuery) => {
        try {
            searchQuery = `search=${searchQuery}`;
            const separator = urlAdvertisement.includes('?') ? '&' : '?'; // to put the sort and other filters method
            const { data } = await axios.get(`/advertisement/${urlAdvertisement}${separator}page=${page}&${searchQuery}`);
             if (data.message === "success") {
                setAdvertisements(data.advertisements);
             }
        } catch (error) {
         }
    };

    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const searchQuery = params.get('query'); // Get the search query from URL parameters
        const itemsPerPage = 9; // Set number of items per page
        if (searchQuery) {
            getSearchAdvertisements(page, 'allAdvertisements/active', searchQuery).then(data => {
                if (data && data.total) {
                    const totalPages = Math.ceil(data.total / itemsPerPage);
                    setTotalPages(totalPages);
                } else {
                 }
            }).catch(error => {
             });
        }
        else {
            getAdvertisements(page, 'allAdvertisements/active').then(data => {
                if (data && data.total) {
                    const totalPages = Math.ceil(data.total / 9); // Assuming 9 products per page
                    setTotalPages(totalPages);
                } else {
                 }
            }).catch(error => {
             });
        }
    }, [page, params]);

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
            </Helmet>
            <main className="main-content" style={{ marginBottom: '-50px' }}>

                {/*== End Product Category Area Wrapper ==*/}

                {/*== Start Page Header Area Wrapper ==*/}
                <section className="page-header-area pt-10 mb-10" data-bg-color="#FFF3DA" style={{ marginBottom: `-100px` }}>
                    <div className="container">
                        <div className="page-header-st3-content pt-10">
                            <h2 className="page-header-title">All Advertisements</h2>
                            <p>Elevate your beauty ritual with our bespoke treatments, meticulously crafted to deliver exceptional results with every visit.</p>

                        </div>
                    </div>
                </section>
                {/*== End Page Header Area Wrapper ==*/}
                <div className="page-header-area " style={{ marginBottom: '-50px' }} >
                    <div className="container">
                        <div className="shop-top-bar">
                            <div className="select-price-range">
                                <input
                                    value={params.get('query') || ''}
                                    onChange={handleSearch}
                                    className="search form-control"
                                    type="search"
                                    name="search"
                                    placeholder='Search on Advertisements (title, description , city ,....)'
                                />
                            </div>

                            <div className="select-on-sale d-none d-md-flex">
                                <span>On Sale :</span>
                                <select className="select-on-sale-form">
                                    <option selected>Yes</option>
                                    <option value="1">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/*== Start Product Area Wrapper ==*/}
                <section className="section-space">
                    <div className="container">
                        <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
                            {/*== Start Product Item ==*/}
                            {(!params.get('query') && advertisements.length == 0) ? (
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
                <div className="map-area">
                    <iframe className="w-100" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27194.552009099963!2d35.008594699999996!3d31.57029895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1678487798656!5m2!1sen!2s" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </main >

            {/*== Product Quick View Modal ==*/}

            {/*== End Product Quick View Modal ==*/}
        </>
    )
}
