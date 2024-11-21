// app/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import { login } from '../../app/api/auth/login/handleLogin';
import { auth } from '@/app/firebase/config';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [signInWithEmailAndPassword, user, loading, firebaseError] = useSignInWithEmailAndPassword(auth);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await login(email, password);
            if (userCredential.user) {
                // Redirect to home page if user is logged in
                router.push('/');
            }
        } catch (error: any) {
            // Handle specific error codes
            if (error.message.includes('auth/user-not-found')) {
                router.push('/signup'); // Redirect to signup page if user is not found
            } else {
                setError(error.message);
            }
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-orange-100 to-rose-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden flex max-w-4xl w-full">
                    <div className="w-1/2 hidden md:block">
                        <Image
                            src="/hero.png"
                            alt="Indian themed decoration"
                            width={500}
                            height={600}
                            objectFit="cover"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-8">
                        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-900">Welcome Back</h1>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loading ? 'Logging In...' : 'Login'}
                            </button>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </form>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            New user?{' '}
                            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
