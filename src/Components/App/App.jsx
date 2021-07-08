import React from 'react';
import shortid from 'shortid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

class App extends React.Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: '',
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }
    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }
    onSameName = (name, contacts) => {
        const hasName = contacts.find(el => el.name === name);
        return(hasName ? false : true)
    }
    addContact = data => {
        const contact = {
            id: shortid.generate(),
            name: data.name,
            number: data.number,
        }

        this.setState(prevState => {
            const isUnique = this.onSameName(contact.name, prevState.contacts);
            if (isUnique) {
                return {
                    contacts: [contact, ...prevState.contacts]
                };
            } else {
                alert('Контакт с таким Именем уже добавлен!')
            }
        })
    }
    deleteContact = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }))
    }
    changeFilter = evt => {
        this.setState({filter: evt.currentTarget.value})
    }
    getFiltredContacts = () => {
        const { filter, contacts } = this.state;
        const normalizedFilter = filter.toLowerCase();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter));
    }

    render() {
        const { filter} = this.state;
        const filtredNames = this.getFiltredContacts();
        
        return (    
            <>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={this.addContact}/>
                <h2>Contacts</h2>
                <Filter value={filter} onChange={this.changeFilter} />
                <ContactList value={filtredNames} onDeleteContact={this.deleteContact}/>
            </>
        )
    }
}
export default App;