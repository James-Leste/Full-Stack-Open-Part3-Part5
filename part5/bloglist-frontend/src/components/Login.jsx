/** @format */

const Login = ({
    newUsername,
    newPassword,
    handleUsername,
    handlePassword,
    login,
}) => (
    <div>
        <h1>Login</h1>
        <form>
            <div>
                Username:{' '}
                <input value={newUsername} onChange={handleUsername} />
            </div>
            <div>
                Password:{' '}
                <input value={newPassword} onChange={handlePassword} />
            </div>
            <div>
                <button type='submit' onClick={login}>
                    Login
                </button>
            </div>
        </form>
    </div>
)

export default Blog
