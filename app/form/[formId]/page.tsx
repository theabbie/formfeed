'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useState, useEffect, use } from 'react';

export default function FormPage({ params }: { params: Promise<{ formId: string }> }) {
    const { formId } = use(params);
    const [form, setForm] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const [newQuestions, setNewQuestions] = useState<any[]>([]);

    useEffect(() => {
        const fetchForm = async () => {
            const response = await fetch(`/api/form/${formId}`);
            const data = await response.json();
            if (data.message === 'Form not found') {
                alert('Form not found');
            } else {
                setForm(data);
                setTitle(data.title || '');
                setNewQuestions(data.questions);
            }
        };

        fetchForm();
    }, [formId]);

    const handleFormUpdate = async () => {
        const response = await fetch(`/api/form/${formId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, questions: newQuestions }),
        });

        const result = await response.json();
        if (result.message === 'Form updated') {
            alert('Form updated successfully!');
        } else {
            alert('Failed to update form');
        }
    };

    if (!form) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full md:max-w-[44%] md:min-w-[320px] h-screen border border-[#E1E4E8] bg-white flex flex-col">
                <header className="bg-white border-b border-gray-300 py-2">
                    <div className="flex items-center justify-between px-4">
                        <Input placeholder='Enter Title' type="title" defaultValue={form.title} />
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto">
                    <div>
                        <h2 className="text-lg">Main Content</h2>
                        <p>Your form or other content goes here...</p>
                    </div>
                </main>


                <footer className="h-12 bg-gray-100 border-t border-gray-300 flex justify-between items-center px-5 py-7">
                    <Button btnType="secondary" onClick={console.log}>Left Button</Button>
                    <Button btnType="primary" onClick={console.log}>Right Button</Button>
                </footer>
            </div>
        </div>
    );
}
