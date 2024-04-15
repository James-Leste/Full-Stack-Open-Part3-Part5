/** @format */
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blogs = ({ refreshBlogs, handleLike, handleDelete, user }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await blogService.getAll()
            response.sort((a, b) => b.likes - a.likes)
            setBlogs(response)
            console.log(response)
        }
        fetchData()
    }, [refreshBlogs])

    const addLike = async (blog) => {
        await handleLike(blog)
        console.log(blog)
    }

    const deletePost = async (blog) => {
        await handleDelete(blog)
        console.log(blog)
    }

    return (
        <div>
            <ul>
                {blogs.map((blog) => (
                    <li
                        key={blog.id}
                        style={{ border: 'solid', marginBottom: 5 + 'px' }}
                    >
                        Title: {blog.title} <br />
                        Author: {blog.author} <br />
                        <Togglable buttonLabel={'View'}>
                            Likes: {blog.likes}{' '}
                            <button
                                onClick={async () => {
                                    await addLike(blog)
                                }}
                            >
                                like
                            </button>
                            <br />
                            Url: {blog.url} <br />
                            BlogId: {blog.id} <br />
                            Username: {blog.user.username}
                        </Togglable>
                        <div style={{display: blog.user.id === user.id ? '' : 'none'}}>
                            <button onClick={async () => {await deletePost(blog)}}>remove</button>
                        </div>             
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Blogs
