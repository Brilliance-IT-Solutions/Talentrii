import { REGISTER_CLEAR_STATE } from "../../constants/actionTypes";
import { APIs } from "../../constants/api";
import axiosManager from '../../helpers/axiosHandler';
import { GoogleSignin ,statusCodes } from '@react-native-google-signin/google-signin';

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

GoogleSignin.configure({
    // apiKey:"AIzaSyAi3jmbXmkVz08rkgpApv230c7KDkecETA",
    AndroidClientId:"899441618311-t6j3uo57dcbpeaocrbsikosjh560nq9d.apps.googleusercontent.com"
   
  });

  const Google = async () =>{
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("cancelled")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("in progress")

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("not avaible")

      } else {
        // some other error happened
        console.log("wererr",error.response.data.response.message)

      }
      return
    }
  }

export { authAction,authSignUpAction,Google}
