'use client'
import React, { useEffect } from 'react'
import Rellax from 'rellax';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

function ActivitiesOne() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            new Rellax(".rellax", { speed: 1 });
        }
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <>
            {/* our activities */}
            <div className="rts__section activites section__padding">
                <div className="container">
                    <div className="row">
                        {/* single service item */}
                        <div className="single__service__item if__is__default if__activities">
                            <div className="service__thumb jarallax">
                                <img
                                    className="jarallax-img"
                                    src="/assets/images/pages/activities/1.webp"
                                    width={605}
                                    height={650}
                                    alt="Winter Activities Service" // Updated alt
                                />
                            </div>
                            <div className="service__content">
                                <div className="section__content__left">
                                    <span className="h6 subtitle__icon__two d-block" data-aos="fade-up">
                                        Winter Activities
                                    </span>
                                    <h2 className="content__title h2 lh-1" data-aos="fade-up">
                                        Winter Activities
                                    </h2>
                                </div>
                                <p className="font-sm mt-20" data-aos="fade-up">
                                    Enjoy access to nearby slopes, perfect for both beginners and
                                    experienced skiers. Explore serene winter landscapes on guided
                                    snowshoe tours through nearby trails.
                                </p>
                                <div className="activity__feature mt-20"  data-aos="fade-up">
                                    <ul className="list-unstyled">
                                        <li>
                                            <img src="/assets/images/icon/sketing.svg" alt="Skiing & Snowboarding" />
                                            Skiing &amp; Snowboarding
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/wild.svg" alt="Winter Wildlife Tours" />
                                            Winter Wildlife Tours
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/hot-coffe.svg" alt="Hot Cocoa by the Fire" />
                                            Hot Cocoa by the Fire
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/snow.svg" alt="Snowshoeing" />
                                            Snowshoeing
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/spa.svg" alt="Spa & Wellness" />
                                            Spa &amp; Wellness
                                        </li>
                                    </ul>
                                </div>
                                <Link
                                    href="/activities"
                                    className="underline__style"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >
                                    Discover More
                                </Link>
                            </div>
                        </div>
                        {/* single service item end */}
                        {/* single service item */}
                        <div className="single__service__item if__is__reverse if__activities">
                            <div className="service__thumb jarallax">
                                <img
                                    className="jarallax-img rellax rellax-img"
                                    src="/assets/images/pages/activities/2.webp"
                                    width={605}
                                    height={650}
                                    alt="Summer Activities Service" // Updated alt
                                />
                            </div>
                            <div className="service__content">
                                <div className="section__content__left">
                                    <span className="h6 subtitle__icon__two d-block" data-aos="fade-up">
                                        Summer Activities
                                    </span>
                                    <h2 className="content__title h2 lh-1" data-aos="fade-up">
                                        Summer Activities
                                    </h2>
                                </div>
                                <p className="font-sm mt-20" data-aos="fade-up">
                                    Enjoy access to nearby slopes, perfect for both beginners and
                                    experienced skiers. Explore serene winter landscapes on guided
                                    snowshoe tours through nearby trails.
                                </p>
                                <div className="activity__feature mt-20" data-aos="fade-up">
                                    <ul className="list-unstyled">
                                        <li>
                                            <img src="/assets/images/icon/sketing.svg" alt="Guided Hiking Tours" />
                                            Guided Hiking Tours
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/biking.svg" alt="Mountain Biking" />
                                            Mountain Biking
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/swimming.svg" alt="Outdoor Swimming Pool" />
                                            Outdoor Swimming Pool
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/home-theater.svg" alt="Outdoor Movie Nights" />
                                            Outdoor Movie Nights
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/tenis.svg" alt="Tennis & Sports Courts" />
                                            Tennis &amp; Sports Courts
                                        </li>
                                    </ul>
                                </div>
                                <Link
                                    href="/activities"
                                    className="underline__style"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >
                                    Discover More
                                </Link>
                            </div>
                        </div>
                        {/* single service item end */}
                    </div>
                </div>
                <div className="container pt-120">
                    <div className="row g-30">
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <div className="activities__image__card">
                                <div className="activities__thumb">
                                    <img
                                        src="/assets/images/pages/activities/3.webp"
                                        width={420}
                                        height={585}
                                        alt="Cultural Tours" // Updated alt
                                    />
                                </div>
                                <div className="activities__meta">
                                    <Link href="#" className="h4 title d-block"> {/* Updated link */}
                                        Cultural Tours
                                    </Link>
                                    <Link href="#" className="theme-btn btn-style border">
                                        <span>View More</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Similar updates for other cards */}
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <div className="activities__image__card">
                                <div className="activities__thumb">
                                    <img
                                        src="/assets/images/pages/activities/4.webp"
                                        width={420}
                                        height={585}
                                        alt="Cultural Tours" // Updated alt
                                    />
                                </div>
                                <div className="activities__meta">
                                    <Link href="#" className="h4 title d-block"> {/* Updated link */}
                                        Cultural Tours
                                    </Link>
                                    <Link href="#" className="theme-btn btn-style border">
                                        <span>View More</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Similar updates for other cards */}
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <div className="activities__image__card">
                                <div className="activities__thumb">
                                    <img
                                        src="/assets/images/pages/activities/5.webp"
                                        width={420}
                                        height={585}
                                        alt="Cultural Tours" // Updated alt
                                    />
                                </div>
                                <div className="activities__meta">
                                    <Link href="#" className="h4 title d-block"> {/* Updated link */}
                                        Cultural Tours
                                    </Link>
                                    <Link href="#" className="theme-btn btn-style border">
                                        <span>View More</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Similar updates for other cards */}
                    </div>
                </div>
            </div>
            {/* our activities end */}
        </>
    )
}

export default ActivitiesOne;
