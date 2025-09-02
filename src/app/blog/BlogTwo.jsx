import React from 'react'
import PostThree from './PostThree'
import posts from '../data/data-post.json'

function BlogTwo() {
    return (
        <>
            {/* blog style */}
            <div className="rts__section blog is__home__three">
                <div className="container">
                    <div className="row justify-content-center text-center mb-40">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                            <div className="section__topbar">
                                <span className="h6 subtitle__icon__three mx-auto">Blog</span>
                                <h2 className="section__title">See Our Latest Blog</h2>
                            </div>
                        </div>
                    </div>
                    {/* row end */}
                    <div className="row g-30">
                        {posts.map((data, index) => {
                            return (
                                <div key={index} className="col-lg-6 col-xl-4 col-md-6">
                                    {
                                        <PostThree
                                            blogCategory={data.category}
                                            blogID={data.id}
                                            blogImage={`${data.image}`}
                                            authorImg={`${data.authorImg}`}
                                            blogTitle={data.title}
                                            blogAuthor={data.author}
                                            blogPublishedDate={data.publishedDate}
                                        />
                                    }
                                </div>
                            )
                        }).slice(4, 7)}
                    </div>
                </div>
            </div>
            {/* blog style end */}
        </>

    )
}

export default BlogTwo