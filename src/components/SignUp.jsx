import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Logo, Input } from './index';
import { login } from '../store/authSlice';
import { Link } from 'react-router-dom';

function SignUp() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
    } = useForm();

    const create = async (data) => {
        setError("");
        try {
            // Create a new account
            const user = await authService.createAccount(data);
            if (user) {
                // Get current user data
                const userData = await authService.getCurrentUser();
                if (userData) {
                    // Dispatch the login action with the user data
                    dispatch(login(userData));
                    navigate('/dashboard'); // Redirect to a desired page after signup
                }
            }
        } catch (error) {
            setError(error.message || "An error occurred during account creation.");
        }
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Create your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?
                    <Link to="/login"
                     className="font-medium text-primary transition-all duration-200 hover:underline">
                        Login
                    </Link>
                </p>
                {error && <p className='text-red-500 text-center'>{error}</p>}
               
                <form onSubmit={handleSubmit(create)}>
                    <Input
                        label="Full Name:"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email address"
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "Email address must be a valid address",
                            },
                        })}
                    />
                    <Input
                        label="Password:"
                        type='password'
                        placeholder='Enter your password'
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
