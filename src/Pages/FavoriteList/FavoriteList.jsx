import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/Auth.context.jsx';
import axios from 'axios';
import NotFound from '../../Components/NotFound/NotFound.jsx';
import { ProductApiContext } from '../../Context/productApiContext.jsx';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext.jsx';
import { Helmet } from 'react-helmet';
import Loading from '../../Components/Loading/Loading.jsx';

export default function FavoriteList() {
    const { user } = useContext(AuthContext);
    const { isEmpty, favoriteList, getFavoriteList } = useContext(ProductApiContext)
    const { getCart, cart } = useContext(CartContext);
    let navigate = useNavigate()

    async function clearFavoriteList() {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                return navigate("/Login");
            }
            const { data } = await axios.delete(`/Favorite/clearFavorite`, { headers: { authorization: `Saja__${token}` } });
            if (data.message == "success") {
                toast.success('Clear successfully!');
                getFavoriteList()
            }
        } catch (error) {
            toast.error('Error Clear');
        }
    }
    async function removeItem(productId) {
        try {
            const token = localStorage.getItem('userToken');
            let objData = { productId };
            const { data } = await axios.patch(`/Favorite/removeItem`, objData, { headers: { authorization: `Saja__${token}` } });
            if (data.message == "success") {
                toast.success('Remove successfully!');
                getFavoriteList()
            }
        } catch (error) {
            toast.error('Error Remove');
        }
    }

    const addToCart = async (productId) => {
        await getCart()
        const token = localStorage.getItem('userToken');
        let match = false;
        if (cart) {
            for (let index = 0; index < cart.products.length; index++) {
                if (cart.products[index].productId === productId) {
                    match = true;
                    toast.error('Product Already Exist');
                }
                break;
            }
        }
        if (!cart || !match) {
            let objData = { productId };
            const { data } = await axios.post(`/cart`, objData, { headers: { authorization: `Saja__${token}` } });
            if (data.message == "success") {
                toast.success('Product added successfully!');
                await getCart()
            }
        }
    }

    useEffect(() => {
        getFavoriteList();
        console.log("favoriteList", favoriteList);
    }, [])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>SkinElegance|FavoriteList</title>
            </Helmet>
            <main className="main-content">

                {/* == Start Wishlist Area Wrapper ==*/}
                <section className="section-space">
                    {isEmpty ? <NotFound title={'You don`t have favorite list yet'} titlePage={'Products'} goTO={'/Products'} /> :
                        <>
                            {favoriteList?.products?.length== 0 ? <Loading margin={50} height={500} fontSize={70} /> :

                                <div className="container">
                                    <div className='row mt-3 mb-5'>
                                        <div className="col-md-1">
                                        </div>
                                        <button className='btn btn-danger' onClick={() => clearFavoriteList()} style={{ width: '200px' }}>Clear</button>
                                        <div className="col-md-4">
                                        </div>
                                    </div>
                                    <div className="shopping-wishlist-form table-responsive">
                                        <form action="#" method="post">
                                            <table className="table text-center">
                                                <thead>
                                                    <tr>
                                                        <th className="product-remove">&nbsp;</th>
                                                        <th className="product-thumbnail">Product Image</th>
                                                        <th className="product-name">Product name</th>
                                                        <th className="product-price">Unit price</th>
                                                        <th className="product-add-to-cart">&nbsp;</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {favoriteList?.products?.map((product) => (
                                                        <tr className="tbody-item p-1" key={product.productId}>
                                                            <td className="product-remove btn-danger">
                                                                <a className="remove text-dark fs-4" onClick={() => removeItem(product.productId)}>X</a>
                                                            </td>
                                                            <td className="product-thumbnail" style={{ width: '100px' }}>
                                                                <div className="thumb" style={{ width: '100%', height: '100%' }}>
                                                                    <Link to={`/Products/${product.productSlug}`} state={{ productId: product.productId, slug: product.productSlug }}>
                                                                        <img src={product.mainImage.secure_url} style={{ width: '100%', height: '100%' }} alt="Image-HasTech" />
                                                                    </Link>
                                                                </div>
                                                            </td>

                                                            <td className="product-name">
                                                                <Link className="title text-capitalize fs-5" to={`/Products/${product.productSlug}`} state={{ productId: product.productId, slug: product.productSlug }}>{product.productName}</Link>
                                                            </td>
                                                            <td className="product-price">
                                                                <span className="price fs-5">₪{product.price}</span>
                                                            </td>
                                                            <td className="product-add-to-cart">
                                                                <a className="btn-shop-cart" onClick={() => addToCart(product.productId)}>Add to Cart</a>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </form>
                                    </div>
                                </div>}
                        </>
                    }
                </section>
                {/*== End Wishlist Area Wrapper == */}
            </main >
        </>
    )
}
