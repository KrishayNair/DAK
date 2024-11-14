import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextResponse } from 'next/server';
import { auth } from '@/app/firebase/config';

export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Handler for the API route
export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const userCredential = await login(email, password);
        return NextResponse.json({ message: 'Login successful!', user: userCredential.user });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
