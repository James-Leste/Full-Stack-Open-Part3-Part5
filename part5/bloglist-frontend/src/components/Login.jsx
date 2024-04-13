/** @format */

const Login = ({
    username,
    password,
    handleUsername,
    handlePassword,
    handleLogin,
}) => (
    <div>
        <h1>Login</h1>
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

export default Login
