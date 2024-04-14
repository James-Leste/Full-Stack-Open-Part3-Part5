/** @format */
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blogs = ({refreshBlogs, handleLike}) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await blogService.getAll()
            setBlogs(response)
            console.log(response)
        }
        fetchData()
    }, [refreshBlogs])

    const addLike = async (blog) => {
        await handleLike(blog)
        console.log(blog)
    }

    return (
        <div>
            <ul>
                {blogs.map((blog) => (
                    
                        <li key={blog.id} style={{border: 'solid', marginBottom: 5 + 'px'}}>
                            Title: {blog.title} <br /> 
                            Author: {blog.author} <br />
                            <Togglable buttonLabel={'View'}>
                                Likes: {blog.likes} <button onClick={()=>{addLike(blog)}}>like</button><br />
                                Url: {blog.url} <br />
                                BlogId: {blog.id} <br />
                                Username: {blog.user.username}
                            </Togglable>
                        </li>
                    
                ))}
            </ul>
        </div>
    )
}

export default Blogs
