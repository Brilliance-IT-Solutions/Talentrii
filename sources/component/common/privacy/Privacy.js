import CustomHeader from "../../customHeader/customHeader"
import TittleHeader from "../../customHeader/tittleHeader"
import { View,Switch,TouchableOpacity ,Text} from "react-native"
import React,{useContext, useEffect, useState} from "react"
import colors from "../../../assets/themes/colors"
import ParagraphContainer from "../Paragraph/paragraph"
import { ToggleContext } from '../../../context/privacy/context';
import axiosManager from "../../../helpers/axiosHandler"
import { APIs } from "../../../constants/api"
import { staticConstant } from "../../../constants/staticData/staticConstant"

const PrivacyComponent = ({props}) => {
    const { isToggled, setToggled } = useContext(ToggleContext);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(()=>{
      callApi()
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
    <View style={{flex:1}}>
        <CustomHeader showImage showBack/>
        <TittleHeader title={staticConstant.privacyTitle}/>
        <Switch
        trackColor={{false: colors.grey , true: colors.Green}}
        thumbColor={isEnabled ? colors.Green : colors.Grey}
        onValueChange={toggleSwitch}
        value={isEnabled}
        />
      <View style={{margin:10,padding:10}}>
      <View style={{marginBottom:5}}>
        <Text style={{fontSize:16,fontWeight:'700',color:colors.grey}}>{staticConstant.publicTitle}</Text>
        <Text style={{fontSize:14,fontWeight:'200',color:colors.Grey,paddingVertical:7}}>{staticConstant.publicChallenge}</Text>
      </View>
      <View style={{marginTop:5}}>
        <Text style={{fontSize:16,fontWeight:'700',color:colors.grey}}>{staticConstant.privateTitle}</Text>
        <Text style={{fontSize:14,fontWeight:'200',color:colors.Grey,paddingVertical:7}}>{staticConstant.privateChallenge}</Text>
      </View>
      </View>

    </View>
  )
}

export default PrivacyComponent