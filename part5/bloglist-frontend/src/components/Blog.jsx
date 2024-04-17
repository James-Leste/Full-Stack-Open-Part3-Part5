/** @format */

import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ blog, user, deletePost, addLike }) => {
    return (
        <li key={blog.id} style={{ border: 'solid', marginBottom: 5 + 'px' }}>
            <div>Title: {blog.title}</div>
            <div>Author: {blog.author}</div>
            <Togglable buttonLabel={'View'}>
                <div>Likes: {blog.likes} </div>
                <button
                    onClick={async () => {
                        await addLike(blog)
                    }}
                >
                    like
                </button>
                <div>Url: {blog.url}</div>
                <div>BlogId: {blog.id}</div>
                <div>Username: {blog.user.username}</div>
            </Togglable>
            <div>{blog.user.id}</div>
            <div>{user.id}</div>
            <div
                style={{
                    display: blog.user.id === user.id ? '' : 'none',
                }}
            >
                <button
                    onClick={async () => {
                        await deletePost(blog)
                    }}
                >
                    remove
                </button>
            </div>
        </li>
    )
}

export default Blog
