import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/home.png';

 export default function Footer() {
  return (
    < >  {/*== Start Footer Area Wrapper ==*/}
<footer className="footer-area mt-5" >
  {/*== Start Footer Main ==*/}
  <div className="footer-main"  >
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-4 " style={{marginTop: '-50px',marginBottom: '-50px'}}>
          <div className="widget-item">
            <div className="widget-about">
              <Link className="widget-logo" to={''}>
                 <img  src={logo} width={250} alt="Logo" />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-5 mt-md-0 mt-9">
          <div className="widget-item">
            <h4 className="widget-title">Information</h4>
            <ul className="widget-nav">
              <li><Link to={'/About'}>About us</Link></li>
              <li><Link to={"/Contacts"}>Contact</Link></li>
              <li><Link to={"/Frequently"}>Questions</Link></li>
              <li><Link to={"/Privacy"}>Privacy</Link></li>
              <li><Link to={'/Products'}>Shop</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-lg-0 mt-6">
          <div className="widget-item">
            <h4 className="widget-title">Social Info</h4>
            <div className="widget-social">
              <a href="https://twitter.com/" target="_blank" rel="noopener"><i className="fa fa-twitter" /></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener"><i className="fa fa-facebook" /></a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener"><i className="fa fa-pinterest-p" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   
</footer>
 </ >
  )
}
