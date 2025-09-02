import React from 'react'
import HeaderThree from './Header'
import BannerFour from './Banner'
import ApartmentOne from './Apartment'
import FacilitiesThree from './Facilities'
import TestimonialFour from './Testimonial'
import VideoFour from './Video'
import BlogOne from './Blog'
import GalleryThree from './Gallery'
import FooterThree from './Footer'
import ServiceOne from './Service'
import postsData from '../data/data-post.json';
import BackToTop from '../home-1/BackToTop'
import GDPRCookie from '../home-1/GDPRCookie'

function page() {
    return (
        <>
            <GDPRCookie
                settings={{
                    title: "Accept Cookies & privacy",
                    message: "Cookies enable you to use shopping carts and to personalize your experience on our sites, tell us which parts of our websites people have visited, help us measure the effectiveness of ads and web searches.",
                    expires: 90, // Cookie expiration in days
                }}
            />
            <HeaderThree />
            <BannerFour />
            <ApartmentOne />
            <FacilitiesThree />
            <TestimonialFour />
            <VideoFour />
            <BlogOne posts={postsData} />
            <ServiceOne />
            <GalleryThree />
            <FooterThree />
            <BackToTop />
        </>
    )
}

export default page