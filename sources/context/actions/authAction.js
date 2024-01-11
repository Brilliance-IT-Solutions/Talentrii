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
export { authAction,authSignUpAction }
