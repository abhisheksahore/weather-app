import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from "@fortawesome/fontawesome-free-solid";
import React, { useState } from 'react';
import { useEffect } from 'react';
import _ from 'lodash';

const InputComponent = (props) => {

    const [value, setValue] = useState('');

    const handleKeyDown = (e) => {
        console.log(e);
        if (e.key === "Enter" && !_.isEmpty(value)){
            props.submit(value)
        }
    }

    return (
        <div className='input-field-container'>
            <div className='input-field-wrapper' onClick={() => { console.log("clicked") }}>
                <input className='input-field' placeholder='Search the city' value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} />
                <div className='search-btn' onClick={() => {
                    props.submit(value);
                }}>
                    <FontAwesomeIcon icon={faSearch} style={{color: 'white', fontSize: "2rem", padding: ".7rem .9rem"}} />
                </div>
            </div>
            <div className='search-helper-info'>
                Press <span style={{ fontWeight: "800" }}>ENTER</span> to search
            </div>
        </div>
    )
}

export default InputComponent