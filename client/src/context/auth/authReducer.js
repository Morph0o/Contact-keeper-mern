import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS

}  from '../Types'

export default (state,action) => {
    switch(action.type){
        case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenicated: true,
                loading:false
            }
            case AUTH_ERROR:
            case REGISTER_FAIL:
            case LOGIN_FAIL: 
            case LOGOUT:

                localStorage.removeItem('token')
                return{
                    ...state,
                    token:null,
                    isAuthenicated:false,
                    loading:false,
                    user:null,
                    error: action.payload
                }
            case USER_LOADED:
                return{
                    ...state,
                    isAuthenicated: true,
                    loading: false,
                    user: action.payload
                }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    errors:null
                }
    default:
        return state
}
}