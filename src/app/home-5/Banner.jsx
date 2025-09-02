'use client'
import React, { useEffect } from 'react';
import Rellax from 'rellax';
import AOS from 'aos';
import 'aos/dist/aos.css';
function BannerFive() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
        if (typeof window !== "undefined") {
            new Rellax(".rellax", { speed: 1 });
        }

    }, []);
    return (
        <>
            {/* banner area */}
            <div className="rts__section banner__area is__home__four banner__height banner__center">
                <div className="banner__content jara-mask-3 jarallax">
                    <div className="banner__slider__image">
                        <img
                            className="jarallax-img "
                            src="/assets/images/index-4/banner/banner.webp"
                            alt=""
                        />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-11">
                                <div className="banner__slide__content if__not__slider">
                                    <h1 data-aos="fade-up">
                                        Elevate Your Stay Luxury and Adventure in the Mountains
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* banner area end */}
        </>

    )
}

export default BannerFive