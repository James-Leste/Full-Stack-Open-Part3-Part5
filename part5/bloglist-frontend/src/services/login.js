/** @format */

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async (username, password) => {
    const credential = {
        username: username,
        password: password,
    }
    const response = await axios.post(baseUrl, credential)
    console.log(response.data)
    return response.data
}

export default login
