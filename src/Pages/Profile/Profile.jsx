import React, { useContext, useEffect, useState } from 'react'
import "./profile.css"
import { AuthContext } from '../../Context/Auth.context.jsx';
import Loading from '../../Components/Loading/Loading.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export default function Profile() {

  const {getProfile,user} = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
        return navigate("/Login")
    }
    getProfile()
  }, [])
  return (
    <><main className="main-content pt-10 pb-10 container" style={{ height: "100vh" }}>
      {!user ? <Loading height={500} fontSize={70} />
        :
        <div className="row" style={{ height: "100vh", marginTop: "100px" }}>
          {/* left column */}
          <div className="col-md-3 mt-2">
            <div className="text-center">
              <img src={user.image.secure_url} className="avatar img-circle img-thumbnail" alt="avatar" />
            </div>
            <span style={{ marginLeft: "50px", color: "black" }} className={user.status === "Active" ? "bg-success p-1 mt-5" : "bg-danger p-1 mt-5"}>{user.status}</span>
          </div>
          {/* edit form column */}
          <div className="col-md-7 personal-info" style={{ marginLeft: "10px" }}>

            <h1 style={{ marginBottom: "30px" }}>Personal info</h1>
            <div className="form-group mt-4 row">
              <h3 className="col-lg-3 text-danger ">Name:</h3>
              <h4 className="col-lg-5 mt-1 text-capitalize">{user.userName}</h4>
            </div>
            <div className="form-group mt-4 row">
              <h3 className="col-lg-5 text-danger">Phone Number:</h3>
              <h4 className="col-lg-3 mt-1 ">{user.phoneNumber}</h4>
            </div>
            <div className="form-group mt-4 row">
              <h3 className="col-lg-3 text-danger">Address:</h3>
              <h4 className="col-lg-7 mt-1 ">{user.address}</h4>
            </div>

          </div>
          <Link to={'/updateProfile'} className='btn btn-primary mb-10'> Update Profile</Link>
        </div>
      }
    </main>
    </>
  )
}
