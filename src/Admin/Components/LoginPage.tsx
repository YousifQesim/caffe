import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginValidationSchema } from '../../validation/ValidationSchemas';

/**
 * LoginPage component renders a form for user login.
 * It handles form submission, validation using Formik, and redirects to '/admin' upon successful login.
 */
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>(''); // State for displaying login errors

    // Formik hook for managing form state, validation, and submission
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginValidationSchema, // Validation schema for username and password
        onSubmit: async (values) => {
            try {
                // Attempt to login via API
                const response = await axios.post('http://localhost:3000/api/login', {
                    username: values.username,
                    password: values.password,
                });
                // Store token in localStorage upon successful login
                localStorage.setItem('token', response.data.token);
                // Redirect to '/admin' after successful login
                navigate('/admin');
            } catch (err) {
                // Handle login errors
                setError('Invalid username or password');
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-main">Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    {/* Username input field */}
                    <div className="mb-4">
                        <label className="block text-main font-bold">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none ${
                                formik.touched.username && formik.errors.username
                                    ? 'border-red-500'
                                    : 'focus:border-main-2'
                            }`}
                        />
                        {/* Display username validation error */}
                        {formik.touched.username && formik.errors.username && (
                            <div className="text-red-500 text-sm font-bold">{formik.errors.username}</div>
                        )}
                    </div>
                    {/* Password input field */}
                    <div className="mb-4">
                        <label className="block text-main font-bold">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none ${
                                formik.touched.password && formik.errors.password
                                    ? 'border-red-500'
                                    : 'focus:border-main-2'
                            }`}
                        />
                        {/* Display password validation error */}
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm font-bold">{formik.errors.password}</div>
                        )}
                    </div>
                    {/* Display login error if any */}
                    {error && <p className="text-red-600 mb-4 font-bold">{error}</p>}
                    {/* Login button */}
                    <button
                        type="submit"
                        className={`w-full bg-main text-white py-2 rounded-lg focus:outline-none ${
                            formik.isValid ? 'focus:ring-2 focus:ring-blue-600' : 'opacity-50 cursor-not-allowed'
                        }`}
                        disabled={!formik.isValid}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
