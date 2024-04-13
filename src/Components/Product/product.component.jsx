import React, { useContext } from 'react'
import { GlobalFunctionContext } from '../../Context/globalFunctionsContext.jsx';

export default function ProductComponent({product}) {

    const { isCreatedThisMonth, selectRandomColor } = useContext(GlobalFunctionContext); // Access the context


  return (
    <div className="col-6 col-lg-4 mb-4 mb-sm-8">
    <div className="product-item">
        <div className="product-thumb">
            <a className="d-block" href="product-details.html">
                <img src={product.mainImage.secure_url} width={370} height={450} alt="Image-HasTech" />
            </a>
            {isCreatedThisMonth(product.createdAt) && (
                <span className="flag-new bg-danger">new</span>
            )}
            <div className="product-action">
                <button type="button" className="product-action-btn action-btn-quick-view">
                    <i className="fa fa-expand" />
                </button>
                <button type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                    <span>Add to cart</span>
                </button>
                <button type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
                    <i className="fa fa-heart-o" />
                </button>
            </div>
        </div>
        <div className="product-info">
            <div className="product-rating">
                <div className="rating">
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-half-o" />
                </div>
                <div className="reviews">150 reviews</div>
            </div>
            <h4 className="title"><a href="product-details.html">{product.name}</a></h4>
            <div className="prices">
                <span className="price">${product.finalPrice}</span>
                <span className="price-old">{product.price}</span>
            </div>
        </div>
        <div className="product-action-bottom">
            <button type="button" className="product-action-btn action-btn-quick-view" >
                <i className="fa fa-expand" />
            </button>
            <button type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
                <i className="fa fa-heart-o" />
            </button>
            <button type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                <span>Add to cart</span>
            </button>
        </div>
    </div>
</div>
  )
}
