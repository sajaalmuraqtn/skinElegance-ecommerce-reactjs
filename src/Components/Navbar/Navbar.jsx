import React from 'react'
import { Link } from 'react-router-dom'
 import './navbar.css';

export default function Navbar({logo,user,logout}) {
  
  return (
    <>
    {/*== Start Header Wrapper ==*/}
<header className="header-area sticky-header header-transparent">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-5 col-lg-2 col-xl-1">
        <div className="header-logo">
         <Link className="nav-link active " aria-current="page" to=""> <img className="logo-main" src={logo} width={95} height={68} alt="Logo" /></Link>
     </div>
      </div>
      <div className="col-lg-7 col-xl-7 d-none d-lg-block">
        <div className="header-navigation ps-7">
          <ul className="main-nav justify-content-start">
         
           <li><Link  aria-current="page" to="Products">Products</Link></li> 

            <li className="has-submenu position-static"><a href="product.html">shop</a>
              <ul className="submenu-nav-mega">
                <li><a href="#/" className="mega-title">Shop Layout</a>
                  <ul>
                    <li><a href="product.html">Shop 3 Column</a></li>
                    <li><a href="product-four-columns.html">Shop 4 Column</a></li>
                    <li><a href="product-left-sidebar.html">Shop Left Sidebar</a></li>
                    <li><a href="product-right-sidebar.html">Shop Right Sidebar</a></li>
                  </ul>
                </li>
                <li><a href="#/" className="mega-title">Single Product</a>
                  <ul>
                    <li><a href="product-details-normal.html">Single Product Normal</a></li>
                    <li><a href="product-details.html">Single Product Variable</a></li>
                    <li><a href="product-details-group.html">Single Product Group</a></li>
                    <li><a href="product-details-affiliate.html">Single Product Affiliate</a></li>
                  </ul>
                </li>
                <li><a href="#/" className="mega-title">Others Pages</a>
                  <ul>
                    <li><a href="product-cart.html">Shopping Cart</a></li>
                    <li><a href="product-checkout.html">Checkout</a></li>
                    <li><a href="product-wishlist.html">Wishlist</a></li>
                    <li><a href="product-compare.html">Compare</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="has-submenu"><a href="blog.html">Blog</a>
              <ul className="submenu-nav">
                <li className="has-submenu"><a href="#/">Blog Layout</a>
                  <ul className="submenu-nav">
                    <li><a href="blog.html">Blog Grid</a></li>
                    <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                    <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                  </ul>
                </li>
                <li><a href="blog-details.html">Blog Details</a></li>
              </ul>
            </li>
            <li className="has-submenu"><a href="account-login.html">Pages</a>
              <ul className="submenu-nav">
                <li><a href="account-login.html">My Account</a></li>
                <li><a href="faq.html">Frequently Questions</a></li>
                <li><a href="page-not-found.html">Page Not Found</a></li>
              </ul>
            </li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="col-7 col-lg-3 col-xl-4">
        <div className="header-action justify-content-end">
          <button className="header-action-btn ms-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#AsideOffcanvasSearch" aria-controls="AsideOffcanvasSearch">
            <span className="icon">
              <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect className="icon-rect" width={30} height={30} fill="url(#pattern1)" />
                <defs>
                  <pattern id="pattern1" patternContentUnits="objectBoundingBox" width={1} height={1}>
                    <use xlinkHref="#image0_504:11" transform="scale(0.0333333)" />
                  </pattern>
                  <image id="image0_504:11" width={30} height={30} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABiUlEQVRIie2Wu04CQRSGP0G2EUtIbHwA8B3EQisLIcorEInx8hbEZ9DKy6toDI1oAgalNFpDoYWuxZzJjoTbmSXERP7kZDbZ859vdmb27MJcf0gBUAaugRbQk2gBV3IvmDa0BLwA4Zh4BorTACaAU6fwPXAI5IAliTxwBDScvJp4vWWhH0BlTLEEsC+5Fu6lkgNdV/gKDnxHCw2I9rSiNQNV8baBlMZYJtpTn71KAg9SY3dUYn9xezLPgG8P8BdwLteq5X7CzDbnAbXKS42WxtQVUzoGeFlqdEclxXrnhmhhkqR+8KuMqzHA1vumAddl3IwB3pLxVmOyr1NjwKQmURJ4lBp7GmOAafghpg1qdSDeDrCoNReJWmZB4dsAPsW7rYVa1Rx4FbOEw5TEPKmFvgMZX3DCgYeYNniMaQ5piTXghGhPLdTmZ33hYNpem98f/UHRwSxvhqhXx4anMA3/EmhiOlJPJnSBOb3uQcpOE65VhujPpAms/Bu4u+x3swRbeB24mTV4LgB+AFuLedkPkcmmAAAAAElFTkSuQmCC" />
                </defs>
              </svg>
            </span>
          </button>
          <button className="header-action-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#AsideOffcanvasCart" aria-controls="AsideOffcanvasCart">
            <span className="icon">
              <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect className="icon-rect" width={30} height={30} fill="url(#pattern2)" />
                <defs>
                  <pattern id="pattern2" patternContentUnits="objectBoundingBox" width={1} height={1}>
                    <use xlinkHref="#image0_504:9" transform="scale(0.0333333)" />
                  </pattern>
                  <image id="image0_504:9" width={30} height={30} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABFUlEQVRIie2VMU7DMBSGvwAqawaYuAmKxCW4A1I5Qg4AA93KBbp1ZUVUlQJSVVbCDVhgzcTQdLEVx7WDQ2xLRfzSvzzb+d6zn2MYrkugBBYevuWsHKiFn2JBMwH8Bq6Aw1jgBwHOYwGlPgT4LDZ4I8BJDNiEppl034UEJ8DMAJ0DByHBACPgUYEugePQUKkUWAmnsaB/Ry/YO9aXCwlT72AdrqaWEohwBWxSwc8ReIVtYIr5bM5pXqO+Men7rozGlkVSv4lJj1WQfsbvXVkNVNk1eEK4ik9/yuwzAPhLh5iuU4jtftMDR4ZJJXChxTJ2H3zXGDgWc43/X2Wro8G81a8u2fXU2nXiLVAxvNIKuPGW/r/2SltF+a3Rkw4pmwAAAABJRU5ErkJggg==" />
                </defs>
              </svg>
            </span>
          </button>
          <a className="header-action-btn" href="account-login.html">
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
          </a>
          <button className="header-menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#AsideOffcanvasMenu" aria-controls="AsideOffcanvasMenu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
 
</>  )
}
