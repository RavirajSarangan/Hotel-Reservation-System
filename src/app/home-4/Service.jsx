'use client'
import React, { useEffect } from 'react';
import Rellax from 'rellax';
import Link from 'next/link';

function ServiceOne() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            new Rellax(".rellax", { speed: 1 });
        }
    }, []);
    return (
        <>
            {/* our service */}
            <div className="rts__section service is__home__three has__background has__shape">
                <div className="section__shape" data-aos="fade-right" data-aos-delay="500">
                    <img src="/assets/images/index-3/service/sec-bg.svg" alt="" />
                </div>
                <div className="container">
                    <div className="row mb-40">
                        <div className="section__topbar">
                            <span className="h6 subtitle__icon__five d-block" data-aos="fade-up">
                                Our Service
                            </span>
                            <h2 className="content__title h2 lh-1" data-aos="fade-up">Our Services</h2>
                        </div>
                    </div>
                    <div className="row">
                        {/* single service item */}
                        <div className="single__service__item if__is__default">
                            <div className="service__thumb jarallax">
                                <img
                                    className="jarallax-img"
                                    src="/assets/images/index-3/service/1.webp"
                                    width={605}
                                    height={535}
                                    alt=""
                                />
                            </div>
                            <div className="service__content">
                                <div className="section__topbar">
                                    <span className="h6 subtitle__icon__five d-block" data-aos="fade-up">
                                        Spa &amp; Wellness
                                    </span>
                                    <h2 className="content__title h3 lh-1" data-aos="fade-up">
                                        Spa &amp; Wellness
                                    </h2>
                                </div>
                                <p className="font-sm mt-30" data-aos="fade-up">
                                    At our Fitness &amp; Yoga Services, we are dedicated to helping
                                    you achieve your health and wellness goals. Our comprehensive
                                    program offers a variety of classes designed to suit all levels,
                                    from beginners to advanced practitioners.
                                </p>
                                <Link
                                    href="#"
                                    className="underline__style "
                                    data-aos-delay="400" data-aos="fade-up"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                        {/* single service item end */}
                        {/* single service item */}
                        <div className="single__service__item if__is__reverse">
                            <div className="service__thumb jarallax">
                                <img
                                    className="jarallax-img"
                                    src="/assets/images/index-3/service/2.webp"
                                    width={605}
                                    height={535}
                                    alt="service"
                                />
                            </div>
                            <div className="service__content">
                                <div className="section__topbar">
                                    <span className="h6 subtitle__icon__five d-block" data-aos="fade-up">
                                        Romantic Getaway
                                    </span>
                                    <h2 className="content__title h3 lh-1" data-aos="fade-up">
                                        Romantic Getaway
                                    </h2>
                                </div>
                                <p className="font-sm mt-30" data-aos="fade-up">
                                    At our Fitness &amp; Yoga Services, we are dedicated to helping
                                    you achieve your health and wellness goals. Our comprehensive
                                    program offers a variety of classes designed to suit all levels,
                                    from beginners to advanced practitioners.
                                </p>
                                <Link
                                    href="#"
                                    className="underline__style"
                                    data-aos-delay="400" data-aos="fade-up"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                        {/* single service item end */}
                    </div>
                </div>
            </div>
            {/* our service end */}
        </>

    )
}

export default ServiceOne