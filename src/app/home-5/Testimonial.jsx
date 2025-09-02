'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Core Swiper styles
import { Navigation } from 'swiper/modules';

function TestimonialFive() {
    return (
        <>
            {/* client testimonial  */}
            <div className="rts__section testimonial has__shape is__home__four section__padding">
                <div className="section__shape">
                    <img src="/assets/images/about/section__shape.svg" alt="" />
                </div>
                <div className="container">
                    <div className="row g-30">
                        <div className="col-lg-5">
                            <div className="testimonial__left">
                                <div className="section__topbar">
                                    <span className="h6 subtitle__icon__five d-block wow fadeInUp">
                                        Testimonial
                                    </span>
                                    <h2 className="content__title h2 lh-1 wow fadeInUp">
                                        What Our Client Say About Us
                                    </h2>
                                </div>
                                <div className="applicant__list mt-40">
                                    <div className="single__list">
                                        <img src="/assets/images/author/3.webp" alt="" />
                                    </div>
                                    <div className="single__list">
                                        <img src="/assets/images/author/4.webp" alt="" />
                                    </div>
                                    <div className="single__list">
                                        <img src="/assets/images/author/5.webp" alt="" />
                                    </div>
                                    <div className="single__list">
                                        <img src="/assets/images/author/6.webp" alt="" />
                                        <div className="icon-plus">+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <Swiper
                                className="testimonial__slider position-relative overflow-hidden"
                                modules={[Navigation]}
                                direction="horizontal"
                                slidesPerView={1}
                                spaceBetween={0}
                                loop={true}
                                centeredSlides={true}
                                autoplay="false"
                                navigation={{
                                    nextEl: ".button-next",
                                    prevEl: ".button-prev",
                                }}
                                speed={1000}
                                effect="slide"
                            >
                                <div className="swiper-wrapper">
                                    {/* single testimonialial */}
                                    <SwiperSlide>
                                        <div className="testimonial__item__content">
                                            <div className="testimonial__content">
                                                <div className="single__slider__item ">
                                                    <div className="slider__rating mb-20">
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star-sharp-half-stroke" />
                                                    </div>
                                                    <span className="slider__text d-block">
                                                        Choosing Bokinn was one of the best decisions we've ever
                                                        made. They have proven to be a reliable and innovative
                                                        partner, always ready to tackle new challenges with and
                                                        expertise.Their commitment to and delivering tailored.
                                                    </span>
                                                    <div className="slider__author__info">
                                                        <div className="slider__author__info__content">
                                                            <h6 className="mb-0">Sarah Martinez</h6>
                                                            <span>COO of Apex Solutions</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    {/* single testimonial end */}
                                    {/* single testimonialial */}
                                    <SwiperSlide>
                                        <div className="testimonial__item__content">
                                            <div className="testimonial__content">
                                                <div className="single__slider__item ">
                                                    <div className="slider__rating mb-20">
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star-sharp-half-stroke" />
                                                    </div>
                                                    <span className="slider__text d-block">
                                                        Choosing Bokinn was one of the best decisions we've ever
                                                        made. They have proven to be a reliable and innovative
                                                        partner, always ready to tackle new challenges with and
                                                        expertise.Their commitment to and delivering tailored.
                                                    </span>
                                                    <div className="slider__author__info">
                                                        <div className="slider__author__info__content">
                                                            <h6 className="mb-0">Sarah Martinez</h6>
                                                            <span>COO of Apex Solutions</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    {/* single testimonial end */}
                                    {/* single testimonialial */}
                                    <SwiperSlide>
                                        <div className="testimonial__item__content">
                                            <div className="testimonial__content">
                                                <div className="single__slider__item ">
                                                    <div className="slider__rating mb-20">
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star" />
                                                        <i className="flaticon-star-sharp-half-stroke" />
                                                    </div>
                                                    <span className="slider__text d-block">
                                                        Choosing Bokinn was one of the best decisions we've ever
                                                        made. They have proven to be a reliable and innovative
                                                        partner, always ready to tackle new challenges with and
                                                        expertise.Their commitment to and delivering tailored.
                                                    </span>
                                                    <div className="slider__author__info">
                                                        <div className="slider__author__info__content">
                                                            <h6 className="mb-0">Sarah Martinez</h6>
                                                            <span>COO of Apex Solutions</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    {/* single testimonial end */}
                                </div>
                                {/* slider navigation */}
                                <div className="slider__navigation is__home__four">
                                    <div className="nav__btn button-next">
                                        <img src="/assets/images/icon/arrow-left-short.svg" alt="" />
                                    </div>
                                    <div className="nav__btn button-prev">
                                        <img src="/assets/images/icon/arrow-right-short.svg" alt="" />
                                    </div>
                                </div>
                                {/*  slider navigation end */}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            {/* client testimonial  end */}
        </>

    )
}

export default TestimonialFive