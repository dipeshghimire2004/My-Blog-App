import React, { useState } from 'react';
import { Button, Logo, Input } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-gray-50'>
      <div className='mx-auto w-full max-w-lg bg-white rounded-xl p-10 border shadow-md'>
        <div className='mb-6 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-gray-600'>
          Don&apos;t have an account?&nbsp;
          <Link
            to='/signup'
            className='font-medium text-blue-600 hover:text-blue-500 transition-all duration-200 hover:underline'
          >
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
        
        <form onSubmit={handleSubmit(login)} className='mt-6 space-y-4'>
          <Input
            label='Email:'
            type='email'
            placeholder='Enter your email address'
            {...register('email', {
              required: 'Email is required',
              validate: {
                matchPattern: (value) =>
                  /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/i.test(value) || 'Email address must be a valid address',
              },
            })}
          />
          <Input
            label='Password:'
            type='password'
            placeholder='Enter your password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          <Button type='submit' className='w-full'>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
