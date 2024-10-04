import React from 'react'
import './post.css'
import {Link} from 'react-router-dom'

export function Post({post}) {
    const PF="http://localhost:8101/images/"

    return (
        <div className="post">
            <div className="postContainer">
                <div className="post1">
                    {post.photo && (
                    <img className='postImg' src={PF + post.photo} alt="" />
                )}
                {post.categories.map((c) => (
                    <span className='postmusic'>{c.name}</span>
                ))}
                 <Link to={`/post/${post._id}`} className='link'>
                 <h1 className='postTitle'>{post.title}</h1>
                 </Link>
                 <span className='time'>{new Date(post.createdAt).toDateString()}</span>
                 <p className='postpara1'>{post.desc}</p>
                </div>
                

            </div>

          

    
        </div>
    )
}
