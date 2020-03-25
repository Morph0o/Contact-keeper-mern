import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import { 
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
 } from '../Types'

 const ContactState = props => {
     const initialState = {
         contacts : [
             {
              id:1,
              name: 'jill johnson',
              email:'jillJ@gmail.com',
              phone:'111-111-1111',
              type: 'personal'   
             }
         ]

     }
     const {state, dispatch} = useReducer(contactReducer, initialState)
     return (
         <ContactContext.Provider value= {{contacts: state.contact}}>
             {props.children}
         </ContactContext.Provider>
     )
 }

 export default ContactState