import React from 'react'
import pagenotfound from '../../assets/images/photos/page-not-found.webp'

export default function NotFound() {
  return (
<section className="page-not-found-area pt-5">
  <div className="container">
    <div className="page-not-found">
      <img src={pagenotfound} width={400} height={300} alt="Image" />
      <h3 className="title">Opps! You Lost</h3>
      <h5 className="back-btn">Go to <a href="index.html">Home</a> Page</h5>
    </div>
  </div>
</section>
 )
}
