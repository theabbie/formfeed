'use client';

import { useEffect, useState, use } from 'react';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

export default function PreviewPage({ params }: { params: Promise<{ formId: string }> }) {
    const { formId } = use(params);
    const [form, setForm] = useState<any>(null);

    useEffect(() => {
        const fetchForm = async () => {
            const response = await fetch(`/api/form/${formId}`);
            const data = await response.json();
            if (data.message === 'Form not found') {
                alert('Form not found');
            } else {
                setForm(data);
            }
        };

        fetchForm();
    }, [formId]);

    const renderQuestionInput = (question: { type: string; text: string; options?: string[] }) => {
        switch (question.type) {
            case 'Short Answer':
                return <Input type="short" placeholder="Your answer" />;
            case 'Long Answer':
                return <Input type="large" placeholder="Your answer" />;
            case 'Single Select':
                return (
                    <div className="flex flex-col gap-2">
                        {question.options?.map((option, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input type="radio" name={question.text} value={option} className="mr-2" />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'URL':
                return <Input type="short" placeholder="Enter URL" />;
            case 'Date':
                return <Input type="short" />;
            default:
                return null;
        }
    };

    if (!form) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                }}
            >
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full md:max-w-[44%] md:min-w-[320px] h-screen border border-[#E1E4E8] bg-white flex flex-col">
                <header className="bg-white border-b border-gray-300 py-2">
                    <div className="flex items-center justify-between px-4">
                        <h1 className="text-2xl font-semibold">{form.title}</h1>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto justify-center p-4">
                    <form>
                        {form.questions.map((question: any, index: number) => (
                            <div key={index} className="mb-6">
                                <label className="block mb-2 text-lg font-medium">{question.text}</label>
                                {renderQuestionInput(question)}
                            </div>
                        ))}
                        <Button btnType="primary" type="submit" onClick={() => alert("Form Successfully Submitted (jk didn't add this functionality)")}>
                            Submit
                        </Button>
                    </form>
                </main>
            </div>
        </div>
    );
}