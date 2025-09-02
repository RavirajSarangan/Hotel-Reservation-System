import Link from 'next/link';
import React from 'react'

function PostThree(props) {
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
            <div className="blog__item is__has__radius">
                <div className="blog__item__thumb">
                    <Link href={`/blog/${Slug || "details"}`}>
                        <img
                            height={250}
                            width={360}
                            src={Img || "/assets/images/pages/blog/1.webp"}
                            alt=""
                        />
                    </Link>
                </div>
                <div className="blog__item__meta">
                    <Link href="#" className="blog__item__meta__cat">
                        {Category || "Urban Oasis Living"}
                    </Link>
                    <Link href={`/blog/${Slug || "details"}`} className="blog__item__meta__title">
                        <h6>{Title || "Live Elegantly in Our Contemporary Suite for Apartment"}</h6>
                    </Link>
                    <div className="blog__item__meta__list">
                        <span className="blog__item__meta__list__item">
                            <img src="/assets/images/icon/calendar.svg" alt="" />
                            March 26, 2024
                        </span>
                        <span className="blog__item__meta__list__item">
                            <Link href="#">
                                <img src={AuthorImg || "/assets/images/icon/person.svg"} alt="" />
                                {Author || "Amin"}
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostThree