import React, {useState} from 'react'

interface TextInputProperties {
    name: string;
    label: string;
    errorMessage: string;
    onChange(e:React.ChangeEvent<HTMLInputElement>):void;
    maxLength?: number;
    validator?(value:string):boolean;
}

export const TextInput: React.FC<TextInputProperties> = ({
    name, label, errorMessage, onChange, maxLength, validator
}) => {

    const [inputValue, setInputValue] = useState<String>("");

    const updateInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setInputValue(e.target.value);
    }

  return (
    <div className='text-input'>
        <span>{label}</span>
        <input name={name} onChange={updateInput} />
    </div>
  )
}
