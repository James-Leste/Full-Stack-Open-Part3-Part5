/** @format */
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import Blog from './Blog'

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
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        addLike={addLike}
                        deletePost={deletePost}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Blogs
