import React, { ChangeEvent, FC } from 'react';

interface InputProps{
    value:string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string
    type: string
    maxLength?: number
}

const InputSignup:FC<InputProps> = ({value, onChange, placeholder, type, maxLength})=>{
    return(
        <input
            className='w-72 h-8 border-b-2 text-center border-slate-400 bg-transparent text-black my-4 placeholder:text-black outline-none'
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            maxLength={maxLength}
        />
    )
}

export default InputSignup