import { db } from '@/app/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

interface User {
    username: string;
    email: string;
    password: string;
    full_name: string;
    is_active: boolean;
    role: string;
}

export const addUserToCollection = async (user: User) => {
    try {
        const docRef = await addDoc(collection(db, 'users'), user);
        console.log('User added to Firestore with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding user to Firestore:', error);
    }
};

// Initialize Users Collection
const initializeUsersCollection = async () => {
    const usersCollectionRef = collection(db, 'users');
    await addDoc(usersCollectionRef, {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'hashed_password',
        full_name: 'Test User',
        is_active: true,
        created_at: new Date(),
        role: 'user',
    });
};

// Initialize Products Collection
const initializeProductsCollection = async () => {
    const productsCollectionRef = collection(db, 'products');
    await addDoc(productsCollectionRef, {
        title: 'Sample Product',
        description: 'This is a sample product',
        price: 100,
        discount_percentage: 10,
        rating: 4.5,
        stock: 50,
        brand: 'Sample Brand',
        thumbnail: 'sample_image_url',
        images: ['image1_url', 'image2_url'],
        is_published: true,
        created_at: new Date(),
        category_id: 'category_id_1',
    });
};

// Initialize Categories Collection
const initializeCategoriesCollection = async () => {
    const categoriesCollectionRef = collection(db, 'categories');
    await addDoc(categoriesCollectionRef, {
        name: 'Electronics',
    });
};

// Initialize Carts Collection
const initializeCartsCollection = async () => {
    const cartsCollectionRef = collection(db, 'carts');
    await addDoc(cartsCollectionRef, {
        user_id: 'user_id_1',
        created_at: new Date(),
        total_amount: 0,
    });
};

// Initialize Cart Items Collection
const initializeCartItemsCollection = async () => {
    const cartItemsCollectionRef = collection(db, 'cart_items');
    await addDoc(cartItemsCollectionRef, {
        cart_id: 'cart_id_1',
        product_id: 'product_id_1',
        quantity: 1,
        subtotal: 100,
    });
};

// Function to Initialize All Collections
export const initializeSchema = async () => {
    try {
        await initializeUsersCollection();
        await initializeProductsCollection();
        await initializeCategoriesCollection();
        await initializeCartsCollection();
        await initializeCartItemsCollection();
        console.log('Schema Initialized Successfully!');
    } catch (error) {
        console.error('Error initializing schema:', error);
        throw error;
    }
};
