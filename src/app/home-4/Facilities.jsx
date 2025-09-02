'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function FacilitiesThree() {
    useEffect(() => {
        AOS.init({
            duration: 800,  // Animation duration
            once: true,    // Ensures animations run once
            easing: 'ease-in-out', // Smooth animation
        });
    }, []);
        
    return (
        <>
            {/* our facility */}
            <div className="rts__section facility__area has__background has__shape">
                <div className="section__shape" data-aos="fade-right" data-aos-delay="500">
                    <img src="/assets/images/index-3/facility-shape.svg" alt="" />
                </div>
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6" data-aos="fade-up">
                            <div className="facility__image jara-mask-3 jarallax">
                                <img
                                    height={765}
                                    width={605}
                                    className="jarallax-img"
                                    src="/assets/images/index-3/facility.webp"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="facility__content">
                                <div className="section__topbar">
                                    <span className="h6 subtitle__icon__five d-block" data-aos="fade-up">
                                        Facility
                                    </span>
                                    <h2 className="content__title h2 lh-1" data-aos="fade-up" data-aos-delay="200">
                                        Apartment Facilities
                                    </h2>
                                </div>
                                <div className="row mt-20 g-5">
                                    {[
                                        { img: 'bed.svg', title: 'Rooms and Suites', text: 'Varied types of rooms, from standard to luxury suites, equipped with essentials like beds.' },
                                        { img: 'security.svg', title: '24-Hour Security', text: 'On-site security personnel and best surveillance. Secure storage for valuables.' },
                                        { img: 'gym.svg', title: 'Fitness Center', text: 'Equipped with exercise machines and weights. Offering massages, facials, and other treatments.' },
                                        { img: 'swimming-pool.svg', title: 'Swimming Pool', text: 'Indoor or outdoor pools for leisure or exercise. Offering massages, facials, and other treatments.' }
                                    ].map((item, index) => (
                                        <div className="col-lg-6 col-md-6" key={index} data-aos="fade-up" data-aos-delay={300 + index * 100}>
                                            <div className="card rts__card no-border is__home__three">
                                                <div className="card-body">
                                                    <div className="icon">
                                                        <img src={`/assets/images/icon/${item.img}`} alt="" />
                                                    </div>
                                                    <Link href="#">
                                                        <h6 className="card-title h6 mb-15">{item.title}</h6>
                                                    </Link>
                                                    <p className="card-text">{item.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* our facility end */}
        </>
    );
}

export default FacilitiesThree;
