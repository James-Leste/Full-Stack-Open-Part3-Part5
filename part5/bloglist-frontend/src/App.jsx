/** @format */

import { useState, useEffect } from 'react'

import Login from './components/Login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

import login from './services/login'
import blogService from './services/blogs'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState('')
    const [user, setUser] = useState(null)
    const [refreshBlogs, setRefreshBlogs] = useState(false)
    const [loginVisible, setLoginVisible] = useState(false)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await login(username, password)
            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setMessage('Invalid Password or Username')
            setUsername('')
            setPassword('')
            console.log(exception)
            setTimeout(() => {
                setMessage('')
            }, '3000')
        }
    }
    const handleLogout = (event) => {
        window.localStorage.clear()
        setUser(null)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title === "" ? null : title,
            author: author === "" ? null : author,
            url: url === "" ? null : url,
        }
        try {
            await blogService.create(newBlog)
            setMessage(
                `created post: {title:${title}, author: ${author}, url:${url}}`
            )
            setTimeout(() => {
                setMessage('')
            }, '10000')
            setRefreshBlogs(!refreshBlogs)
        } catch (exception) {
            setMessage(exception.message)
        }
    }

    if (user === null) {
        return (
            <div>
                <Notification message={message} />
                <Login
                    username={username}
                    password={password}
                    handlePassword={handlePassword}
                    handleUsername={handleUsername}
                    handleLogin={handleLogin}
                />
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <span>{user.username} has logged in</span>
                </div>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div>
                    <Notification message={message} />
                </div>
                <Togglable buttonLabel={'New Post'}>
                    <NewBlog
                        title={title}
                        author={author}
                        url={url}
                        handleTitle={(event) => setTitle(event.target.value)}
                        handleAuthor={(event) => setAuthor(event.target.value)}
                        handleUrl={(event) => setUrl(event.target.value)}
                        handleSubmit={handleCreateBlog}
                    />
                </Togglable>
                <Blogs refreshBlogs={refreshBlogs}/>
            </div>
        )
    }
}

export default App
