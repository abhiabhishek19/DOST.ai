
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import axios from '../config/axios.js';
import { UserContext } from '../context/userContext.jsx';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login logic here
        axios.post('/user/login', { email, password })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-indigo-500">Login</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-blue-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-blue-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="text-indigo-500 hover:underline"
                        >
                            Create one
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;