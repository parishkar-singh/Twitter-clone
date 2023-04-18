import React from 'react';

interface InputProps {
    placeholder?: string;
    type?: string;
    value?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const Input: React.FC<InputProps> = ({
    placeholder,
    type,
    value,
    disabled,
    onChange
}) => {
    return (
        <div>
            <input
                className='w-full p-4 text-lg bg-black border-2 border-neutral-500 rounded-md outline-none text-white
                 focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-500 disabled:cursor-not-allowed'
                placeholder={placeholder}
                type={type}
                value={value}
                disabled={disabled}
                onChange={onChange}
            />


        </div>
    );
};

export default Input;
