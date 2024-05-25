import React from 'react'
 import { Link, useLocation } from 'react-router-dom'
import './navbar.css';

export default function Navbar({ logo, user, LogOut }) {
 const location=useLocation();
   return (
    <>
      {/*== Start Header Wrapper ==*/}
      <header className="header-area sticky-header header-transparent">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-5 col-lg-2 col-xl-1">
              <div className="header-logo rounded-circle"> 
                <Link className="nav-link active " aria-current="page" to=""> <img className="logo-main rounded-circle" src={logo} width={95} height={68} alt="Logo" /></Link>
              </div>
            </div>

            <div className="col-lg-7 col-xl-7 d-none d-lg-block">
              <div className="header-navigation ps-7">
                <ul className="main-nav justify-content-start">
                  {user ? <> <li><Link aria-current="page" to="/Products" style={{color: location.pathname.includes('Products') ? '#46D7D4':''}} >Products <i className="fa-brands fa-shopify" style={{ marginLeft: "5px", color: '#46D7D4' }}></i>
                  </Link></li>
                    <li><Link aria-current="page" to="/MyOrders" style={{color: location.pathname.includes('/MyOrders') ? '#46D7D4':''}}>Orders<i className="fa-solid fa-truck" style={{ marginLeft: "5px", color: '#46D7D4' }}></i></Link></li>
                    <li> <Link aria-current="page" to="/FavoriteList" style={{color: location.pathname === '/FavoriteList' ? '#46D7D4':''}}>
                      Favorite
                      <i className="fas fa-solid fa-heart"  style={{ marginLeft: "5px", color: '#46D7D4' }}></i>
                    </Link></li>
                    <li> <Link aria-current="page" to="/Advertisements" style={{color: location.pathname.includes('/Advertisements') ? '#46D7D4':''}}>
                    Advertisements
                      <i className="fas fa-solid fa-icons"  style={{ marginLeft: "5px", color: '#46D7D4' }}></i>
                    </Link></li>
                  </> : ''}

                </ul>
              </div>
            </div>
            <div className="col-7 col-lg-3 col-xl-4">
              <div className="header-action justify-content-end">
                {user ? <>
                  <div className="header-action-btn-container">
                    <Link className="header-action-btn" to={'/Cart'}>
                      <i className="fas fa-cart-shopping" style={{color: location.pathname === '/Cart' ? '#46D7D4':'#000000', fontSize: '26px' }}></i>
                    </Link>

                  </div> <div className="header-action-btn-container">
                          <div className="header-logo">
                            <Link className="nav-link" style={{ display: 'flex', alignItems: 'center' }} aria-current="page" to="/Profile">
                              <img className="logo-main" src={user.image.secure_url} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} alt="Logo" />
                              <span className='text-capitalize' style={{color: location.pathname === '/Profile' ? '#46D7D4':'black' }}>{user.userName}</span>
                            </Link>
                          </div>
                        </div> 
                        <div className="header-action-btn-container">
                          <button className="header-action-btn" onClick={() => LogOut()}>
                            <i className="fa fa-arrow-right-from-bracket mb-3" style={{ color: '#000000', fontSize: '30px' }}></i>
                          </button>
                        </div>

                </> : <>

                  <div className="header-action-btn-container">
                    <Link className="header-action-btn" to={'/Login'} style={{color: location.pathname === '/Login' ? '#46D7D4':''}}>
                      <span className="icon">
                        <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <rect className="icon-rect" width={30} height={30} fill="url(#pattern3)" />
                          <defs>
                            <pattern id="pattern3" patternContentUnits="objectBoundingBox" width={1} height={1}>
                              <use xlinkHref="#image0_504:10" transform="scale(0.0333333)" />
                            </pattern>
                            <image id="image0_504:10" width={30} height={30} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABEUlEQVRIie3UMUoDYRDF8Z8psqUpLBRrBS+gx7ATD6E5iSjeQQ/gJUzEwmChnZZaKZiQ0ljsLkhQM5/5Agr74DX7DfOfgZ1Hoz+qAl30Marcx2H1thCtY4DJN76parKqmAH9DM+6eTcArX2QE3yVAO7lBA8TwMNIw6UgeJI46My+rWCjUQL0LVIUBd8lgEO1UfBZAvg8oXamCuWNRu64nRNMmUo/wReSXLXayoDoKc9miMvqW/ZNG2VRNLla2MYudrCFTvX2intlnl/gGu/zDraGYzyLZ/UTjrD6G2AHpxgnAKc9xgmWo9BNPM4BnPYDNiLg24zQ2oNpyFdZvRKZLlGhnvvKPzXXti/Yy7hEo3+iD9EHtgdqxQnwAAAAAElFTkSuQmCC" />
                          </defs>
                        </svg>
                      </span>
                      Login
                    </Link>
                  </div>
                  <div className="header-action-btn-container">
                    <Link className="header-action-btn t" to={'/Register'} style={{color: location.pathname === '/Register' ? '#46D7D4':''}}>
                      <span className="icon">
                        <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <rect className="icon-rect" width={30} height={30} fill="url(#pattern3)" />
                          <defs>
                            <pattern id="pattern3" patternContentUnits="objectBoundingBox" width={1} height={1}>
                              <use xlinkHref="#image0_504:10" transform="scale(0.0333333)" />
                            </pattern>
                            <image id="image0_504:10" width={30} height={30} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABEUlEQVRIie3UMUoDYRDF8Z8psqUpLBRrBS+gx7ATD6E5iSjeQQ/gJUzEwmChnZZaKZiQ0ljsLkhQM5/5Agr74DX7DfOfgZ1Hoz+qAl30Marcx2H1thCtY4DJN76parKqmAH9DM+6eTcArX2QE3yVAO7lBA8TwMNIw6UgeJI46My+rWCjUQL0LVIUBd8lgEO1UfBZAvg8oXamCuWNRu64nRNMmUo/wReSXLXayoDoKc9miMvqW/ZNG2VRNLla2MYudrCFTvX2intlnl/gGu/zDraGYzyLZ/UTjrD6G2AHpxgnAKc9xgmWo9BNPM4BnPYDNiLg24zQ2oNpyFdZvRKZLlGhnvvKPzXXti/Yy7hEo3+iD9EHtgdqxQnwAAAAAElFTkSuQmCC" />
                          </defs>
                        </svg>
                      </span>
                      Register
                    </Link>
                  </div></>}
                <button className="header-menu-btn d-block d-lg-none header-action-btn-container" type="button" data-bs-toggle="offcanvas" data-bs-target="#AsideOffcanvasMenu" aria-controls="AsideOffcanvasMenu">
                  <span />
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>

  )
}
