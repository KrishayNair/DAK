// src/app/api/auth/handleSignup.ts
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { addUserToCollection } from '@/lib/initializeSchema';
import { hashPassword } from '@/lib/authUtitls';

export const signup = async (email: string, password: string, username: string, fullName: string) => {
    try {
        const hashedPassword = await hashPassword(password);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user to Firestore
        await addUserToCollection({
            username,
            email: user.email!,
            password: hashedPassword,
            full_name: fullName,
            is_active: true,
            role: 'user',
        });

        return userCredential;
    } catch (error) {
        throw new Error(error.message);
    }
};
