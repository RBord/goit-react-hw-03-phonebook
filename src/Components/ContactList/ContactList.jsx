import React from 'react';
import s from '../ContactList/ContactList.module.css';

const ContactList = ({value, onDeleteContact}) => {
    console.log(value)
    return (
        <ul value={value}>
            {value.map(({ id, name, number}) => {
                return (
                    <div key={id} className={s.divItem}>
                        <li className={s.liItem}>{name}: {number}</li> <button onClick={()=>onDeleteContact(id)} className={s.btn}>Delete</button>
                    </div>
                )
            })}
        </ul>
    )
}
export default ContactList;