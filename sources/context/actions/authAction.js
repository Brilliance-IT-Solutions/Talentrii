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
        "emailId": form.Email,
        "password": form.Password,
        "firstName": "Amandeep Test"
    }
    const response = await axiosManager.post(url, param)    
    return response
}
export { authAction }
