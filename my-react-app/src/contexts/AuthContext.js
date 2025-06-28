import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import httpStatus from 'http-status';

export const AuthContext = createContext();

const client = axios.create({
    baseURL: 'http://localhost:8000/api/v1/users'
});

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            const request = await client.post('/register', {
                name,
                username,
                password
            });
            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            const request = await client.post('/login', {
                username,
                password
            });
            if (request.status === httpStatus.OK) {
                localStorage.setItem('token', request.data.token); // or request.data.message if that's correct
                // Optionally: router('/dashboard');
            }
            router('/home');
        } catch (err) {
            throw err;
        }
    };

    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
