import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Client from '@/app/models/client';

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();
    const clients = await Client.find().sort('-createdAt').lean();
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await dbConnect();
    const body = await request.json();
    
    const existingClient = await Client.findOne({ email: body.email });
    if (existingClient) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    const client = new Client(body);
    const savedClient = await client.save();
    return NextResponse.json(savedClient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}