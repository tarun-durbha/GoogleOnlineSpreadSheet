import React,{useState} from 'react'
import "./Input.css"


function Input(props) {

    const [inputValue,setInputValue] =  useState("");
    
    const handleChange = (event)=>{
        setInputValue(event.target.value);
    }

    return (
    <div>
        <label className="form-label">  
            {props.name}
        </label>
        <input type="text"
            id = {props.id}
            onChange = {handleChange}
            value = {inputValue}
            name = {props.name}
            placeholder = {props.placeholder}
        >
        </input>
    </div>
  )
}

export default Input