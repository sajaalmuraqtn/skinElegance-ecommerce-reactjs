import React, { useContext, useEffect, useState } from 'react'
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function AdvertisementComponent({ advertisement }) {

    const { isCreatedThisMonth,selectRandomColor } = useContext(GlobalFunctionContext); // Access the context

    return (
        <div class="col-sm-6 col-lg-4 mb-8">
            {/*== Start Blog Item ==*/}
            <div className="post-item">
                <Link className="thumb " to={`/Advertisements/${advertisement.slug}`} state={{ advertisementId: advertisement._id }}>
                    <img src={advertisement.mainImage.secure_url} width={370} height={450} alt="Image-HasTech" />

                </Link>
                <div className="content">
                    <span className="post-category" style={{ backgroundColor: selectRandomColor(),cursor:'pointer' }}>{advertisement.city}</span>
                    <h4 className="title"><Link to={`/Advertisements/${advertisement.slug}`} state={{ advertisementId: advertisement._id,slug:advertisement.slug }} >{advertisement.name}</Link></h4>
                    <ul class="meta">
                        <li class="post-date fs-6">
                            <i class="fa-solid fa-phone fs-6" style={{ color: '#3ee302',marginRight:'5px' }}></i>
                            {advertisement.phoneNumber}
                        </li>
                    </ul>
                </div>
            </div>
            {/*== End Blog Item ==*/}
        </div>
    )
}

