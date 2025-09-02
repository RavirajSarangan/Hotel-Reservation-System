import Link from 'next/link';
import React from 'react'

function PostFour(props) {
    const {
        Slug,
        Img,
        Title,
        Category,
        Author,
        AuthorImg
    } = props;
    return (
        <>
            <div className="single__blog">
                <div className="single__blog__thumb">
                    <Link href={`/blog/${Slug || "details"}`}>
                        <img
                            src={Img || "/assets/images/pages/blog/1.webp"}
                            height={490}
                            width={760}
                            alt=""
                        />
                    </Link>
                </div>
                <div className="single__blog__meta">
                    <Link href="#" className="category">
                        {Category || "Urban Oasis Living"}
                    </Link>
                    <Link href={`/blog/${Slug || "details"}`} className="h5">
                        {Title || "Live Elegantly in Our Contemporary Suite for Apartment"}
                    </Link>
                    <p>
                        In today's ever-evolving business landscape, staying ahead of
                        the curve is essential for success. Whether you're a seasoned
                        entrepreneur or just starting out, the key to thriving in this
                        dynamic environment lies in adaptability and innovation.
                    </p>
                    <div className="single__blog__meta__main">
                        <div className="author__meta">
                            <Link href="#">
                                <img
                                    src={AuthorImg || "/assets/images/icon/person.svg"}
                                    height={40}
                                    width={40}
                                    alt=""
                                />
                                {Author || "Amin"}
                            </Link>
                            <span>
                                <img src="assets/images/icon/clock.svg" alt="" /> 10 Min
                                Read
                            </span>
                        </div>
                        <div className="readmore">
                            <Link href={`/blog/${Slug || "details"}`}>Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostFour