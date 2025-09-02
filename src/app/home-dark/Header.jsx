'use client'
import React, { useState, useEffect } from 'react'
import OffcanvasMenu from '../home-1/OffcanvasMenu';
import Link from 'next/link';
import LoginForm from '../form/LoginForm';
import SignUpForm from '../form/SignUpForm';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';

function HeaderOne() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const { user } = useUser();

    // Check if user has admin role
    const userRole = user?.publicMetadata?.role;
    const isAdmin = ['super_admin', 'manager', 'receptionist', 'admin'].includes(userRole);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        setHydrated(true);

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            {/* header menu */}
            <header className={`main__header header__function ${hydrated && isSticky ? 'is__sticky' : ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="main__header__wrapper">
                            <div className="main__nav">
                                <div className="navigation d-none d-lg-block">
                                    <nav className="navigation__menu" id="main__menu">
                                        <ul className="list-unstyled">
                                            <li className="navigation__menu--item has-child has-arrow">
                                                <Link href="/" className="navigation__menu--item__link">
                                                    Home
                                                </Link>
                                                <div className="has__mega__menu">
                                                    <div className="row g-30 row-cols-1 row-cols-md-3 row-cols-lg-5">
                                                        <div className="menu__item">
                                                            <Link href="/">
                                                                <img
                                                                    src="/assets/images/menu/main.webp"
                                                                    height={250}
                                                                    alt=""
                                                                />
                                                                <span>Luxury Hotel</span>
                                                            </Link>
                                                        </div>
                                                        <div className="menu__item">
                                                            <Link href="/home-2">
                                                                <img
                                                                    src="/assets/images/menu/01.webp"
                                                                    height={250}
                                                                    alt=""
                                                                />
                                                                <span>LuxeVista Hotel</span>
                                                            </Link>
                                                        </div>
                                                        <div className="menu__item">
                                                            <Link href="/home-3">
                                                                <img
                                                                    src="/assets/images/menu/03.webp"
                                                                    height={250}
                                                                    alt=""
                                                                />
                                                                <span>OceanBreeze Resort</span>
                                                            </Link>
                                                        </div>
                                                        <div className="menu__item">
                                                            <Link href="/home-4">
                                                                <img
                                                                    src="/assets/images/menu/04.webp"
                                                                    height={250}
                                                                    alt=""
                                                                />
                                                                <span>Apartment Hotel</span>
                                                            </Link>
                                                        </div>
                                                        <div className="menu__item">
                                                            <Link href="/home-5">
                                                                <img
                                                                    src="/assets/images/menu/4.webp"
                                                                    height={250}
                                                                    alt=""
                                                                />
                                                                <span>Mountain Hotel</span>
                                                            </Link>
                                                        </div>
                                                        <div className="menu__item">
                                                            <Link href="/home-6">
                                                                <img
                                                                    src="/assets/images/menu/5.webp"
                                                                    height={250}
                                                                    alt=""
                                                                />
                                                                <span>City Hotel</span>
                                                            </Link>
                                                        </div>
                                                        <div className="menu__item">
                                                            <Link href="/home-7">
                                                                <img
                                                                    src="/assets/images/menu/6.webp"
                                                                    height={250}
                                                                    alt=""
                                                                />
                                                                <span>Beach Hotel</span>
                                                            </Link>
                                                        </div>
                                                        <div className="menu__item">
                                                            <Link href="/home-dark">
                                                                <img
                                                                    src="/assets/images/menu/hotel-dark.webp"
                                                                    height={250}
                                                                    alt=""
                                                                />
                                                                <span>Beach Hotel</span>
                                                            </Link>
                                                        </div>
                                                        <div className="menu__item">
                                                            <Link href="/home-video">
                                                                <img
                                                                    src="/assets/images/menu/08.webp"
                                                                    height={250}
                                                                    alt=""
                                                                />
                                                                <span>Hotel Seaside</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="navigation__menu--item has-child has-arrow">
                                                <Link href="/" className="navigation__menu--item__link">
                                                    Rooms
                                                </Link>
                                                <ul className="submenu sub__style" role="menu">
                                                    <li role="menuitem" className="has-child has-arrow">
                                                        <Link href="/">Room Style</Link>
                                                        <ul className="sub__style" role="menu">
                                                            <li role="menuitem">
                                                                <Link href="/room-one">Room One</Link>
                                                            </li>
                                                            <li role="menuitem">
                                                                <Link href="/room-two">Room Two</Link>
                                                            </li>
                                                            <li role="menuitem">
                                                                <Link href="/room-three">Room Three</Link>
                                                            </li>
                                                            <li role="menuitem">
                                                                <Link href="/room-four">Room Four</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li role="menuitem" className="has-child has-arrow">
                                                        <Link href="/">Room Details</Link>
                                                        <ul className="sub__style" role="menu">
                                                            <li role="menuitem">
                                                                <Link href="/room/the-ritz-carlton">Room Details 1</Link>
                                                            </li>
                                                            <li role="menuitem">
                                                                <Link href="/room2/the-ritz-carlton">Room Details 2</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="navigation__menu--item has-child has-arrow">
                                                <Link href="/" className="navigation__menu--item__link">
                                                    Pages
                                                </Link>
                                                <ul className="submenu sub__style" role="menu">
                                                    <li role="menuitem">
                                                        <Link href="/about">About</Link>
                                                    </li>
                                                    <li role="menuitem">
                                                        <Link href="/resturant">Restaurant</Link>
                                                    </li>
                                                    <li role="menuitem">
                                                        <Link href="/gallery">Gallery</Link>
                                                    </li>
                                                    <li role="menuitem">
                                                        <Link href="/service">Service</Link>
                                                    </li>
                                                    <li role="menuitem">
                                                        <Link href="/event">Event</Link>
                                                    </li>
                                                    <li role="menuitem">
                                                        <Link href="/activities">Activities</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="navigation__menu--item has-child has-arrow">
                                                <Link href="/" className="navigation__menu--item__link">
                                                    Blog
                                                </Link>
                                                <ul className="submenu sub__style" role="menu">
                                                    <li role="menuitem">
                                                        <Link href="/blog">Blog</Link>
                                                    </li>
                                                    <li role="menuitem">
                                                        <Link href="/blog/Live-Elegantly-in-Our-Contemporary-Suite-for-Apartment">Blog Details</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="navigation__menu--item">
                                                <Link
                                                    href="/contact"
                                                    className="navigation__menu--item__link"
                                                >
                                                    Contact
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="main__logo">
                                <Link href="/">
                                    <img
                                        className="logo__class"
                                        src="assets/images/logo/logo__two.svg"
                                        alt="moonlit"
                                    />
                                </Link>
                            </div>
                            <div className="main__right">
                                {/* Authentication Section with Clerk */}
                                <SignedOut>
                                    {/* Sign In Button */}
                                    <SignInButton mode="modal">
                                        <button className="theme-btn btn-style sm-btn border d-none d-lg-block">
                                            <span>Sign In</span>
                                        </button>
                                    </SignInButton>

                                    {/* Sign Up Button */}
                                    <Link href="/sign-up" className="theme-btn btn-style sm-btn border d-none d-lg-block ml-2">
                                        <span>Sign Up</span>
                                    </Link>
                                </SignedOut>

                                <SignedIn>
                                    {/* User Profile and Admin Access */}
                                    <div className="user-section d-flex align-items-center">
                                        {isAdmin && (
                                            <Link href="/admin" className="theme-btn btn-style sm-btn fill mr-3 d-none d-lg-block">
                                                <span>🏨 Admin Panel</span>
                                            </Link>
                                        )}
                                        <Link href="/my-bookings" className="theme-btn btn-style sm-btn border mr-3 d-none d-lg-block">
                                            <span>📋 My Bookings</span>
                                        </Link>
                                        <div className="user-avatar">
                                            <UserButton 
                                                afterSignOutUrl="/home-video"
                                                appearance={{
                                                    elements: {
                                                        avatarBox: "w-10 h-10"
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </SignedIn>

                                {/* Book Now Button */}
                                <Link href="/room" className="theme-btn btn-style sm-btn fill ml-3">
                                    <span>Book Now</span>
                                </Link>

                                {/* Mobile Menu Button */}
                                <button
                                    className="theme-btn btn-style sm-btn fill menu__btn d-lg-none"
                                    onClick={() => setIsOffcanvasOpen(true)}
                                >
                                    <span>
                                        <img src="/assets/images/icon/menu-icon.svg" alt="menu" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <OffcanvasMenu isOpen={isOffcanvasOpen} onClose={() => setIsOffcanvasOpen(false)} />
            {/* Login Form Modal */}
            <LoginForm
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSignupOpen={() => {
                    setIsLoginOpen(false);
                    setIsSignupOpen(true);
                }}
            />
            {/* Sign Up Form Modal */}
            <SignUpForm
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onLoginOpen={() => {
                    setIsSignupOpen(false);
                    setIsLoginOpen(true);
                }}
            />
            {/* header menu end */}
        </>

    )
}

export default HeaderOne