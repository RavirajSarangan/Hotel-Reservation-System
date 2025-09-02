import Link from 'next/link'
import React from 'react'

function AboutSeven() {
    return (
        <>
            {/* about us */}
            <div className="rts__section about is__resturant section__padding">
                <div className="container">
                    <div className="row g-4 align-items-center  ">
                        <div className="col-lg-5">
                            <div className="about__images">
                                <div className="image__left wow fadeInUp">
                                    <img
                                        height={648}
                                        width={428}
                                        src="/assets/images/pages/resturant/1.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="image__right wow fadeInUp">
                                    <img
                                        width={428}
                                        height={648}
                                        src="/assets/images/pages/resturant/2.webp"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="about__content">
                                <span className="h6 subtitle__icon__two d-block wow fadeInUp">
                                    Hotel Experience
                                </span>
                                <h2 className="font-xl wow fadeInUp">
                                    From Farm to Fork: Enjoy Fresh, Seasonal Dishes at Bokinn
                                </h2>
                                <p className="font-sm mt-30 wow fadeInUp" data-wow-delay=".3s">
                                    Welcome to Bokinn, where luxury meets comfort in the heart of
                                    canada. Since 1999, we have been dedicated to providing an
                                    exceptional stay for our guests, blending modern amenities with
                                    timeless elegance.Our beautifully designed rooms and suites offer
                                    stunning views and plush accommodations, ensuring a restful
                                    retreat whether you're here for business or leisure.
                                </p>
                                <div className="reservation__meta wow fadeInUp">
                                    <div className="reservation__item">
                                        <p className="font-sm">Reservation By Phone</p>
                                        <Link href="tel:+12505550199">
                                            <img src="/assets/images/icon/phone.svg" alt="" /> +12505550199
                                        </Link>
                                    </div>
                                    <div className="reservation__item">
                                        <p className="font-sm">Opening Hours</p>
                                        <span>
                                            <img src="/assets/images/icon/clock.svg" alt="" />
                                            10 Am - 12Pm
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* about us end */}
        </>

    )
}

export default AboutSeven