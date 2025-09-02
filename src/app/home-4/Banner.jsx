'use client'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function BannerFour() {
    useEffect(() => {
        AOS.init({
            duration: 800,  // Animation duration
            once: true,    // Ensures animations run once
            easing: 'ease-in-out', // Smooth animation
        });
    }, []);

    return (
        <>
            {/* banner area */}
            <div className="rts__section banner__area is__home__three banner__height banner__center">
                <div className="container">
                    <div className="row">
                        <div className="banner__content not__slider">
                            <div className="banner__slide__content not__slider" data-aos="fade-up">
                                <h1 data-aos="fade-up" data-aos-delay="200">
                                    Energy-Efficient Apartment with Smart Hotel{" "}
                                </h1>
                            </div>
                            <div className="banner__image" data-aos="fade-right" data-aos-delay="400">
                                <img
                                    src="/assets/images/index-3/banner/banner.webp"
                                    height={910}
                                    width={985}
                                    alt="Banner Image"
                                />
                            </div>
                        </div>
                        <div
                            className="rts__section advance__search__section is__home__three"
                            data-aos="fade-up"
                            data-aos-delay="500"
                        >
                            <div className="container">
                                <div className="row">
                                    <form action="room-two" method="post" className="advance__search">
                                        <div className="advance__search__wrapper">
                                            {/* single input */}
                                            <div className="query__input" data-aos="fade-up" data-aos-delay="600">
                                                <label htmlFor="check__in" className="query__label">
                                                    Check In
                                                </label>
                                                <input
                                                    type="text"
                                                    id="check__in"
                                                    name="check__in"
                                                    placeholder="15 Jun 2024"
                                                    required=""
                                                />
                                                <div className="query__input__icon">
                                                    <i className="flaticon-calendar" />
                                                </div>
                                            </div>
                                            {/* single input end */}
                                            <div className="query__input" data-aos="fade-up" data-aos-delay="700">
                                                <label htmlFor="check__out" className="query__label">
                                                    Check Out
                                                </label>
                                                <input
                                                    type="text"
                                                    id="check__out"
                                                    name="check__out"
                                                    placeholder="15 May 2024"
                                                    required=""
                                                />
                                                <div className="query__input__icon">
                                                    <i className="flaticon-calendar" />
                                                </div>
                                            </div>
                                            {/* single input end */}
                                            <div className="query__input" data-aos="fade-up" data-aos-delay="800">
                                                <label htmlFor="adult" className="query__label">
                                                    Adult
                                                </label>
                                                <select name="adult" id="adult" className="form-select">
                                                    <option value={1}>1 Person</option>
                                                    <option value={2}>2 Person</option>
                                                    <option value={3}>3 Person</option>
                                                    <option value={4}>4 Person</option>
                                                    <option value={5}>5 Person</option>
                                                    <option value={6}>6 Person</option>
                                                    <option value={7}>7 Person</option>
                                                    <option value={8}>8 Person</option>
                                                    <option value={9}>9 Person</option>
                                                </select>
                                                <div className="query__input__icon">
                                                    <i className="flaticon-user" />
                                                </div>
                                            </div>
                                            {/* single input end */}
                                            <div className="query__input" data-aos="fade-up" data-aos-delay="900">
                                                <label htmlFor="child" className="query__label">
                                                    Child
                                                </label>
                                                <select name="child" id="child" className="form-select">
                                                    <option value={1}>1 Child</option>
                                                    <option value={2}>2 Child</option>
                                                    <option value={3}>3 Child</option>
                                                    <option value={4}>4 Child</option>
                                                    <option value={5}>5 Child</option>
                                                    <option value={6}>6 Child</option>
                                                    <option value={7}>7 Child</option>
                                                    <option value={8}>8 Child</option>
                                                    <option value={9}>9 Child</option>
                                                </select>
                                                <div className="query__input__icon">
                                                    <i className="flaticon-user" />
                                                </div>
                                            </div>
                                            {/* single input end */}
                                            <button className="theme-btn btn-style fill no-border search__btn" data-aos="fade-up" data-aos-delay="1000">
                                                <span>Check Now</span>
                                            </button>
                                            {/* submit button end */}
                                        </div>
                                    </form>
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

export default BannerFour;
