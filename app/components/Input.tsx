import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type: 'short' | 'large' | 'option' | 'title' | 'subtitle';
}

const Input: React.FC<InputProps> = ({ type, ...props }) => {
  if (type === 'short') {
    return (
      <input
        type="text"
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
      />
    );
  }

  if (type === 'large') {
    return (
      <textarea
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
      />
    );
  }

  if (type === 'option') {
    return (
      <input
        type="text"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
      />
    );
  }

  if (type === 'title') {
    return (
      <input
        type="text"
        className="text-gray-900 text-lg font-bold focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-none dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
      />
    );
  }

  if (type === 'subtitle') {
    return (
      <input
        type="text"
        className="text-gray-900 text-sm font-normal focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-none dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
      />
    );
  }

  return null;
};

export default Input;