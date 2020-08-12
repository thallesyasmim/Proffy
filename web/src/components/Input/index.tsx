import React, { InputHTMLAttributes } from 'react';

import './style.css';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const Input: React.FC<inputProps> = ({ name, label, ...rest }) => {
    return ( 
       <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input id={name} {...rest} />
      </div>
    )
}

export default Input;