import React, { useContext, useEffect, useState } from 'react'
import "./profile.css"
import { AuthContext } from '../../Context/Auth.context.jsx';
import Loading from '../../Components/Loading/Loading.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Profile() {

  const { getProfile, user } = useContext(AuthContext);
  const [PaymentMethods, setPaymentMethods] = useState([]);
  const getPaymentMethods = async () => {
    const token = localStorage.getItem('userToken');
    let url = `/PaymentMethod/getPaymentMethods`;
    const { data } = await axios.get(url, { headers: { authorization: `Saja__${token}` } });
    if (data.message === "success") {
      setPaymentMethods(data.PaymentMethods);
    }
  };
  useEffect(() => {
    getProfile()
    getPaymentMethods()
  }, [])
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SkinElegance|Profile</title>
      </Helmet>
      <main className="main-content pt-10 container"style={{height:PaymentMethods?.length==0?'100vh':'' }} >
        {!user ? <Loading fontSize={70} height={500} />
          :
          <>  <div className="row" style={{ height: "100vh", marginTop: "100px" }}>
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
            <Link to={'/updateProfile'} className='btn btn-primary ' style={{ marginTop: '-130px', marginBottom: '-50px',width:'26%' }}> Update Profile</Link>
          </div>

            {PaymentMethods?.length === 0 ?
              ''
              :
              <div className="app-content" style={{marginTop:'-170px',marginBottom:'-50px'}} >
                {
                  <>
                    <div className="app-content-header">
                      <h1 className="app-content-headerText fs-4">Payment Methods</h1>
                    </div>
                    <div className="shopping-cart-form table-responsive mt-5">
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <th className="product-name">card Number</th>
                            <th className="product-subtotal">Card Type</th>
                            <th className="product-subtotal">Expiry Date</th>
                            <th className="product-subtotal">createdAt</th>
                            <th className="product-remove">&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PaymentMethods?.map((payment) => (
                            <tr className="tbody-item" key={payment._id}>
                              <td className="product-subtotal">
                                <span className="price">{payment.cardDetails.cardNumber}</span>
                              </td>
                              <td className="product-subtotal">
                                <span className="price">{payment.cardDetails.cardType}</span>
                              </td>
                              <td className="product-subtotal">
                                <span className="price">{payment.cardDetails.expiryDate}</span>
                              </td>
                              <td className="product-subtotal">
                                <span className="price">{payment.createdAt.split('T')[0]}</span>
                              </td>
                              <td className="product-name">
                                <Link className='btn' to={'/Orders/CardDetails'} state={{ cardId: payment._id }}>Details</Link>
                              </td>
                            </tr>))
                          }
                        </tbody>
                      </table>
                    </div>


                  </>}
                {/*== Pagination ==*/}
              </div >}
          </>}
      </main >
    </>
  )
}
