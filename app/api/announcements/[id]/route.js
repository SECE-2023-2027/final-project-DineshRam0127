import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';
import { NextResponse } from 'next/server';

// GET single announcement
export async function GET(request, { params }) {
  try {
    await connectDB();
    const id = params.id; // Directly access params.id after awaiting
    
    const announcement = await Announcement.findById(id);
    
    if (!announcement) {
      return NextResponse.json(
        { success: false, error: 'Announcement not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: announcement });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// UPDATE announcement
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const id = params.id;
    const body = await request.json();
    
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!announcement) {
      return NextResponse.json(
        { success: false, error: 'Announcement not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: announcement });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE announcement
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const id = params.id;
    
    const announcement = await Announcement.findByIdAndDelete(id);
    
    if (!announcement) {
      return NextResponse.json(
        { success: false, error: 'Announcement not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}