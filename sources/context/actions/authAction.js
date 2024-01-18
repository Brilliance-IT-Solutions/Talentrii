import { REGISTER_CLEAR_STATE } from "../../constants/actionTypes";
import { APIs } from "../../constants/api";
import axiosManager from '../../helpers/axiosHandler';

export const clearAuthState = () => dispatch => {
    dispatch({
        type: REGISTER_CLEAR_STATE
    })
}
const authAction = async (form) => {
    const url = APIs.BASE_URL + APIs.LOGIN_LINK
    const param = {
        "emailId": form.emailId,
        "password": form.password,
        "authProvider":form.authProvider
    }
    const response = await axiosManager.post(url, param)    
    return response
}

const authSignUpAction = async (form) => {
    const url = APIs.BASE_URL + APIs.SIGNUP_LINK
    const param = {
        "firstName":form.firstName,
        "emailId": form.emailId,
        "password": form.password,
        "authProvider":form.authProvider
    }
    const response = await axiosManager.post(url, param)    
    return response
}

const authSignUpWithGoogle = async (form) => {
    const url = APIs.BASE_URL + APIs.SIGNUP_LINK_WITH_GOOGLE
    const param = {
        "firstName":form.firstName,
        "emailId": form.emailId,
        "authProvider":form.authProvider
    }

    const response = await axiosManager.post(url, param)    
    console.log(response)
    return response
}

const authSignInWithGoogle = async (form) => {
    const url = APIs.BASE_URL + APIs.SIGNIn_LINK_WITH_GOOGLE
    const param = {
        "firstName":form.firstName,
        "emailId": form.emailId,
        "authProvider":form.authProvider
    }

    const response = await axiosManager.post(url, param)    
    console.log(response)
    return response
}
export { authAction,authSignUpAction ,authSignUpWithGoogle,authSignInWithGoogle}
