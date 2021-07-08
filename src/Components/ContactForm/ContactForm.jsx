import React from 'react';
import shortid from 'shortid';
import s from '../ContactForm/ContactForm.module.css'

class ContactForm extends React.Component {
    state = {
        name: '',
        number: '',
    }
    nameInputId = shortid.generate();
    numberInputId = shortid.generate();

    handleChange = evt => {
        const { name, value } = evt.currentTarget;
        this.setState({
            [name]:value,
        })
    }
    handleSubmit = evt => {
        evt.preventDefault();

        this.props.onSubmit(this.state);
        this.reset();
    }
    reset = () => {
        this.setState({ name: '', number: '' });
    }

    
    render() {
        return (
            <form onSubmit={this.handleSubmit} className={s.form}>
                <label htmlFor={this.nameInputId} className={s.label}><p className={s.text}>Name</p>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        onChange={this.handleChange}
                        id={this.nameInputId}
                        required
                    />
                </label>
                <label htmlFor={this.numberInputId} className={s.label}><p className={s.text}>Number</p>
                    <input
                        type="tel"
                        name="number"
                        value={this.state.number}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        onChange={this.handleChange}
                        id={this.numberInputId}
                        required
                        
                    />
                </label>
                <button type='submit' className={s.btn}>Add contact</button>
            </form>
        );
    }
}
export default ContactForm;