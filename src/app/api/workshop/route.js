import connectDB from '@/lib/db';
import Workshop from "@/models/Workshop";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

// Helper function to get user ID from token
const getUserFromToken = (request) => {
  // Try to get token from cookie first
  let token = request.cookies.get('auth_token')?.value;
  
  // If no cookie, check Authorization header
  if (!token) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }
  
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

export async function POST(request) {
  try {
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    await connectDB();
    
    // Ensure dates are properly parsed
    const workshopData = {
      title: data.title,
      description: data.description,
      image: data.image,
      duration: data.duration,
      date: new Date(data.date),
      time: new Date(data.time),
      mode: data.mode,
      createdBy: userId
    };
    
    console.log('Creating workshop with data:', workshopData);
    
    const workshop = await Workshop.create(workshopData);
    console.log('Created workshop:', workshop);

    return NextResponse.json({ message: "Workshop Created", workshop }, { status: 201 });
  } catch (error) {
    console.error('Error creating workshop:', error);
    return NextResponse.json(
      { error: "Error creating workshop", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const workshops = await Workshop.find()
      .populate('createdBy', 'fullName email username')
      .lean();
    
    console.log('Retrieved workshops:', workshops);
    return NextResponse.json({ workshops });
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ error: "Error fetching workshops" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    
    // Find workshop and check if user is the creator
    const workshop = await Workshop.findById(id);
    if (!workshop) {
      return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
    }
    
    if (workshop.createdBy.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized to delete this workshop" }, { status: 403 });
    }

    await Workshop.findByIdAndDelete(id);
    return NextResponse.json({ message: "Workshop deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting workshop" }, { status: 500 });
  }
}
