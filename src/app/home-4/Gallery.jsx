'use client'
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Core Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Modal from '../home-1/Modal';

function GalleryThree() {
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
            {/* our gallery */}
            <div className="rts__section gallery is__home__three pt-120 is__home__main">
                <div className="container-fluid">
                    <div className="row position-relative justify-content-center text-center mb-30">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                            <div className="section__topbar">
                                <span className="h6 subtitle__icon__four mx-auto">Gallery</span>
                                <h2 className="section__title mb-20">Our Gallery</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Swiper
                            className="insta__gallery__slider overflow-hidden gallery"
                            direction="horizontal"
                            slidesPerView={6}
                            spaceBetween={30}
                            grabCursor={true}
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            speed={1000}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                480: { slidesPerView: 2 },
                                576: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                992: { slidesPerView: 4 },
                                1200: { slidesPerView: 6 },
                            }}
                        >
                            {/* Gallery images */}
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <SwiperSlide key={num}>
                                    <div className="gallery__item">
                                        <img
                                            src={`/assets/images/insta/${num}.webp`}
                                            height={300}
                                            width={300}
                                            alt=""
                                            onClick={() => openModal(`/assets/images/insta/${num}.webp`)}
                                        />
                                        <button
                                            type="button"
                                            className="gallery__popup"
                                            onClick={() => openModal(`/assets/images/insta/${num}.webp`)}
                                        >
                                            <img
                                                src="/assets/images/icon/instagram.svg"
                                                height={40}
                                                width={40}
                                                alt=""
                                            />
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* our gallery end */}
            {/* Modal to display image */}
            <Modal isOpen={isModalOpen} closeModal={closeModal} imageSrc={modalImage} />
        </>
    );
}

export default GalleryThree;
