import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        // Connect to the database
        await connectDB();

        // Parse the request body
        let body;
        try {
            body = await req.json();
        } catch (err) {
            return NextResponse.json(
                { error: 'Invalid JSON in request body' },
                { status: 400 }
            );
        }

        const { fullName, email, username, password } = body;

        // Validate input
        if (!fullName || !email || !username || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email or username already exists' },
                { status: 400 }
            );
        }

        // Create new user
        const newUser = await User.create({
            fullName,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password, // The password will be hashed in the model's pre-save hook
        });

        // Log the created user to verify
        console.log('New User Created:', newUser);

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Set cookie with the JWT token
        const response = NextResponse.json(
            {
                message: 'User created successfully',
                user: {
                    id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    username: newUser.username
                }
            },
            { status: 201 }
        );

        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
    } catch (error) {
        console.error('Signup error:', error);

        // Handle unique constraint errors (e.g., duplicate keys)
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Email or username already exists' },
                { status: 400 }
            );
        }

        // Generic error response
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
