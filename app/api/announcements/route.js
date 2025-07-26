import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connected, fetching announcements...');
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const announcements = await Announcement.find(query)
      .sort({ isPinned: -1, createdAt: -1 });
    
    console.log(`Found ${announcements.length} announcements`);
    
    return NextResponse.json({ success: true, data: announcements });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const announcement = await Announcement.create(body);
    
    return NextResponse.json({ success: true, data: announcement });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}