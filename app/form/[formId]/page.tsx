'use client';

import Button from '@/app/components/Button';
import AddIcon from '@/app/components/icons/add';
import DragIcon from '@/app/components/icons/drag';
import PreviewIcon from '@/app/components/icons/preview';
import PublishIcon from '@/app/components/icons/publish';
import SaveIcon from '@/app/components/icons/save';
import Input from '@/app/components/Input';
import { ReactSortable } from 'react-sortablejs';
import { useState, useEffect, use } from 'react';
import Dropdown from '@/app/components/Dropdown';
import ExpandIcon from '@/app/components/icons/expand';
import SingleSelect from '@/app/components/SingleSelect';

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

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleQuestionChange = (index: number, newText: string) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[index].text = newText;
        setNewQuestions(updatedQuestions);
    };

    const handleTypeChange = (index: number, newType: string) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[index].type = newType;
        setNewQuestions(updatedQuestions);
    };

    const handleAddQuestion = (type: string) => {
        const newQuestion = {
            text: '',
            type
        };
        setNewQuestions([...newQuestions, newQuestion]);
    };

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

    const Question = ({ question, index }: { question: { text: string; type: string, options?: string[] }, index: number }) => {
        const renderInput = () => {
            switch (question.type) {
                case 'Short Answer':
                    return (
                        <Input
                            type="short"
                            disabled
                        />
                    );
                case 'Long Answer':
                    return (
                        <Input
                            type="large"
                            disabled
                        />
                    );
                case 'Single Select':
                    return (
                        <SingleSelect
                            options={question.options || []}
                            onChange={(updatedOptions) => {
                                const updatedQuestions = [...newQuestions];
                                updatedQuestions[index].options = updatedOptions;
                                setNewQuestions(updatedQuestions);
                            }}
                        />
                    );
                case 'URL':
                    return (
                        <Input
                            type="short"
                            disabled
                        />
                    );
                case 'Date':
                    return (
                        <Input
                            type="short"
                            disabled
                        />
                    );
                default:
                    return null;
            }
        };

        return (
            <div className="inline-block border border-[#E1E4E8] rounded-lg p-4 m-4" style={{ width: "96%" }}>
                <div className="flex items-center">
                    <div className="flex-1">
                        <Input
                            type="title"
                            placeholder="Write a Question"
                            defaultValue={question.text}
                            onBlur={(e) => handleQuestionChange(index, e.target.value)}
                        />
                    </div>
                    <Dropdown
                        options={['Short Answer', 'Long Answer', 'Single Select', 'Number', 'URL', 'Date']}
                        selected={question.type}
                        onSelect={(newType) => handleTypeChange(index, newType)}
                        button={<ExpandIcon />}
                    />
                    <div className="cursor-pointer">
                        <DragIcon />
                    </div>
                </div>
                <div className='px-3'>
                    {renderInput()}
                </div>
            </div>
        );
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
                        <Input placeholder='Untitled Form' type="title" defaultValue={form.title} onChange={handleTitleChange} />
                        <Button btnType="secondary" onClick={() => { window.open(`/form/${formId}/preview`, '_blank') }}>Preview <PreviewIcon /></Button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto justify-center">
                    <>
                        {newQuestions.map((question, index) => (
                            <div>
                                <Question question={question} index={index} />
                            </div>
                        ))}
                    </>
                    <div className="flex justify-center my-3">
                        <Dropdown
                            options={['Short Answer', 'Long Answer', 'Single Select', 'Number', 'URL', 'Date']}
                            selected={""}
                            onSelect={handleAddQuestion}
                            button={<><AddIcon /> <span className='font-bold'>Add Question</span></>}
                        />
                    </div>
                </main>


                <footer className="h-12 bg-gray-100 border-t border-gray-300 flex justify-between items-center px-5 py-7">
                    <Button btnType="secondary" onClick={handleFormUpdate}><SaveIcon /> Save as Draft</Button>
                    <Button btnType="primary" onClick={handleFormUpdate}><PublishIcon /> Publish Form</Button>
                </footer>
            </div>
        </div>
    );
}
