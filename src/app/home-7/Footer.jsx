import Link from 'next/link'
import React from 'react'

function FooterSix() {
    return (
        <>
            {/* footer style six */}
            <footer className="rts__section rts__footer is__home__six footer__background">
                <div className="container">
                    <div className="row">
                        <div className="footer__widget__wrapper">
                            <div className="rts__widget">
                                <span className="widget__title">Quick Links</span>
                                <ul>
                                    <li>
                                        <Link href="#">
                                            <i className="flaticon-marker" /> 280 Augusta Avenue, M5T 2L9
                                            Toronto, Canada
                                        </Link>
                                    </li>
                                </ul>
                                <div className="footer__social__link mt-20">
                                    <Link href="#" className="link__item">
                                        Facebook
                                    </Link>
                                    <Link href="#" className="link__item">
                                        Linkedin
                                    </Link>
                                    <Link href="#" className="link__item">
                                        Twitter
                                    </Link>
                                </div>
                            </div>
                            <div className="rts__widget">
                                <Link href="/">
                                    <img src="/assets/images/logo/logo__two.svg" alt="footer logo" />
                                </Link>
                            </div>
                            <div className="rts__widget">
                                <span className="widget__title">Contact Us</span>
                                <ul>
                                    <li>
                                        <Link href="tel:+12505550199">
                                            <i className="flaticon-phone-flip" /> +12505550199
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="mailto:UjJw6@example.com">
                                            <i className="flaticon-envelope" />
                                            Moonlit@gmail.com
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
                                <p className="mb-0">
                                    Copyright © 2024 Moonlit. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* footer style six end */}
        </>

    )
}

export default FooterSix