// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
}

const auth = admin.auth();

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public routes that do not require authentication
    const publicRoutes = [
        '/userDashboard/home',
        '/userDashboard/pda',
        '/userDashboard/shop',
        '/userDashboard/workshop',
    ];

    // Check if the current path is public
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    try {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Verify the token with Firebase
        await auth.verifyIdToken(token);

        return NextResponse.next();
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        // Apply the middleware to all routes except the public routes
        '/((?!userDashboard/home|userDashboard/pda|userDashboard/shop|userDashboard/workshop).*)',
    ],
};
