/** @format */

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [user, setUser] = useState({})

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await login(username, password)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessage('Logged in successfully')
        } catch (exception) {
            setMessage('Invalid Password or Username')
            console.log(exception)
        }
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    return (
        <div>
            <Login
                username={username}
                password={password}
                handlePassword={handlePassword}
                handleUsername={handleUsername}
                handleLogin={handleLogin}
            />
            <Notification message={message} />
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
