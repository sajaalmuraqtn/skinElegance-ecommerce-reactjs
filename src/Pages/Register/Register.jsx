import React from 'react'
import { Link } from 'react-router-dom'
import textThemeSlider from '../../assets/images/slider/text-theme.webp'
export default function Register() {
  return (
    <>
      {/*== Start Account Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="row mb-n8" style={{ marginTop: '50px' }}>
            {/* Start Skin Elegance Section */}
            <div className="col-lg-6 mb-8 position-fixed" style={{ zIndex: '999' }}>
              <div className="hero-slide-content">
                <div className="hero-slide-text-img"><img src={textThemeSlider} width={427} height={232} alt="Image" /></div>
                <h2 className="hero-slide-title">Skin elegance</h2>
                <p className="hero-slide-desc">Redefining Beauty Through Care Products</p>
                <Link className="btn btn-border-dark" to="Products">BUY NOW</Link>
              </div>
            </div>
            {/* End Skin Elegance Section */}

            <div className="col-lg-6 mb-8 offset-lg-6">
              {/*== Start Register Area Wrapper ==*/}
              <div className="my-account-item-wrap">
                <h3 className="title">Register</h3>
                <div className="my-account-form">
                  <form action="#" method="post">
                    <div className="form-group mb-6">
                      <label htmlFor="register_email">Email Address <sup>*</sup></label>
                      <input type="email" id="register_email" />
                    </div>
                    <div className="form-group mb-6">
                      <label htmlFor="register_username">User Name <sup>*</sup></label>
                      <input type="text" id="register_username" />
                    </div>
                    <div className="form-group mb-6">
                      <label htmlFor="register_password">Password <sup>*</sup></label>
                      <input type="password" id="register_password" />
                    </div>
                    <div className="form-group mb-6">
                      <label htmlFor="confirm_password">Confirm Password <sup>*</sup></label>
                      <input type="password" id="confirm_password" />
                    </div>
                    <div className="form-group mb-6">
                      <label htmlFor="register_address">Address <sup>*</sup></label>
                      <input type="text" id="register_address" />
                    </div>
                    <div className="form-group mb-6">
                      <label htmlFor="register_phone">Phone Number <sup>*</sup></label>
                      <input type="text" id="register_phone" />
                    </div>
                    <div className="form-group mb-6">
                      <label htmlFor="register_image">Image <sup>*</sup></label>
                      <input type="file" id="register_image" />
                    </div>
                    <div className="form-group">
                      <p className="desc mb-4">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
                      <button type="submit" className="btn">Register</button>
                    </div>
                    <Link className="lost-password text-capitalize" to={'/Login'}>Already have an account?</Link>
                  </form>
                </div>
              </div>
              {/*== End Register Area Wrapper ==*/}
            </div>
          </div>
        </div>
      </section>

      {/*== End Account Area Wrapper ==*/}



    </>
  )
}
