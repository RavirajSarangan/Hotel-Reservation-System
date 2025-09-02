import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Posts from '../data/data-post.json';

function BlogDetailsMain() {
    const { id } = useParams();
    const blogPost = Posts.find(post => post.id.toString() === id);

    console.log("Blog Post:", blogPost); // Debugging

    if (!blogPost) {
        return <div>Post not found!</div>;
    }

    return (
        <>
            {/* Page Header */}
            <div
                className="rts__section page__hero__height page__hero__bg if__is__blog"
                style={{
                    backgroundImage: blogPost.blogImage
                        ? `url(/assets/images/pages/blog/${blogPost.blogImage})`
                        : "none"
                }}
            >
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-12">
                            <div className="page__hero__content">
                                <Link to="#" className="texonomy h6 wow fadeInUp">
                                    {blogPost.category}
                                </Link>
                                <h1 className="wow fadeInUp">
                                    {blogPost.title}
                                </h1>
                                <div className="author__meta wow fadeInUp">
                                    <Link to="#">
                                        <img
                                            src="/assets/images/author/3.webp"
                                            height={40}
                                            width={40}
                                            alt="Author"
                                        />
                                        {blogPost.author}
                                    </Link>
                                    <span>
                                        <img src="/assets/images/icon/clock.svg" alt="Clock" /> 10 Min Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            <div className="rts__section section__padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-10">
                            <div className="blog__details">
                                <div className="blog__details__content">
                                    <p className="description">
                                        Welcome to Career Compass, your ultimate destination for career
                                        advice, job search strategies, and professional development
                                        insights. Whether you're a recent graduate, seasoned professional,
                                        or someone considering a career change, our blog is your trusted
                                        guide to help you navigate the ever-evolving landscape of the job
                                        market.
                                        <br />
                                        At Career Compass, we understand that finding the right career
                                        path can be daunting. That's why we offer a wealth of resources to
                                        empower you on your journey. From resume writing tips and
                                        interview techniques to networking advice and skill-building
                                        strategies, our expert contributors share their knowledge and
                                        expertise to equip you with the tools you need to succeed.
                                    </p>
                                    <img
                                        className="rounded-3 my-4 img-fluid"
                                        width={870}
                                        height={500}
                                        src="/assets/images/pages/blog/details.webp"
                                        alt=""
                                    />
                                    <h6 className="mb-4 mt-4">Hotel Service</h6>
                                    <ul className="service-list list-unstyled">
                                        <li>
                                            <img src="/assets/images/icon/check-fill.svg" alt="" />
                                            Romantic Getaway
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/check-fill.svg" alt="" />
                                            Family Vacation
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/check-fill.svg" alt="" />
                                            Event Planning
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/check-fill.svg" alt="" />
                                            Seasonal Promotions
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/check-fill.svg" alt="" />
                                            Conference Venues
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/check-fill.svg" alt="" />
                                            Special Offers
                                        </li>
                                    </ul>
                                    <h6 className="mb-4 mt-4">
                                        Real Guest Stories: Unforgettable Stays at Bokinn
                                    </h6>
                                    <p className="description">
                                        Welcome to Career Compass, your ultimate destination for career
                                        advice, job search strategies, and professional development
                                        insights. Whether you're a recent graduate, seasoned professional,
                                        or someone considering a career change, our blog is your trusted
                                        guide to help you navigate the ever-evolving landscape of the job
                                        market.
                                    </p>
                                    <blockquote className="rts__blockquote">
                                        <span className="blockquote__text">
                                            Contrary to popular belief, Lorem Ipsum is not simply random
                                            text. It has roots in a piece of classical Latin literature from
                                            45 BC, making it over 2000 years old. Richard McClintock, a
                                            Latin professor at Hampden-Sydney College in Virginia
                                        </span>
                                    </blockquote>
                                    <p className="description">
                                        At Career Compass, we understand that finding the right career
                                        path can be daunting. That's why we offer a wealth of resources to
                                        empower you on your journey. From resume writing tips and
                                        interview techniques to networking advice and skill-building
                                        strategies, our expert contributors share their knowledge and
                                        expertise to equip you with the tools you need to succeed.
                                    </p>
                                    <h6 className="mb-30">Tags</h6>
                                    <div className="tag__list mb-30">
                                        <div className="tags__list">
                                            <Link to="#">Hotel Stay</Link>
                                            <Link to="#">Travel Blog</Link>
                                            <Link to="#">Guest Experience</Link>
                                            <Link to="#"> Hotel Guide</Link>
                                            <Link to="#">Hotel Review</Link>
                                        </div>
                                    </div>
                                    <div className="share mb-30">
                                        <h6 className="mb-20">Share</h6>
                                        <div className="social__link">
                                            <Link to="#">
                                                <i className="flaticon-linkedin" />
                                            </Link>
                                            <Link to="#">
                                                <i className="flaticon-twitter-alt-circle" />
                                            </Link>
                                            <Link to="#">
                                                <i className="flaticon-whatsapp" />
                                            </Link>
                                            <Link to="#">
                                                <i className="flaticon-facebook-messenger" />
                                            </Link>
                                        </div>
                                    </div>
                                    <h6 className="mb-30">Comment</h6>
                                    <div className="comment__list">
                                        <div className="comment__item">
                                            <div className="comment__item__author">
                                                <div className="author__img">
                                                    <img
                                                        className="rounded-1"
                                                        src="/assets/images/author/3.webp"
                                                        width={60}
                                                        height={60}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="author__info">
                                                    <h6 className="font-20 mb-0">Jonathon Doe</h6>
                                                    <span>A week ago</span>
                                                </div>
                                            </div>
                                            <div className="comment__text">
                                                <p className="font-sm">
                                                    I still have a lot of studying to do using this course and
                                                    the other practice exams, but so far it's been great! I have
                                                    not taken my Security+ exam as well, so I'll update this at
                                                    a later time.
                                                </p>
                                                <Link to="#">
                                                    <img src="/assets/images/icon/reply.svg" alt="" />
                                                    Reply
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="comment__item">
                                            <div className="comment__item__author">
                                                <div className="author__img">
                                                    <img
                                                        className="rounded-1"
                                                        src="/assets/images/author/4.webp"
                                                        width={60}
                                                        height={60}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="author__info">
                                                    <h6 className="font-20 mb-0">Michael Roy </h6>
                                                    <span>A week ago</span>
                                                </div>
                                            </div>
                                            <div className="comment__text">
                                                <p className="font-sm">
                                                    I still have a lot of studying to do using this course and
                                                    the other practice exams, but so far it's been great! I have
                                                    not taken my Security+ exam as well, so I'll update this at
                                                    a later time.
                                                </p>
                                                <Link to="#">
                                                    <img src="/assets/images/icon/reply.svg" alt="" />
                                                    Reply
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* comment form */}
                                    <div className="comment__form mt-40">
                                        <h6 className="mb-3">Leave a Comment</h6>
                                        <form action="#" className="comment__form__content">
                                            <div className="input-group">
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder="Your Name"
                                                        required=""
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Your Email</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Your Email"
                                                        required=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="msg">Your Comment</label>
                                                <textarea
                                                    id="msg"
                                                    name="msg"
                                                    className="form-control"
                                                    placeholder="Your message"
                                                    required=""
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <button type="submit" className="theme-btn btn-style fill mt-4">
                                                <span>Submit Comment</span>
                                            </button>
                                        </form>
                                    </div>
                                    {/* comment form end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogDetailsMain;
