import connectDB from './db.js';
import 'dotenv/config';
dotenv.config({ path: '.env.local' });
async function testConnection() {
    try {
        await connectDB();
        console.log('Database connection successful!');
    } catch (error) {
        console.error('Database connection test failed:', error);
    }
}

testConnection();