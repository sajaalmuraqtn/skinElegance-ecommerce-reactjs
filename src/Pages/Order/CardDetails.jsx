import React, {useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function CardDetails() {
  const [cardDetails, setCardDetails] = useState(null);
   let navigate = useNavigate();
  let location = useLocation()
  const getPaymentMethod = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        return navigate("/Login");
      }
      const { data } = await axios.get(`/PaymentMethod/getSpecificPaymentMethod/${location.state.cardId}`, { headers: { authorization: `Saja__${token}` } });
      if (data.message === "success") {
        setCardDetails(data.paymentMethod.cardDetails);
       }
    } catch (error) {
     }
  };

  const deletePaymentMethod = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        return navigate("/Login");
      }
      try { 
      const { data } = await axios.get(`/PaymentMethod/deletePaymentMethod/${location.state.cardId}`, { headers: { authorization: `Saja__${token}` } });
      if (data.message === "success") {
        toast.success('Card deleted successfully!');
        navigate("/Profile");
      }
    } catch (error) {
     }
  };
  const getOrder = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        return navigate("/Login");
      }
      const { data } = await axios.get(`/order/${location.state.orderId}`, { headers: { authorization: `Saja__${token}` } });
      console.log(data);
      if (data.message === "success") {
         setCardDetails(data.order.cardDetails);
       }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(location.state.cardId){
      getPaymentMethod();
    }
    else{
      getOrder()
    }
  }
    , []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SkinElegance|Card-Details</title>
      </Helmet>
      {/*== Start Product Area Wrapper ==*/}
      <section className=" section-space" >
        {!cardDetails ? <Loading margin={50} height={500} fontSize={70} /> :
          <> <div className="container  ">
            <div className="app-content-header">
              <h1 className="app-content-headerText">Card Details</h1>

            </div>
            <div className='row mt-3 mb-5'>
              <div className="col-md-1">
              </div>
              <div className="col-md-4">
              </div>
            </div>

            <div className="col-6 col-lg-7" >
              <div className="cart-totals-wrap">
                <h2 className="title">Card Details</h2>
                <table>
                  <tbody>
                    <tr className="shipping-totals">
                      <th> Holder Name</th>
                      <td>
                        <p className="destination"><strong>{cardDetails.cardholderName} </strong>.</p>
                      </td>
                    </tr>
                    <tr className="shipping-totals">
                      <th>cardType</th>
                      <td>
                        <p className="destination"><strong>{cardDetails?.cardType}  </strong>.</p>
                      </td>
                    </tr>

                    <tr className="shipping-totals">
                      <th>expiryDate</th>
                      <td>
                        <p className="destination"><strong>{cardDetails.expiryDate}</strong>.</p>
                      </td>
                    </tr>

                    <tr className="shipping-totals">
                      <th>cvc</th>
                      <td>
                        <p className="destination"><strong>{cardDetails.cvc}</strong>.</p>
                      </td>
                    </tr>
                    {
                     location.state.cardId? <button className="btn-danger px-3 py-1 m-3" onClick={()=>deletePaymentMethod()}>Delete Card</button>:''
                    }
                  </tbody>
                </table>

              </div>

            </div>
          </div>
          </>}

      </section>

      {/*== End Product Area Wrapper ==*/}
    </>
  )
}
