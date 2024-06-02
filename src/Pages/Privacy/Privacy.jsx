import React from 'react'
import { Helmet } from 'react-helmet'

export default function Privacy() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SkinElegance|Privacy</title>
      </Helmet>
      <main className="main-content">

        <section className="faq-area">
          <div className="container">
            <div className="row flex-xl-row-reverse">
              <div className="col-lg-4 col-xl-7">

              </div>
              <div className="col-lg-8 col-xl-5">
                <div className="faq-content">
                  <h2 className="faq-title">Privacy Policy </h2>
                  <div className="faq-line" />
                  <p className="faq-desc">Welcome to our Skin Elegance e-commerce platform dedicated to skin care products and services. We are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy outlines how we collect, use, disclose, and protect your information.</p>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: '-50px' }}>
              <div className="col-12">
                <div className="accordion" id="FaqAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading1">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                        Information We Collect
                      </button>
                    </h2>
                    <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="heading1" data-bs-parent="#FaqAccordion">
                      <div className="accordion-body">
                        <p>Personal Information: When you create an account, place an order, or interact with our services, we may collect personal information such as your name, email address, phone number, shipping address, and payment information.</p>
                        <p>Reviews and Ratings: When you leave a review or rating for a skin care center, we collect and store this information to display on our platform.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading2">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                        How We Use Your Information
                      </button>
                    </h2>
                    <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#FaqAccordion">
                      <div className="accordion-body">
                        <p>Order Processing: To process and fulfill your orders, including sending order confirmations, shipping notifications, and providing customer support.</p>
                        <p>Account Management: To create and manage your user account, including storing your favorite products and order history.</p>
                        <p>Improving Our Services: To understand how you use our website and improve our products, services, and user experience.</p>
                        <p>Marketing Communications: To send you promotional offers, newsletters, and updates about our products and services, provided you have opted in to receive such communications.</p>
                        <p>Skin Care Center Information: To display user reviews, ratings, and location data to help other users make informed decisions about skin care services.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading3">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                        How We Share Your Information
                      </button>
                    </h2>
                    <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#FaqAccordion">
                      <div className="accordion-body">
                        <p>Service Providers: We may share your information with third-party service providers who perform services on our behalf, such as payment processing, order fulfillment, and customer support.</p>
                        <p>Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>
                        <p>Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading4">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                        Security of Your Information
                      </button>
                    </h2>
                    <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#FaqAccordion">
                      <div className="accordion-body">
                        <p>We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure socket layer (SSL) technology, and regular security assessments.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading5">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                        Your Rights
                      </button>
                    </h2>
                    <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#FaqAccordion">
                      <div className="accordion-body">
                        <p>Access and Update: You have the right to access and update your personal information by logging into your account or contacting our customer support.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
        {/*== End Faq Area Wrapper ==*/}
      </main>
    </>
  )
}
