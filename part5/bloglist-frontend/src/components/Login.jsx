/** @format */
import PropTypes from 'prop-types'

const Login = ({
    username,
    password,
    handleUsername,
    handlePassword,
    handleLogin,
}) => (
    <div>
        <h1>Login to the application</h1>
        <form onSubmit={handleLogin}>
            <div>
                Username: <input value={username} onChange={handleUsername} />
            </div>
            <div>
                Password: <input value={password} onChange={handlePassword} />
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    </div>
)

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsername: PropTypes.func.isRequired,
    handlePassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default Login
