import React from 'react'

export default function Frequently() {
  return (
    <main className="main-content" style={{ marginBottom: '-50px' }}>
      {/*== Start Page Header Area Wrapper ==*/}

      {/*== Start Faq Area Wrapper ==*/}
      <section className="faq-area">
        <div className="container">
          <div className="row flex-xl-row-reverse">
            <div className="col-lg-6 col-xl-7">
              <div className="faq-thumb">
              </div>
            </div>
            <div className="col-lg-6 col-xl-5">
              <div className="faq-content">
                <h2 className="faq-title">Frequently Questions</h2>
                <div className="faq-line" />
                <p className="faq-desc">Welcome to our Frequently Asked Questions (FAQ) section! Here, you'll find answers to the most common inquiries about our platform, products, and services. </p>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: '-50px' }}>
            <div className="col-12">
              <div className="accordion" id="FaqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading1">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                      What is SkinElegance website about?

                    </button>
                  </h2>
                  <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="heading1" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Our website is a comprehensive platform dedicated to skin care products and services. We offer a wide range of high-quality skin care products and feature listings, reviews, and ratings for skin care centers to help you make informed decisions.</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                      How do I create an account?
                    </button>
                  </h2>
                  <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p> To create an account, click on the "Register" button in the top right corner of our Nav Bar. Fill in the required details, and you'll be all set to enjoy a personalized shopping experience.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                      How can I find specific products?
                    </button>
                  </h2>
                  <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>go to home page by click on logo at the nav bar then click on Buy Now button to go to products page then enter the on product name or keywords in Search bar in the top of the page. You can also use the filter options to narrow down your search based on categories.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading4">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                      What payment methods do you accept?
                    </button>
                  </h2>
                  <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>We accept a variety of payment methods, including major credit cards (Visa), Cash.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading10">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse10" aria-expanded="false" aria-controls="collapse8">
                      Where are the delivery locations and how much does it cost?
                    </button>
                  </h2>
                  <div id="collapse10" className="accordion-collapse collapse" aria-labelledby="heading10" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>We deliver to all areas of the West Bank in Palestine, and the delivery price is uniform for all areas, which is 30 shekels.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading5">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                      How do I track my order?
                    </button>
                  </h2>
                  <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Once your order is confirmed, you will receive contact numbers and email via email. You can also log in to your account and check the status of your order in the “Orders” section, then you can click on Details to know the order details, communication and information in detail.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading6">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                      How can I cancel my order?
                    </button>
                  </h2>
                  <div id="collapse6" className="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Once your order is placed, we will give you three days to cancel the order, after which your order will start shipping and you will not be able to cancel the order. When you cancel the order, you can recover the coupon you used to use it on other orders.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading7">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                      How can I use a coupon?
                    </button>
                  </h2>
                  <div id="collapse7" className="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>During the process of creating your order on the order creation page, you can choose the available coupon that you want. Note: You can use the coupon only once.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading8">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                      How can I find a skin care center?
                    </button>
                  </h2>
                  <div id="collapse8" className="accordion-collapse collapse" aria-labelledby="heading8" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Use our search bar on the Ads page, search by location, address or name to find the skin care centers you want. Each advertisement includes information about the services provided and contact information. Click on the ad title for details.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading9">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse8">
                      How can I make an advertisement for my skin care center?
                    </button>
                  </h2>
                  <div id="collapse9" className="accordion-collapse collapse" aria-labelledby="heading9" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Create an account if you do not have an account, or log in, then go to the contact page. Send an advertisement request, and the team will contact you to discuss the details, and obtain the center’s details and address.</p>
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
  )
}
