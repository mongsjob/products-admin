import React from 'react'
import "./Login.css"
import { useState } from 'react';
import { useLoginUserMutation } from '../redux/feature/auth/authApi';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { saveUserToLocalStorage, setUser } from '../redux/feature/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loginUser, {isLoading: loginLoading}] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Both fields are required');
            return;
        }

        const data = { email, password };

        try {
            const response = await loginUser(data).unwrap();
            const { token, user } = response;
            alert('Login successful');
            navigate('/admindashboard');
            // Store token/user if necessary
            dispatch(setUser( user ));
            saveUserToLocalStorage(user); 
            console.log("Saving user to localStorage:", user);
        } catch (error) {
            setMessage(error.data?.message || 'Please provide a valid email and password');
        }
    };

    const onchangeEmail = (e)=>{
        setEmail(e.target.value);
        setMessage('');
    };
    const onchangePassword = (e)=>{
        setPassword(e.target.value);
        setMessage('');
    };
  return (
    <div className='login'>
        <div className='login-wrapper'>
        <h1>Login</h1>
        <form onSubmit={handleLogin} className='login-form'>
                <label>Email</label>
                <input required value={email} onChange={onchangeEmail} className='login-input' type="email" placeholder='Email' />
                <label htmlFor="">Password</label>
                <input required value={password} onChange={onchangePassword} className='login-input' type="password" placeholder='Password' />
                <div className='login-checkbox'>
                    <input type="checkbox" />
                    <p>Stay Signed In</p>
                </div>
                {
                message && <p className='error-message'>{message}</p>
            }
                <button disabled={loginLoading} type='submit' className='login-btn'>{loginLoading ? 'Logging in...' : 'Login'}</button>
            </form>
            </div>
    </div>
  )
}

export default Login