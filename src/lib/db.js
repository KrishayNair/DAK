import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    throw new Error('Please define the MONGO_URL environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    try {
        if (cached.conn) {
            console.log('Using cached MongoDB connection');
            return cached.conn;
        }

        console.log('Creating new MongoDB connection');

        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGO_URL, opts);
        cached.conn = await cached.promise;

        console.log('MongoDB connected successfully');
        return cached.conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export default connectDB;
