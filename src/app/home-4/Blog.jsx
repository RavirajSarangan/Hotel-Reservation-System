import React from 'react';
import posts from '../data/data-post.json';
import PostOne from '../blog/PostOne';
import PostTwo from '../blog/PostTwo';

function BlogOne() {
    return (
        <>
            {/* Blog Section */}
            <div className="rts__section blog is__home__three section__padding">
                <div className="container">
                    <div className="row justify-content-center text-center mb-40">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                            <div className="section__topbar">
                                <span className="h6 subtitle__icon__four mx-auto">Blog</span>
                                <h2 className="section__title mb-20">See Our Latest Blog</h2>
                                <span className="font-sm" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Blog Posts */}
                    <div className="row g-30">
                        {/* First Blog Post (Large) */}
                        <div className="col-lg-6">
                            {posts.slice(0, 1).map((data, index) => (
                                <div key={data.id || index}>
                                    <PostOne
                                        Slug={data.slug}
                                        Title={data.title}
                                        Img={data.image}
                                        Category={data.category}
                                        AuthorImg={data.authorImg}
                                        Author={data.author}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Next Three Blog Posts (Small List) */}
                        <div className="col-lg-6">
                            <div className="blog__small__list">
                                {posts.slice(1, 4).map((data, index) => (
                                    <div key={data.id || index}>
                                        <PostTwo
                                            Slug={data.slug}
                                            Title={data.title}
                                            Img={data.image}
                                            Category={data.category}
                                            AuthorImg={data.authorImg}
                                            Author={data.author}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogOne;
