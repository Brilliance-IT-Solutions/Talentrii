import axios from "react-native-axios";
import {
  checkAPIstatus,
  getToken
} from "../utils/GenericFunction";

const axiosManager = axios.create({
})

axiosManager.interceptors.request.use(
  async config => {
      const token = await getToken()
      if (token) {
          config.headers.token = token
      }
      return config

  },
  error => {
      return Promise.reject(error)
  }
)


axiosManager.interceptors.response.use(
  (response) => {
    return response?.data ? response?.data?.response : response?.data
  },
  (error) => {    

    //  if (!checkAPIstatus(response)){ 
    // show alert
    //  }
    return Promise.reject(error)
  }
)
export default axiosManager;