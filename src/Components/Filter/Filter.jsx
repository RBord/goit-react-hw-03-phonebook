import React from 'react';
import shortid from 'shortid';
import s from '../Filter/Filter.module.css';

const nameInputId = shortid.generate();

const Filter = ({value, onChange }) => (
    <label htmlFor={nameInputId}>
        Find contacts by Name
        <input type="text" value={value} onChange={onChange} id={nameInputId} className={s.input}/>
    </label>
)

export default Filter;