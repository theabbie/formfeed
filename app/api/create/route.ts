import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import Form from '../../../lib/models/Form';

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();
    await dbConnect();
    const newForm = await Form.create({
      title,
      description,
      questions: [],
    });
    return NextResponse.json({ success: true, form: newForm }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}