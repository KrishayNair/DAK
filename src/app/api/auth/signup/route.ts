import { NextResponse } from 'next/server';
import { signup } from '../../../../lib/authUtitls';

export async function POST(request: Request) {
    const { email, password, username, fullName } = await request.json();

    try {
        await signup(email, password, username, fullName);
        return NextResponse.json({ message: 'User created successfully!' });
    } catch (error) {
        console.error('Error during signup:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
