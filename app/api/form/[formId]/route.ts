import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Form from '@/lib/models/Form';

export async function GET(request: Request, props : { params: Promise<{ formId: string }> }) {
    const { formId } = await props.params;
    await dbConnect();

    const form = await Form.findById(formId).lean();
    if (!form) {
        return NextResponse.json({ message: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json(form);
}

export async function PUT(request: Request, props : { params: Promise<{ formId: string }> }) {
    const { formId } = await props.params;
    const { title, questions } = await request.json();

    await dbConnect();

    const form = await Form.findByIdAndUpdate(
        formId,
        { title, questions },
        { new: true }
    );

    if (!form) {
        return NextResponse.json({ message: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Form updated', form });
}