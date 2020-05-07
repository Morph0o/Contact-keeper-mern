import React, { Fragment, useContext,useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ContactItem from './ContactItem'
import Spinner from '../layout/spinner'

const Contacts = () => {
    const contactContext = useContext(ContactContext)
    const {contacts,filtered,getContacts,loading} = contactContext

    useEffect(()=>{
        getContacts()
        //eslint-disable-next
    },[getContacts])
    if(contacts === null && !loading){
        return <h4>Please add a Contact</h4>
    }else{
    return(
        <Fragment>
            {!loading ? (<TransitionGroup>
            {filtered !== null ? filtered.map(contact=>(<CSSTransition key= {contact._id} timeout={500}className="item"><ContactItem   contact={contact}/></CSSTransition>)):contacts.map(contact =><CSSTransition key= {contact._id} timeout={500}className="item"><ContactItem contact={contact}/></CSSTransition>)}
            </TransitionGroup>):<Spinner/>}
            
        </Fragment>
    )}
}
export default Contacts