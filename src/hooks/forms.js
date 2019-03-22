import {useState} from 'react'
// custom hook functions must start with use
export const useFormInput =()=>{
    const [value, setvalue] = useState('');
    const [validity, setValidity] = useState(false);

    const inputChangeHandler = event =>{
        setvalue(event.target.value);
        if(event.target.value.trim()===''){
            setValidity(false);
        }else{
            setValidity(true);
        }
    }
    return {value: value, onChange: inputChangeHandler, validity }
}