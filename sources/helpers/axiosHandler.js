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
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOm51bGwsInVzZXJOYW1lIjpudWxsLCJlbWFpbElkIjoidGVzdEB0ZXN0MS5jb20iLCJwYXNzd29yZCI6IldaUkhHcnNCRVNyOHdZRlo5c3gwdFBVUnVaZ0cybG16eXZXcHdYUEt6OFU9IiwiYXV0aFByb3ZpZGVyIjpudWxsLCJnZW5kZXIiOm51bGwsInByb2ZpbGVJbWFnZSI6Imh0dHBzOi8vZHV0Y2h1cHBibG9iLnMzLmFtYXpvbmF3cy5jb20vbXlGaWxlLTE2MTg4MTI3NDU3MTkuanBnIiwic29jaWFsSWQiOm51bGwsImNyZWF0ZWREYXRlIjoiMjAyMS0xMi0yMVQyMzozNToyNy4wMDBaIiwibGFzdExvZ2luIjoiMjAyMi0wMS0xOVQyMzozMjowNy4wMDBaIiwibWVzc2FnZSI6IkxvZ2luIFN1Y2Nlc3MifSwiaWF0IjoxNjQyNjU0OTI3LCJleHAiOjE2NDI3NDEzMjd9.njKIamc1TkIxhqbkY7jUH6aa3-o242Y7vyofabn0PTE'
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
    // return response
    return response.data ? response.data.response : response.data
  },
  (error) => {    

    //  if (!checkAPIstatus(response)){ 
    // show alert
    //  }
    return Promise.reject(error)
  }
)
export default axiosManager;