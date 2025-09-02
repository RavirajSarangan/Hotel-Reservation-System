'use client'
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Core Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Modal from '../home-1/Modal';
// import Modal from './Modal'; // Import the Modal component

function GalleryTwo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');

    // Function to open the modal with the selected image
    const openModal = (imageSrc) => {
        setModalImage(imageSrc);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* gallery */}
            <div className="rts__section pb-120">
                <div className="container">
                    <div className="row position-relative justify-content-center text-center mb-30">
                        <div className="col-lg-6 wow fadeInUp">
                            <div className="section__topbar">
                                <span className="h6 subtitle__icon__three mx-auto">Gallery</span>
                                <h2 className="section__title">Our Gallery</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Swiper
                            className="gallery__slider overflow-hidden gallery"
                            direction="horizontal"
                            slidesPerView={4}
                            spaceBetween={30}
                            grabCursor={true}
                            loop={true}
                            centeredSlides={false}
                            autoplay={{
                                delay: 3000,
                            }}
                            speed={1000}
                            effect="slide"
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                575: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1200: { slidesPerView: 3 },
                                1400: { slidesPerView: 4 },
                            }}
                        >
                            {/* single gallery image */}
                            <SwiperSlide>
                                <div className="gallery__item">
                                    <img
                                        src="/assets/images/index-3/gallery/1.webp"
                                        alt=""
                                        height={300}
                                        width={300}
                                        onClick={() => openModal("assets/images/index-3/gallery/1.webp")}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </SwiperSlide>
                            {/* single gallery image end */}
                            {/* single gallery image */}
                            <SwiperSlide>
                            <div className="gallery__item">
                                    <img
                                        src="/assets/images/index-3/gallery/2.webp"
                                        alt=""
                                        height={300}
                                        width={300}
                                        onClick={() => openModal("assets/images/index-3/gallery/2.webp")}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </SwiperSlide>
                            {/* single gallery image end */}
                            {/* single gallery image */}
                            <SwiperSlide>
                            <div className="gallery__item">
                                    <img
                                        src="/assets/images/index-3/gallery/3.webp"
                                        alt=""
                                        height={300}
                                        width={300}
                                        onClick={() => openModal("assets/images/index-3/gallery/3.webp")}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </SwiperSlide>
                            {/* single gallery image end */}
                            {/* single gallery image */}
                            <SwiperSlide>
                            <div className="gallery__item">
                                    <img
                                        src="/assets/images/index-3/gallery/4.webp"
                                        alt=""
                                        height={300}
                                        width={300}
                                        onClick={() => openModal("assets/images/index-3/gallery/4.webp")}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </SwiperSlide>
                            {/* single gallery image end */}
                            {/* single gallery image */}
                            <SwiperSlide>
                            <div className="gallery__item">
                                    <img
                                        src="/assets/images/index-3/gallery/5.webp"
                                        alt=""
                                        height={300}
                                        width={300}
                                        onClick={() => openModal("assets/images/index-3/gallery/5.webp")}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </SwiperSlide>
                            {/* single gallery image end */}
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* gallery end */}
            <Modal isOpen={isModalOpen} closeModal={closeModal} imageSrc={modalImage} />
        </>

    )
}

export default GalleryTwo