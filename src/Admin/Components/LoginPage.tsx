import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/api/login', {
                    username: values.username,
                    password: values.password,
                });
                localStorage.setItem('token', response.data.token);
                navigate('/admin');
            } catch (err) {
                setError('Invalid username or password');
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-main">Login</h2>
                <form onSubmit={formik.handleSubmit}>
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
                                    : 'focus:border-main-2 focus:border-main-2'
                            }`}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-red-500 text-sm font-bold">{formik.errors.username}</div>
                        ) : null}
                    </div>
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
                                    : 'focus:border-main-2 focus:border-main-2'
                            }`}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm font-bold">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    {error && <p className="text-red-600 mb-4 font-bold">{error}</p>}
                    <button
                        type="submit"
                        className={`w-full bg-main text-white py-2 rounded-lg  focus:outline-none ${
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
