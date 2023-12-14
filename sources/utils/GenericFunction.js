import AsyncStorage from "@react-native-async-storage/async-storage"
import { Enums } from "../constants/Enum/enum"
import { Dimensions, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const setLogOut = async () => {

    await AsyncStorage.setItem('isLoggedIn', Enums.AsyncStoreEnum.false)
}

export const setLogIn = async () => {

    await AsyncStorage.setItem('isLoggedIn', Enums.AsyncStoreEnum.true)
}

////////////////////.     LOGGED USER GENERIC FUNCTIONS         /////////////////

export const setUser = async (data) => {
  return  await AsyncStorage.setItem('user', data)
}
export const getUser = async () => {
   return await AsyncStorage.getItem('user')
}
export const removeUser = async () => {
    await AsyncStorage.removeItem('user')
}
/////////////////////////////////////////////////////////////////////////////////


////////////////////.     TOKEN BASED GENERIC FUNCTIONS         /////////////////

export const setToken = async (token) => {    
    await AsyncStorage.setItem('token', token)
}

export async function getToken() {

    try {
        let value = await AsyncStorage.getItem('token');
        if (value != null){
           return value
        }
        else {
           return null
       }
     } catch (error) {
       return null
     }
}

export async function clearToken() {
    await AsyncStorage.removeItem('token')
}

export const saveUserLocation = async (lat, long) => {    
    await AsyncStorage.setItem('location', JSON.stringify({lat: lat, long: long}))
}

export const getUserLocation = async () => {    
    try {
        let value = await AsyncStorage.getItem('location');
        if (value != null){
           return value
        }
        else {
           return null
       }
     } catch (error) {
       return null
     }
}

/////////////////////////////////////////////////////////////////////////////////

////////////////////.     API AXIO BASED GENERIC FUNCTIONS         //////////////

export const checkAPIstatus = (response) => {
    if (response) {
        if (response.status) {
            if (response.status === Enums.ServerStatus.SUCCESS) {
                return true
            }
            else {
                return false
            }
        }
    }
    return false
}

/////////////////////////////////////////////////////////////////////////////////

////////////////////.     DEVICES BASED HEIGHT GENERIC FUNCTIONS         //////////////
const { height, width } = Dimensions.get('window')
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const getTopMargin = () => {
    if (Platform.OS === 'ios') {
        return getStatusBarHeight()
    }
    else {
        return getStatusBarHeight()
    }
}
export const getFooterBottomMargin = () => {
    if (Platform.OS === 'ios') {
        return 20
    }
    else {
        return 10
    }
}
export const getHeight = () => {
    if (Platform.OS === 'ios') {
        return height
    }
    else {
        return (height - getStatusBarHeight())
    }
}


export const getNetworkState = () =>{
   return new Promise((resolve, reject) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                return resolve(true);
            }
            else {
                return resolve(false);
            }
        });
    })
}


/////////////////////////////////////////////////////////////////////////////////

////////////////////.     STRING BASED GENERIC FUNCTIONS         //////////////





/////////////////////////////////////////////////////////////////////////////////