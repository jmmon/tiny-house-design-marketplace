const Login = () => {
    return ( 
        <div>
            <h2>Login To Your Account</h2>
            <form id="login-form">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="text" />
                <button type="submit">Submit</button>
            </form>
        </div>
     );
}
 
export default Login;