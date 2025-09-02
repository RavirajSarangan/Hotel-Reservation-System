import Link from 'next/link'
import React from 'react'

function FooterOne() {
    return (
        <>
            {/* footer style one */}
            <footer className="rts__section rts__footer is__common__footer footer__background has__shape">
                <div className="section__shape">
                    <div className="shape__1">
                        <img src="/assets/images/footer/shape-1.svg" alt="" />
                    </div>
                    <div className="shape__2">
                        <img src="/assets/images/footer/shape-2.svg" alt="" />
                    </div>
                    <div className="shape__3">
                        <img src="/assets/images/footer/shape-3.svg" alt="" />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="footer__newsletter">
                            <span className="h2 text-hotel-2xl font-hotel-bold tracking-hotel-normal">Join Our Newsletter</span>
                            <div className="rts__form">
                                <form action="#" method="post">
                                    <input
                                        type="email"
                                        name="email"
                                        id="subscription"
                                        placeholder="Enter your mail"
                                        className="text-hotel-base font-hotel-normal"
                                        required
                                    />
                                    <button type="submit" className="text-hotel-base font-hotel-semibold">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="footer__widget__wrapper">
                            <div className="rts__widget">
                                <Link href="/">
                                    <img
                                        className="footer__logo"
                                        src="/assets/images/logo/logo.svg"
                                        alt="footer logo"
                                    />
                                </Link>
                                <p className="font-sm max-290 mt-20 text-hotel-sm font-hotel-normal leading-hotel-relaxed">
                                    Each room features plush bedding, high-quality linens, and a
                                    selection of ensure a restful night's sleep.
                                </p>
                            </div>
                            <div className="rts__widget">
                                <span className="widget__title text-hotel-lg font-hotel-semibold">Quick Links</span>
                                <ul>
                                    <li>
                                        <Link href="#" aria-label="footer__link">
                                            Rooms &amp; Suites
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" aria-label="footer__link">
                                            Dining
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" aria-label="footer__link">
                                            Spa &amp; Wellness
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" aria-label="footer__link">
                                            Special Offers
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="rts__widget">
                                <span className="widget__title text-hotel-lg font-hotel-semibold">Guest Service</span>
                                <ul>
                                    <li className="text-hotel-sm font-hotel-normal">24/7 Front Desk</li>
                                    <li className="text-hotel-sm font-hotel-normal">Parking</li>
                                    <li className="text-hotel-sm font-hotel-normal">Room Service</li>
                                    <li className="text-hotel-sm font-hotel-normal">Free Wi-Fi</li>
                                    <li className="text-hotel-sm font-hotel-normal">Concierge Service</li>
                                </ul>
                            </div>
                            <div className="rts__widget">
                                <span className="widget__title text-hotel-lg font-hotel-semibold">Contact Us</span>
                                <ul>
                                    <li>
                                        <Link aria-label="footer__contact" href="tel:+12505550199">
                                            <i className="flaticon-phone-flip" /> +12505550199
                                        </Link>
                                    </li>
                                    <li>
                                        <Link aria-label="footer__contact" href="mailto:UjJw6@example.com">
                                            <i className="flaticon-envelope" />
                                            Moonlit@gmail.com
                                        </Link>
                                    </li>
                                    <li>
                                        <Link aria-label="footer__contact" href="#">
                                            <i className="flaticon-marker" />
                                            M5T 2L9 Toronto, Canada
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright__text">
                    <div className="container">
                        <div className="row">
                            <div className="copyright__wrapper">
                                <p className="mb-0 text-hotel-sm font-hotel-normal">
                                    Copyright © 2024 Moonlit. All rights reserved.
                                </p>
                                <div className="footer__social__link">
                                    <Link href="#" aria-label="footer__social" className="link__item text-hotel-sm font-hotel-medium">
                                        Facebook
                                    </Link>
                                    <Link href="#" aria-label="footer__social" className="link__item text-hotel-sm font-hotel-medium">
                                        Linkedin
                                    </Link>
                                    <Link href="#" aria-label="footer__social" className="link__item text-hotel-sm font-hotel-medium">
                                        Twitter
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* footer style one end */}
        </>

    )
}

export default FooterOne