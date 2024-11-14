// app/api/initialize/page.tsx
import { NextResponse } from 'next/server';
import { initializeSchema } from '@/lib/initializeSchema'; 


// POST request handler
export async function POST() {
  // Your POST logic here
  return NextResponse.json({ message: 'Success' });
}

// GET request handler (optional)
export async function GET() {
  return NextResponse.json({ message: 'Send a POST request to initialize the schema' });
}
