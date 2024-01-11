import { View ,Text} from "react-native"
import React,{useContext, useEffect, useState} from "react"
import colors from "../../../assets/themes/colors"
import { ToggleContext } from '../../../context/privacy/context';
import axiosManager from "../../../helpers/axiosHandler"
import { APIs } from "../../../constants/api"
import {Switch} from 'react-native-switch'
import { Controller } from "react-hook-form"
import fontFamily from "../../../style/fontFamily"

const PrivacyComponent = ({control,name,defaultValue=true}) => {
    const { isToggled, setToggled } = useContext(ToggleContext);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(()=>{
      // callApi()
    },[])
    

    const callApi = async () =>{
      const url = APIs.BASE_URL + APIs.CHALLENGE_PRIVACY
      let param = {
      }
      try{
       await axiosManager.get(url, param).then((res)=>{
          const privacy = res.data[0].privacy
          if(privacy === "1"){
            setIsEnabled(true)    
          }else{
            setIsEnabled(false)
          }
        })

      }
      catch(error){
         console.log(error.response.data)
      }
    }

  const toggleSwitch =  async () => {
    const newToggleValue = !isEnabled;
    setIsEnabled(newToggleValue);
  const url = APIs.BASE_URL + APIs.CHALLENGE_PRIVACY
  const param = {
    privacy: !isEnabled === true ? '1' : '0' 
  }
  await axiosManager.post(url,param).then((res)=>{
    const privacy = res.data.privacy
  })
  }

  return(
    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
       <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <>
        <Text style={[{fontSize:8,color:value ? colors.Icon : colors.Black,fontFamily:fontFamily.regular}]}>Private</Text>
        <View style={{marginHorizontal:3}}>
         <Switch
          barHeight={15}
          value={value}
          onValueChange={onChange}
          backgroundActive={colors.Green}
          backgroundInactive={colors.Grey}
          circleActiveColor={colors.White}
          circleInActiveColor={colors.White}
          renderActiveText={false}
          renderInActiveText={false}
          innerCircleStyle={{
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width:15,
            height:15,
            borderColor:colors.Filterborder
          }}
          switchLeftPx={4} 
        switchRightPx={4} 
        switchWidthMultiplier={1} 
        
         />
         </View>
        <Text style={[{fontSize:8,color:!value ? colors.Icon : colors.Black,fontFamily:fontFamily.regular}]}>Public</Text>
        </>
        )}/>
    </View>
  )
}

export default PrivacyComponent