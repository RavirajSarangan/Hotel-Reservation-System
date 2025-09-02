'use client'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

function BannerSix() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <>
            {/* banner area */}
            <div className="rts__section banner__area is__home__five banner__height banner__center">
                <div className="banner__content">
                    <div className="banner__slider__image">
                        <img
                            className="is__clippath"
                            src="/assets/images/index-5/banner/banner-bg.webp"
                            alt=""
                        />
                    </div>
                    <div className="container">
                        <div className="row g-30 align-items-center">
                            <div className="col-lg-7">
                                <div className="banner__slide__content if__not__slider">
                                    <h1 data-aos="fade-up">
                                        Discover Luxury in the Heart of the City
                                    </h1>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="rts__booking__form">
                                    <form action="#" method="post" className="advance__search">
                                        <h5>Book Your Stay</h5>
                                        <div className="advance__search__wrapper is__home__five">
                                            {/* single input */}
                                            <div className="query__input" data-aos="fade-up">
                                                <label htmlFor="check__in" className="query__label">
                                                    Check In
                                                </label>
                                                <div className="query__input__position">
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
                                            </div>
                                            {/* single input end */}
                                            {/* single input */}
                                            <div
                                                className="query__input" data-aos="fade-up"
                                                data-aos-delay="300"
                                            >
                                                <label htmlFor="check__out" className="query__label">
                                                    Check Out
                                                </label>
                                                <div className="query__input__position">
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
                                            </div>
                                            {/* single input end */}
                                            {/* single input */}
                                            <div
                                                className="query__input" data-aos="fade-up"
                                                data-aos-delay="400"
                                            >
                                                <label htmlFor="adult" className="query__label">
                                                    Adult
                                                </label>
                                                <div className="query__input__position">
                                                    <select name="adult" id="adult" className="form-select">
                                                        <option value={1}>1 Person</option>
                                                        <option value={2}>2 Person</option>
                                                        <option value={3}>3 Person</option>
                                                        <option value={4}>4 Person</option>
                                                        <option value={5}>5 Person</option>
                                                        <option value={6}>6 Person</option>
                                                        <option value={7}>7 Person</option>
                                                    </select>
                                                    <div className="query__input__icon">
                                                        <i className="flaticon-user" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* single input end */}
                                            {/* single input */}
                                            <div
                                                className="query__input" data-aos="fade-up"
                                                data-aos-delay="500"
                                            >
                                                <label htmlFor="child" className="query__label">
                                                    Child
                                                </label>
                                                <div className="query__input__position">
                                                    <select name="child" id="child" className="form-select">
                                                        <option value={1}>1 Child</option>
                                                        <option value={2}>2 Child</option>
                                                        <option value={3}>3 Child</option>
                                                        <option value={4}>4 Child</option>
                                                        <option value={5}>5 Child</option>
                                                        <option value={6}>6 Child</option>
                                                        <option value={7}>7 Child</option>
                                                    </select>
                                                    <div className="query__input__icon">
                                                        <i className="flaticon-user" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* single input end */}
                                            {/* submit button */}
                                            <button
                                                className="theme-btn btn-style fill no-border search__btn" data-aos="fade-up"
                                                data-aos-delay="600"
                                            >
                                                <span>
                                                    <i className="flaticon-search-1" /> Search
                                                </span>
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

    )
}

export default BannerSix