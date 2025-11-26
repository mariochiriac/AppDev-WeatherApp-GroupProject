import React from 'react'
import './Login.css'

const Login = () => {
    return (
    <div>
        <h2>Login Page</h2>
        <div className='mainBox'>
            <a href=''>Logo Here</a>
            <form className='loginForm'>
                <input type='text' placeholder='Username' />
                <input type='password' placeholder='Password' />
                <button type='submit'>Login</button>
            </form>
        </div>
    </div>
    )
}

export default Login
