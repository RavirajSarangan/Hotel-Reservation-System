'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function FacilitiesOne() {
    useEffect(() => {
        AOS.init({
            duration: 800,  // Animation duration
            once: true,    // Ensures animations run once
        });
    }, []);

    return (
        <>
            {/* facilities */}
            <div className="rts__section facilities__area has__background has__shape py-90">
                <div className="section__shape">
                    <img src="/assets/images/shape/facility-1.svg" alt="" />
                </div>
                <div className="container">
                    <div className="row justify-content-center text-center mb-40">
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                            <div className="section__topbar">
                                <span className="h6 subtitle__icon__three mx-auto text-hotel-sm font-hotel-semibold text-hotel-primary">Facilities</span>
                                <h2 className="section__title text-hotel-3xl font-hotel-bold tracking-hotel-normal">Hotel Facilities</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-xl-3 col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="300">
                            <div className="card rts__card no-border is__home radius-6">
                                <div className="card-body">
                                    <div className="icon">
                                        <img src="/assets/images/icon/bed.svg" alt="" />
                                    </div>
                                    <Link href="/">
                                        <h6 className="card-title h6 mb-15 text-hotel-lg font-hotel-semibold">Rooms and Suites</h6>
                                    </Link>
                                    <p className="card-text text-hotel-base font-hotel-normal leading-hotel-relaxed">
                                        Varied types of rooms, from standard to luxury suites, equipped with essentials like beds.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="400">
                            <div className="card rts__card no-border is__home radius-6">
                                <div className="card-body">
                                    <div className="icon">
                                        <img src="/assets/images/icon/security.svg" alt="" />
                                    </div>
                                    <Link href="/">
                                        <h6 className="card-title h6 mb-15 text-hotel-lg font-hotel-semibold">24-Hour Security</h6>
                                    </Link>
                                    <p className="card-text text-hotel-base font-hotel-normal leading-hotel-relaxed">
                                        On-site security personnel and best surveillance. Secure storage for valuables.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="500">
                            <div className="card rts__card no-border is__home radius-6">
                                <div className="card-body">
                                    <div className="icon">
                                        <img src="/assets/images/icon/gym.svg" alt="" />
                                    </div>
                                    <Link href="/">
                                        <h6 className="card-title h6 mb-15 text-hotel-lg font-hotel-semibold">Fitness Center</h6>
                                    </Link>
                                    <p className="card-text text-hotel-base font-hotel-normal leading-hotel-relaxed">
                                        Equipped with exercise machines and weights. Offering massages, facials, and other treatments.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="600">
                            <div className="card rts__card no-border is__home radius-6">
                                <div className="card-body">
                                    <div className="icon">
                                        <img src="/assets/images/icon/swimming-pool.svg" alt="" />
                                    </div>
                                    <Link href="/">
                                        <h6 className="card-title h6 mb-15 text-hotel-lg font-hotel-semibold">Swimming Pool</h6>
                                    </Link>
                                    <p className="card-text text-hotel-base font-hotel-normal leading-hotel-relaxed">
                                        Indoor or outdoor pools for leisure or exercise. Offering massages, facials, and other treatments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* facilities end */}
        </>
    );
}

export default FacilitiesOne;
