/** @format */

import { useState, useEffect } from 'react'

import Login from './components/Login'
import Notification from './components/Notification'
import Blog from './components/Blog'

import login from './services/login'

const App = () => {
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

    if (user === null) {
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
            </div>
        )
    } else {
        <div>
            
        </div>
    }

    
}

export default App
