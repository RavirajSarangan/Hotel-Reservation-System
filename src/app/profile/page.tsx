'use client';

import React from 'react'
import TopBar from '../home-1/TopBar'
import HeaderOne from '../home-1/Header'
import BreadcrumbOne from '../breadcrumb/Breadcrumb'
import FooterOne from '../home-1/FooterOne'

export default function ProfilePage() {
    return (
        <>
            <TopBar />
            <HeaderOne />
            <BreadcrumbOne
                title="My Profile"
                description="Manage your account information and preferences."
                bgImage="/assets/images/pages/header__bg.webp"
            />
            
            {/* Profile Section - Original Hotel Theme */}
            <div className="rts__section pt--120 pb--120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section__title text-center mb--80">
                                <span className="section__title__subtitle">Account Settings</span>
                                <h2 className="section__title__heading">My Profile</h2>
                                <p className="section__title__description">
                                    Manage your personal information and preferences
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-10">
                            <div className="room__card">
                                <div className="room__card__meta">
                                    <div className="profile__header">
                                        <div className="profile__avatar">
                                            <img 
                                                src="/assets/images/pages/room/1.webp" 
                                                alt="Profile" 
                                                style={{width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover'}}
                                            />
                                        </div>
                                        <div className="profile__info">
                                            <h3 className="room__card__title h4">John Doe</h3>
                                            <p className="profile__email">john.doe@example.com</p>
                                            <span className="profile__status">Gold Member</span>
                                        </div>
                                    </div>
                                    
                                    <div className="profile__section">
                                        <h4 className="h6 mb-3">Personal Information</h4>
                                        <div className="profile__info__grid">
                                            <div className="profile__info__item">
                                                <span className="profile__label">
                                                    <i className="flaticon-user" />
                                                    Full Name:
                                                </span>
                                                <span className="profile__value">John Doe</span>
                                            </div>
                                            <div className="profile__info__item">
                                                <span className="profile__label">
                                                    <i className="flaticon-phone" />
                                                    Phone:
                                                </span>
                                                <span className="profile__value">+1 (555) 123-4567</span>
                                            </div>
                                            <div className="profile__info__item">
                                                <span className="profile__label">
                                                    <i className="flaticon-location" />
                                                    Address:
                                                </span>
                                                <span className="profile__value">123 Main St, City, State</span>
                                            </div>
                                            <div className="profile__info__item">
                                                <span className="profile__label">
                                                    <i className="flaticon-calendar" />
                                                    Member Since:
                                                </span>
                                                <span className="profile__value">January 2023</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="profile__section">
                                        <h4 className="h6 mb-3">Hotel Preferences</h4>
                                        <div className="profile__info__grid">
                                            <div className="profile__info__item">
                                                <span className="profile__label">
                                                    <i className="flaticon-bed" />
                                                    Room Type:
                                                </span>
                                                <span className="profile__value">Ocean View Suite</span>
                                            </div>
                                            <div className="profile__info__item">
                                                <span className="profile__label">
                                                    <i className="flaticon-bed" />
                                                    Bed Preference:
                                                </span>
                                                <span className="profile__value">King Size</span>
                                            </div>
                                            <div className="profile__info__item">
                                                <span className="profile__label">
                                                    <i className="flaticon-construction" />
                                                    Floor Preference:
                                                </span>
                                                <span className="profile__value">High Floor</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="profile__actions">
                                        <a href="#" className="room__card__link">
                                            Edit Profile
                                        </a>
                                        <a href="/my-bookings" className="room__card__link ml-3">
                                            View Bookings
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterOne />
        </>
    )
}
