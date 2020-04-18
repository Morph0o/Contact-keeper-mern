import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ContactItem from './ContactItem'

const Contacts = () => {
    const contactContext = useContext(ContactContext)
    const {contacts,filtered} = contactContext
    if(contacts.length === 0 ){
        return <h4>Please add a Contact</h4>
    }else{
    return(
        <Fragment>
            <TransitionGroup>
            {filtered !== null?filtered.map(contact=>(<CSSTransition key= {contact._id} timeout={500}className="item"><ContactItem   contact={contact}/></CSSTransition>)):contacts.map(contact =><CSSTransition key= {contact._id} timeout={500}className="item"><ContactItem contact={contact}/></CSSTransition>)}
            </TransitionGroup>
        </Fragment>
    )}
}
export default Contacts