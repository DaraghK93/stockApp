/// Login Screen ///
// Route:
//  <URL>/login
// Description:
//  This screen contains the components redenred to the user when they are logging in
import { useState } from 'react'

function LoginPage() {
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    return(
        <>
        <h1>Login</h1>
        {/* Simple login form taken from w3 schools. https://www.w3schools.com/howto/howto_css_login_form.asp */}
        <div>
        <h1>Welcome, would you like to login?</h1>
			<form onSubmit={console.log("Hello")}>
				<input
					value={email}
					// onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					// onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
      <p>Don't have an account? Sign up <a href="/register">here.</a></p>
        </div>

        </>
        )
}

export default LoginPage