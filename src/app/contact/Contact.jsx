import React from 'react'

function ContactOne() {
    return (
        <>
            {/* contact area */}
            <div className="rts__section section__padding">
                <div className="container">
                    <div className="row g-30 align-items-center">
                        <div className="col-lg-6">
                            <div className="rts__contact">
                                <span className="h4 d-block mb-30 text-center">
                                    Love to hear from you Get in touch!
                                </span>
                                <form
                                    action="mailer.php"
                                    method="post"
                                    className="rts__contact__form"
                                    id="contact-form"
                                >
                                    <div className="form-input">
                                        <label htmlFor="name">Your Name</label>
                                        <div className="pr">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Your Name"
                                                required
                                            />
                                            <i className="flaticon-user" />
                                        </div>
                                    </div>
                                    <div className="form-input">
                                        <label htmlFor="email">Your Email</label>
                                        <div className="pr">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Your Email"
                                                required
                                            />
                                            <i className="flaticon-envelope" />
                                        </div>
                                    </div>
                                    <div className="form-input">
                                        <label htmlFor="msg">Your Message</label>
                                        <div className="pr">
                                            <textarea
                                                id="msg"
                                                name="msg"
                                                placeholder="Message"
                                                required
                                                defaultValue={""}
                                            />
                                            <img
                                                src="/assets/images/icon/message.svg"
                                                width={20}
                                                height={20}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="theme-btn btn-style fill w-100">
                                        <span>Send Message</span>
                                    </button>
                                </form>
                                <div id="form-messages" className="mt-20" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact__image">
                                <img
                                    className="rounded-2 w-100 img-fluid"
                                    src="/assets/images/pages/contact.webp"
                                    width={645}
                                    height={560}
                                    alt="contact__image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pt-120">
                    <div className="row g-30 align-items-center">
                        <div className="col-lg-6">
                            <div className="contact__map">
                                <iframe
                                    className="w-100"
                                    height={560}
                                    src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=phuket+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                                    title="Map showing the location of My Business"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact__info">
                                <div className="contact__info__item">
                                    <h4>Hotel Info Center</h4>
                                    <p>
                                        Open Hours: Monday – Sunday <br />
                                        Telephone:&nbsp;+12505550199 <br />
                                        Fax: +12505550199 <br />
                                        Email:&nbsp;info@moonlit.com
                                    </p>
                                </div>
                                <div className="contact__info__item">
                                    <h4>Hotel location</h4>
                                    <p>
                                        Address: The Ritz-Carlton (California, USA) <br />
                                        Telephone:&nbsp;+12505550199 <br />
                                        Fax: +12505550199 <br />
                                        Email:&nbsp;info@moonlit.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* contact area end */}
        </>

    )
}

export default ContactOne