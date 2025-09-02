'use client'
import React, { useState, useEffect } from 'react'
import OffcanvasMenu from './OffcanvasMenu';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { User, BookOpen, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';

function HeaderOne() {
    const { isSignedIn, user } = useUser();
    const [isSticky, setIsSticky] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);
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
                                            <li className="navigation__menu--item">
                                                <Link href="/" className="navigation__menu--item__link nav-link-hotel">
                                                    Home
                                                </Link>
                                            </li>
                                            <li className="navigation__menu--item">
                                                <Link href="/room-two" className="navigation__menu--item__link nav-link-hotel">
                                                    Rooms
                                                </Link>
                                            </li>
                                            <li className="navigation__menu--item">
                                                <Link href="/service" className="navigation__menu--item__link nav-link-hotel">
                                                    Service
                                                </Link>
                                            </li>
                                            <li className="navigation__menu--item">
                                                <Link href="/about" className="navigation__menu--item__link nav-link-hotel">
                                                    About
                                                </Link>
                                            </li>
                                            <li className="navigation__menu--item">
                                                <Link href="/contact" className="navigation__menu--item__link nav-link-hotel">
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
                                        src="/assets/images/logo/logo.svg"
                                        alt="moonlit"
                                    />
                                </Link>
                            </div>
                            <div className="main__right">
                                {/* User Authentication */}
                                {isSignedIn ? (
                                    <div className="user-auth-container">
                                        {/* Admin Access (if admin) */}
                                        {user?.publicMetadata?.role === 'admin' && (
                                            <Link 
                                                href="/admin" 
                                                className="theme-btn btn-style sm-btn border admin-btn"
                                                onClick={() => toast.success('Opening Admin Dashboard')}
                                            >
                                                <Shield size={16} />
                                                <span className="btn-text-hotel">Admin</span>
                                            </Link>
                                        )}

                                        {/* User Profile Button with Custom Menu */}
                                        <div className="user-profile-container">
                                            <UserButton 
                                                afterSignOutUrl="/"
                                                appearance={{
                                                    elements: {
                                                        avatarBox: "user-avatar-hotel",
                                                        userButtonPopoverCard: "user-popover-hotel",
                                                        userButtonPopoverActions: "user-actions-hotel"
                                                    }
                                                }}
                                                userProfileMode="modal"
                                                userProfileUrl="/user-profile"
                                            >
                                                <UserButton.MenuItems>
                                                    <UserButton.Link
                                                        label="My Bookings"
                                                        labelIcon={<BookOpen size={16} />}
                                                        href="/my-bookings"
                                                    />
                                                    <UserButton.Action label="manageAccount" />
                                                    <UserButton.Action label="signOut" />
                                                </UserButton.MenuItems>
                                            </UserButton>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="auth-buttons-container">
                                        {/* Sign In Button - Modern Glass Effect */}
                                        <SignInButton mode="modal">
                                            <button 
                                                className="theme-btn btn-style sm-btn border auth-btn signin-btn modern-glass-btn"
                                                onClick={() => toast.success('Opening Sign In')}
                                            >
                                                <div className="btn-content-hotel">
                                                    <User size={16} className="btn-icon-hotel" />
                                                    <span className="btn-text-hotel">Sign In</span>
                                                </div>
                                                <div className="btn-shine-effect"></div>
                                            </button>
                                        </SignInButton>

                                        {/* Sign Up Button - Modern Gradient */}
                                        <SignUpButton mode="modal">
                                            <button 
                                                className="theme-btn btn-style sm-btn fill auth-btn signup-btn modern-gradient-btn"
                                                onClick={() => toast.success('Opening Sign Up')}
                                            >
                                                <div className="btn-content-hotel">
                                                    <span className="btn-text-hotel">Sign Up</span>
                                                </div>
                                                <div className="btn-glow-effect"></div>
                                            </button>
                                        </SignUpButton>
                                    </div>
                                )}

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
            {/* header menu end */}
        </>

    )
}

export default HeaderOne