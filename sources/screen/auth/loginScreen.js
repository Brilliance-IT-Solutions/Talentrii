import React, { useContext } from 'react';
import { GlobalContext } from '../../context/Provider';
import LoginComponent from '../../component/Login/LoginComponent';
import { authAction } from '../../context/actions/authAction';

import CustomAlert from '../../component/common/alert/customAlert';
import { View } from 'react-native';
import { Enums } from '../../constants/Enum/enum';
import { REGISTER_LOADING, REGISTER_SUCCESS } from '../../constants/actionTypes/index'
import { getUserLocation, saveUserLocation, setToken, setUser } from '../../utils/GenericFunction';
import { AuthContext } from '../../context/context';

import GetLocation from 'react-native-get-location';
import { showError, showSuccess } from '../../component/common/toaster/toaster';

const LoginScreen = () => {

  const { authDispatch, authState: { error, loading, data } } = useContext(GlobalContext);

  const [form, setForm] = React.useState({})
  const [showAlert, setshowAlert] = React.useState(false)
  const [alertMessage, setalertMessage] = React.useState("")
  const [errors, setErrors] = React.useState({})
  const { signIn } = React.useContext(AuthContext);

  const callLoginAPI = async () => {

    authDispatch({ type: REGISTER_LOADING })
    try {
      const res = await authAction(form);
      if (res.token) { await setToken(res.token) }
      if (res.data) { await setUser(JSON.stringify(res.data)) }
      
      authDispatch({ type: REGISTER_SUCCESS, payload: res.response })
      signIn()
      showSuccess(res.message)

    } catch (error) {
      authDispatch({ type: constants.REGISTER_FAIL, payload: error });
    showError(error.message)
    }
  }

  const onChange = ({ name, value }) => {

    setForm({ ...form, [name]: value });
    if (value !== '') {
      setErrors(prev => {
        return { ...prev, [name]: null }
      })
    } else {
      setErrors(prev => {
        return { ...prev, [name]: name + ' is required' }
      })
    }
  };


  const onSubmit = () => {


    // async function getLocation() {
    //   var loc = await getUserLocation()
    //   console.log("get user location ", loc)
    // }
      
    // getLocation()
    // GetLocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    //   timeout: 15000,
    // })
    //   .then(location => {
    //     if (location) {
    //       if (location.latitude && location.longitude) {

    //         var value = `Lattitude and longitude both are fetched ${location.longitude}, ${location.latitude}`;

    //         saveUserLocation(`${location.longitude},${location.latitude}`)
    //         setalertMessage(value)
    //         setshowAlert(true)
    //       }
    //     }
    //     console.log(location);
    //   })
    //   .catch(error => {
    //     const { code, message } = error;
    //     console.warn(code, message);
    //   })


    // if (!form.Email) {
    //   setErrors(prev => {
    //     return { ...prev, Email: "Email is required" }
    //   })
    // }
    // else if (!form.Password) {
    //   setErrors(prev => {
    //     return { ...prev, Password: "Password is required" }
    //   })
    // }
    // else {
      callLoginAPI()
    // }
  };

  const alertButtonTapped = (data) => {
    switch (data) {
      case Enums.AlertButtons.CONFIRM: break;
      case Enums.AlertButtons.CANCEL: break;
      default: break;
    }
    setalertMessage("")
    setshowAlert(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <LoginComponent onSubmit={onSubmit} form={form} onChange={onChange} errors={errors} loading={loading} />
      <CustomAlert showCancelButton={true} show={showAlert} confirmText={"Done"} message={alertMessage} buttonTapped={alertButtonTapped} />
    </View>
  );
};
export default LoginScreen;
