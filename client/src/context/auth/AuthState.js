import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'
import { 
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
 } from '../Types'


 const AuthState = props => {
     const initialState = {
         token: localStorage.getItem('token'),
         isAuthenicated: null,
         loading: true,
         error: null,
         user:null

     }
    
     const [state, dispatch] = useReducer(authReducer, initialState)
     
     const loadUser = async()=>{
        console.log("test1 ")
         if(localStorage.token){
             setAuthToken(localStorage.token)
         }
            try {
                
                const res = await axios.get('/api/auth')
            
                dispatch({type:USER_LOADED,payload:res.data})
                
            } catch (err) {
                
                dispatch({type:AUTH_ERROR})
            }
     }
     const login = async formData => {
        console.log("test2 ")
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
    try {
        console.log("test3 ")
        const res = await axios.post('/api/auth', formData,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data 
        })
        
        loadUser()
        console.log("test4 ")
    } catch (error) {
        
       dispatch({
           type:LOGIN_FAIL,
           payload: error.response.data.msg 
       })
       
    }
   }
    const logout = ()=>{
         dispatch({type:LOGOUT})
    }
    const clearErrors= ()=>{
         dispatch({type:CLEAR_ERRORS})
    }
     const register = async formData => {
         const config = {
             headers:{
                 'Content-Type':'application/json'
             }
         }
     try {
         const res = await axios.post('/api/users', formData,config)
         console.log('test register success')
         dispatch({
             type:REGISTER_SUCCESS,
             payload: res.data 
         })
         loadUser()
     } catch (error) {
         console.log('test register fail')
        dispatch({
            type:REGISTER_FAIL,
            payload: error.response.data.msg 
        })
     }
    }
     return (
         <AuthContext.Provider value= {{
             token: state.token,
             isAuthenicated: state.isAuthenicated,
             loading: state.loading,
             user: state.user,
             error: state.error,
             register,
             login,
             logout,
             loadUser,
             clearErrors
           
             }}>
             {props.children}
         </AuthContext.Provider>
     )
 }

 export default AuthState