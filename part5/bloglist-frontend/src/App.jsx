/** @format */

import { useState, useEffect } from 'react'

import Login from './components/Login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'

import login from './services/login'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          setUser(user)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await login(username, password)
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            ) 
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setMessage('Invalid Password or Username')
            console.log(exception)
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

    if (user === null){
        return (
            <div>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
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
        return (
            <div>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <Blogs />
            </div>
       
        )
    }
    
}

export default App
