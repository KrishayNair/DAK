// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { login } from '../../../api/auth/login/handleLogin';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const userCredential = await login(email, password);
        console.log(userCredential);

        return NextResponse.json({ message: 'Login successful!', user: userCredential.user });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
