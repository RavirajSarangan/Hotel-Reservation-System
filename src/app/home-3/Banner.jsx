'use client'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function BannerThree() {
    useEffect(() => {
        AOS.init({
            duration: 800, // Animation duration
            once: true,    // Ensures animations run once
            easing: 'ease-in-out', // Smooth animation
        });
    }, []);

    return (
        <>
            {/* banner area */}
            <div className="rts__section banner__area is__home__two banner__height banner__center">
                <div className="banner__content">
                    <div className="banner__slider__image">
                        <img src="/assets/images/banner/slides-2.webp" alt="Banner Image" />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="banner__slide__content" data-aos="fade-up">
                                    <h1 data-aos="fade-up">
                                        Luxury Stay Hotel Experience Comfort &amp; Elegance
                                    </h1>
                                    <div className="banner__slide__content__info">
                                        <div className="item" data-aos="fade-up" data-aos-delay="300">
                                            <span className="h2 d-block">30+</span>
                                            <p>Hotel Room</p>
                                        </div>
                                        <div className="item" data-aos="fade-up" data-aos-delay="500">
                                            <span className="h2 d-block">20+</span>
                                            <p>Pool &amp; Spa Center</p>
                                        </div>
                                        <div className="item" data-aos="fade-up" data-aos-delay="700">
                                            <span className="h2 d-block">50+</span>
                                            <p>Experienced Staff</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* banner area end */}
        </>
    );
}

export default BannerThree;
