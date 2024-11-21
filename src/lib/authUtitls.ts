import bcrypt from 'bcryptjs';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { addUserToCollection } from '@/lib/initializeSchema';

// Hashes a plain text password
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Signs up a new user and adds them to Firestore
export const signup = async (
    email: string,
    password: string,
    username: string,
    fullName: string
) => {
    try {
        // Hash the password before storing
        const hashedPassword = await hashPassword(password);

        // Create user with email and password
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
        throw new Error(`Error during signup: ${error.message}`);
    }
};
