import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import Vitals from '@/models/Vitals';

export async function GET() {
  try {
    await dbConnect();
    const latestVitals = await Vitals.findOne().sort({ createdAt: -1 });
    return NextResponse.json(latestVitals || { message: 'No data found' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Validate required fields
    const { heartRate, spO2, lat, lng } = data;
    if (heartRate == null || spO2 == null || lat == null || lng == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newVitals = await Vitals.create({
      heartRate,
      spO2,
      lat,
      lng,
    });

    return NextResponse.json(newVitals, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
