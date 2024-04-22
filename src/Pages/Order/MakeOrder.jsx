import React, { useContext } from 'react'
import { AuthContext } from '../../Context/Auth.context.jsx';

export default function MakeOrder() {
    const { user } = useContext(AuthContext);

    return (
        <>
            {/*== Start Shopping Checkout Area Wrapper ==*/}
            <section className="shopping-checkout-wrap section-space">
                <div className="container">
                    <div className="checkout-page-coupon-wrap">
                        {/*== Start Checkout Coupon Accordion ==*/}
                        <div className="coupon-accordion" id="CouponAccordion">
                            <div className="card">
                                <h3>
                                    <i className="fa fa-info-circle" />
                                    Have a Coupon?
                                    <a href="#/" data-bs-toggle="collapse" data-bs-target="#couponaccordion">Click here to enter your code</a>
                                </h3>
                                <div id="couponaccordion" className="collapse" data-bs-parent="#CouponAccordion">
                                    <div className="card-body">
                                        <div className="apply-coupon-wrap">
                                            <p>If you have a coupon code, please apply it below.</p>
                                            <form action="#" method="post">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input className="form-control" type="text" placeholder="Coupon code" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button type="button" className="btn-coupon">Apply coupon</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*== End Checkout Coupon Accordion ==*/}
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            {/*== Start Billing Accordion ==*/}
                            <div className="checkout-billing-details-wrap">
                                <h2 className="title">Billing details</h2>
                                <div className="billing-form-wrap">
                                    <form action="#" method="post">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="f_name">First name <abbr className="required" title="required">*</abbr></label>
                                                    <input id="f_name" type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="l_name">Last name <abbr className="required" title="required">*</abbr></label>
                                                    <input id="l_name" type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="com_name">Company name (optional)</label>
                                                    <input id="com_name" type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="country">Country <abbr className="required" title="required">*</abbr></label>
                                                    <select id="country" className="form-control wide">
                                                        <option>Bangladesh</option>
                                                        <option>Afghanistan</option>
                                                        <option>Albania</option>
                                                        <option>Algeria</option>
                                                        <option>Armenia</option>
                                                        <option>India</option>
                                                        <option>Pakistan</option>
                                                        <option>England</option>
                                                        <option>London</option>
                                                        <option>London</option>
                                                        <option>China</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="street-address">Street address <abbr className="required" title="required">*</abbr></label>
                                                    <input id="street-address" type="text" className="form-control" placeholder="House number and street name" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="street-address2" className="visually-hidden">Street address 2 <abbr className="required" title="required">*</abbr></label>
                                                    <input id="street-address2" type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="town">Town / City <abbr className="required" title="required">*</abbr></label>
                                                    <input id="town" type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="district">District <abbr className="required" title="required">*</abbr></label>
                                                    <select id="district" className="form-control wide">
                                                        <option>Afghanistan</option>
                                                        <option>Albania</option>
                                                        <option>Algeria</option>
                                                        <option>Armenia</option>
                                                        <option>India</option>
                                                        <option>Pakistan</option>
                                                        <option>England</option>
                                                        <option>London</option>
                                                        <option>London</option>
                                                        <option>China</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="pz-code">Postcode / ZIP (optional)</label>
                                                    <input id="pz-code" type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone (optional)</label>
                                                    <input id="phone" type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email address <abbr className="required" title="required">*</abbr></label>
                                                    <input id="email" type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div id="CheckoutBillingAccordion2" className="col-md-12">
                                                <div className="checkout-box" data-bs-toggle="collapse" data-bs-target="#CheckoutTwo" aria-expanded="false" role="toolbar">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input visually-hidden" id="ship-to-different-address" />
                                                        <label className="custom-control-label" htmlFor="ship-to-different-address">Ship to a different address?</label>
                                                    </div>
                                                </div>
                                                <div id="CheckoutTwo" className="collapse" data-bs-parent="#CheckoutBillingAccordion2">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="f_name2">First name <abbr className="required" title="required">*</abbr></label>
                                                                <input id="f_name2" type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="l_name2">Last name <abbr className="required" title="required">*</abbr></label>
                                                                <input id="l_name2" type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="com_name2">Company name (optional)</label>
                                                                <input id="com_name2" type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-4">
                                                            <div className="form-group">
                                                                <label htmlFor="country2">Country <abbr className="required" title="required">*</abbr></label>
                                                                <select id="country2" className="form-control wide">
                                                                    <option>Bangladesh</option>
                                                                    <option>Afghanistan</option>
                                                                    <option>Albania</option>
                                                                    <option>Algeria</option>
                                                                    <option>Armenia</option>
                                                                    <option>India</option>
                                                                    <option>Pakistan</option>
                                                                    <option>England</option>
                                                                    <option>London</option>
                                                                    <option>London</option>
                                                                    <option>China</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="street-address2-3">Street address <abbr className="required" title="required">*</abbr></label>
                                                                <input id="street-address2-3" type="text" className="form-control" placeholder="House number and street name" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="street-address2-2" className="visually-hidden">Street address 2 <abbr className="required" title="required">*</abbr></label>
                                                                <input id="street-address2-2" type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="town3">Town / City <abbr className="required" title="required">*</abbr></label>
                                                                <input id="town3" type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-4">
                                                            <div className="form-group">
                                                                <label htmlFor="district2">District <abbr className="required" title="required">*</abbr></label>
                                                                <select id="district2" className="form-control wide">
                                                                    <option>Afghanistan</option>
                                                                    <option>Albania</option>
                                                                    <option>Algeria</option>
                                                                    <option>Armenia</option>
                                                                    <option>India</option>
                                                                    <option>Pakistan</option>
                                                                    <option>England</option>
                                                                    <option>London</option>
                                                                    <option>London</option>
                                                                    <option>China</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="pz-code2">Postcode / ZIP (optional)</label>
                                                                <input id="pz-code2" type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group mb-0">
                                                    <label htmlFor="order-notes">Order notes (optional)</label>
                                                    <textarea id="order-notes" className="form-control" placeholder="Notes about your order, e.g. special notes for delivery." defaultValue={""} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/*== End Billing Accordion ==*/}
                        </div>
                      
                    </div>
                </div>
            </section>
            {/*== End Shopping Checkout Area Wrapper ==*/}






        </>
    )
}
