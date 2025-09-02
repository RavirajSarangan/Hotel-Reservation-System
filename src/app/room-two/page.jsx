'use client'
import React, { useEffect } from 'react'
import TopBar from '../home-1/TopBar'
import HeaderOne from '../home-1/Header'
import BreadcrumbOne from '../breadcrumb/Breadcrumb'
import RoomSeven from '../room/RoomSeven'
import TestimonialFive from '../home-5/Testimonial'
import FooterOne from '../home-1/FooterOne'
import BackToTop from '../home-1/BackToTop'
import GDPRCookie from '../home-1/GDPRCookie'
import { toast } from 'react-hot-toast'

function page() {
    useEffect(() => {
        // Welcome message when page loads
        toast.success('🏨 Welcome to our Deluxe Rooms!', {
            duration: 3000,
            style: {
                background: '#10B981',
                color: '#fff',
            },
        });
    }, []);

    return (
        <>
            <GDPRCookie
                settings={{
                    title: "Accept Cookies & privacy",
                    message: "Cookies enable you to use shopping carts and to personalize your experience on our sites, tell us which parts of our websites people have visited, help us measure the effectiveness of ads and web searches.",
                    expires: 90, // Cookie expiration in days
                }}
            />
            <TopBar />
            <HeaderOne />
            <BreadcrumbOne
                title="Deluxe Room"
                description="A step up from the standard room, often with better views, more space, and additional amenities."
            />
            <RoomSeven />
            <TestimonialFive />
            <FooterOne />
            <BackToTop />
        </>
    )
}

export default page