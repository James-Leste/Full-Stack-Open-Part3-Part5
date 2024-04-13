/** @format */
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await blogService.getAll()
            setBlogs(response)
            console.log(response)
        }
        fetchData()
    }, [])

    return (
        <div>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        {blog.title} {blog.author}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Blogs
