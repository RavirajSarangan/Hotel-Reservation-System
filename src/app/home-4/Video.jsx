'use client'
import React, { useState } from "react";
import ReactPlayer from "react-player";

function VideoFour() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Video Modal */}
            {isOpen && (
                <div className="video-modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="video-modal-content">
                        <ReactPlayer
                            url="https://www.youtube.com/watch?v=qOwxqRGHy5Q"
                            playing
                            controls
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            )}
            <div className="rts__section">
                <div className="full__width w-100">
                    <div className="video__area position-relative wow fadeInUp">
                        <div className="video__area__image is__home__three jara-mask-3 jarallax">
                            <img
                                className="jarallax-img rounded-0"
                                src="/assets/images/video/video-bg-3.webp"
                                alt=""
                            />
                        </div>
                        <div className="video--spinner__wrapper ">
                            <div className="rts__circle">
                                <svg className="spinner" viewBox="0 0 100 100">
                                    <defs>
                                        <path
                                            id="circle-2"
                                            d="M50,50 m-37,0a37,37 0 1,1 74,0a37,37 0 1,1 -74,0"
                                        />
                                    </defs>
                                    <text>
                                        <textPath xlinkHref="#circle-2">
                                            Watch Now * Watch Now * Watch Full Video *
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="rts__circle--icon">
                                    <button
                                        className="video-play"
                                        onClick={() => setIsOpen(true)}
                                    >
                                        <i className="flaticon-play" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* video section end */}
        </>

    )
}

export default VideoFour