import React from 'react'

function AboutFour() {
    return (
        <>
            {/* about us */}
            <div className="rts__section about is__home__four section__padding">
                <div className="container">
                    <div className="row g-4 align-items-center  ">
                        <div className="col-lg-5">
                            <div className="about__images">
                                <div className="image__left" data-aos="fade-up">
                                    <img
                                        height={474}
                                        width={450}
                                        src="/assets/images/index-4/about/1.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="image__right wow fadeInLeft">
                                    <img
                                        width={365}
                                        height={385}
                                        src="/assets/images/index-4/about/2.webp"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="about__content">
                                <span className="h6 subtitle__icon__two d-block wow fadeInUp">
                                    About Us
                                </span>
                                <h2 className="font-xl wow fadeInUp">
                                    Welcome To Our Moonlit Hotel &amp; Resort
                                </h2>
                                <p className="font-sm mt-30" data-aos="fade-up" data-aos-delay="300">
                                    Welcome to Bokinn, where luxury meets comfort in the heart of
                                    canada. Since 1999, we have been dedicated to providing an
                                    exceptional stay for our guests, blending modern amenities with
                                    timeless elegance.Our beautifully designed rooms and suites offer
                                    stunning views and plush accommodations, ensuring a restful
                                    retreat whether you're here for business or leisure.
                                </p>
                                <div
                                    className="hotel__owner__sign mt-40" data-aos="fade-up" data-aos-delay="500"
                                >
                                    <img src="/assets/images/index-4/about/sign.webp" alt="sign" />
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

export default AboutFour