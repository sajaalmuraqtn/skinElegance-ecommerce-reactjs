import React from 'react'
import textThemeSlider from '../../assets/images/slider/text-theme.webp'
import { Link } from 'react-router-dom'
export default function ForgotPassword() {
  return (
    <>
      <section className="section-space" style={{height:'100vh'}}>
        <div className="container">
          <div className="row mb-n8" style={{marginTop:'50px'}}>
            {/* Start Skin Elegance Section */}
            <div className="col-lg-6 mb-8">
              <div className="hero-slide-content">
                <div className="hero-slide-text-img"><img src={textThemeSlider} width={427} height={232} alt="Image" /></div>
                <h2 className="hero-slide-title">Skin elegance</h2>
                <p className="hero-slide-desc">Redefining Beauty Through Care Products</p>
                <Link className="btn btn-border-dark" to="Products">BUY NOW</Link>
              </div>
            </div>
            {/* End Skin Elegance Section */}

            {/* Start Login Section */}
            <div className="col-lg-6 mb-8" style={{marginTop:'50px'}}>
              <div className="my-account-item-wrap">
                <h3 className="title">Forgot Password</h3>
                <div className="my-account-form">
                  <form action="#" method="post">
                    <div className="form-group mb-6">
                      <label htmlFor="login_username">Email Address <sup>*</sup></label>
                      <input type="email" id="login_username" />
                    </div>
                   
                    <div className="form-group d-flex align-items-center mb-14">
                      <a className="btn" href="my-account.html">Send Code</a>
                      
                    </div>
                          </form>
                </div>
              </div>
            </div>
            {/* End Login Section */}
          </div>

        </div>
      </section>

    </>
  )
}