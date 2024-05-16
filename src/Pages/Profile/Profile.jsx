import React, { useContext, useEffect, useState } from 'react'
import "./profile.css"
import { AuthContext } from '../../Context/Auth.context.jsx';
import Loading from '../../Components/Loading/Loading.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Profile({logo}) {

  const { getProfile, user } = useContext(AuthContext);

  useEffect(() => {
    getProfile()
    console.log(user);
  }, [])
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SkinElegance|Profile</title>
        <meta property="og:image" content={`${logo}`} />
      </Helmet>
      <main className="main-content pt-10 pb-10 container" style={{ height: "100vh" }}>
        {!user ? <Loading fontSize={70} height={500} />
          :
          <div className="row" style={{ height: "100vh", marginTop: "100px" }}>
            {/* left column */}
            <div className="col-md-3 mt-2">
              <div className="text-center">
                <img src={user?.image?.secure_url} className="avatar img-circle img-thumbnail" alt="avatar" />
              </div>
              <span style={{ marginLeft: "50px", color: "black" }} className={user.status === "Active" ? "bg-success p-1 mt-5" : "bg-danger p-1 mt-5"}>{user.status}</span>
            </div>
            {/* edit form column */}
            <div className="col-lg-6">
              {/*== Start Register Area Wrapper ==*/}
              <div className="my-account-item-wrap">
                <h3 className="title">Personal Information</h3>
                <div className="my-account-form">
                  <form>
                    <div className="form-group mb-6">
                      <label htmlFor="register_username">User Name </label>
                      <input type="text" id="register_username" value={user.userName} name="userName" />
                    </div>

                    {user.address ? <div className="form-group mb-6">
                      <label htmlFor="register_address">Address </label>
                      <input type="text" id="register_address" value={user.address} name="address" />
                    </div> : ''}
                    {user.phoneNumber ? <div className="form-group mb-6">
                      <label htmlFor="register_phone">Phone Number </label>
                      <input type="text" id="register_phone" value={user.phoneNumber} name="phoneNumber" />
                    </div> : ''}

                  </form>
                </div>
              </div>
              {/*== End Register Area Wrapper ==*/}
            </div>
            <Link to={'/updateProfile'} className='btn btn-primary ' style={{ marginTop: '-90px', marginBottom: '-50px' }}> Update Profile</Link>
          </div>
        }
      </main>
    </>
  )
}
