import React from 'react';
import textThemeSlider from '../../assets/home.png';
import slider1 from '../../assets/images/slider/slider1.webp';
import { Link } from 'react-router-dom';

export default function HomeContent() {
  return (
    <>
      {/*== Start Hero Area Wrapper ==*/}
      <section className="hero-slider-area">
        <div className="swiper hero-slider-container" style={{ height: '110vh' }}>
          <div className="swiper-wrapper">
            <div className="swiper-slide hero-slide-item">
              <div className="container" style={{ marginTop: '-600px' }}>
                <div className="row align-items-center position-relative">
                  <div className="col-12 col-md-6 position-absolute">
                    <div className="hero-slide-content">
                      <div className="hero-slide-text-img" style={{ marginTop: '360px' }}>
                        <img src={textThemeSlider} width={480} alt="Image" />
                      </div>
                      <div className="hero-slide-action" >
                        <Link className="btn btn-border-dark" to="Products">BUY NOW</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6" style={{backgroundColor:'#65edff'}}>
                    <div className="hero-slide-thumb">
                      <img src={slider1} width={841} height={832} alt="Image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*== Add Pagination ==*/}
        </div>
        <div className="hero-slide-social-media">
          <a href="https://www.pinterest.com/" target="_blank" rel="noopener"><i className="fa fa-pinterest-p" /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener"><i className="fa fa-twitter" /></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener"><i className="fa fa-facebook" /></a>
        </div>
      </section>
      {/*== End Hero Area Wrapper ==*/}
    </>
  );
}
