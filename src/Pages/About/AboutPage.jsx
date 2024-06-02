import React from 'react'
import aboutImage from '../../assets/images/photos/about1.webp'
import aboutTitle from '../../assets/images/photos/aboutTitel.png'
import logo from '../../assets/about.png'
import { Helmet } from 'react-helmet'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SkinElegance|AboutUs</title>
      </Helmet>
      <main className="main-content">
        {/*== Start Page Header Area Wrapper ==*/}
        <section className="page-header-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-7 col-lg-7 col-xl-5">
                <div className="page-header-content">
                  <div className="title-img"><img src={aboutTitle} alt="Image" width={'300'} /></div>
                  <h2 className="page-header-title">We, are SkinElegance</h2>
                  <h4 className="page-header-sub-title">Best cosmetics provider</h4>
                  <p className="page-header-desc">Welcome to our innovative e-commerce platform in Palestine, your ultimate destination for all things skin care! Our mission is to provide a seamless and enriching shopping experience for skin care enthusiasts while bridging the gap between Users and trusted skin care centers. We aim to be more than just an online store; We are a comprehensive hub for high-quality products and reliable skin care services.</p>
                </div>
              </div>
              <div className="col-md-5 col-lg-5 col-xl-7">
                <div className="page-header-thumb">
                  <img src={aboutImage} width={570} height={669} alt="Image" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*== End Page Header Area Wrapper ==*/}

        {/*== Start Feature Area Wrapper ==*/}
        <div className="feature-area section-space mt-5">
          <div className="container">
            <h2 className="title">Commitment </h2>
            <p className="desc">We are committed to enhancing your skin care journey by providing a platform that not only offers high-quality products but also empowers you with information about the best skin care services. Our integrated approach ensures that you can make well-informed decisions for your skin health and beauty.

              Thank you for choosing us as your trusted skin care partner. We look forward to serving you with excellence and innovation.

              Welcome to the future of skin care shopping and services!</p>
          </div>
        </div>
        {/*== End Feature Area Wrapper ==*/}

        {/*== Start About Area Wrapper ==*/}
        <section className="section-space pt-0 mb-n1">
          <div className="container">
            <div className="about-thumb text-center" style={{ marginBottom: '-50px' }}>
              <img src={logo} alt="Image" />
            </div>
            <div className="about-content">
              <h2 className="title">Best Cosmetics Provider</h2>
              <p className="desc">We are a passionate team of skin care experts, technology enthusiasts, and customer service professionals dedicated to creating a one-stop platform that caters to all your skin care needs. Whether you are looking for premium skin care products or trustworthy skin care centers, we have meticulously designed our website to offer you the best options available.</p>
            </div>
          </div>
        </section>
        {/*== End About Area Wrapper ==*/}
      </main>
    </>
  )
}
