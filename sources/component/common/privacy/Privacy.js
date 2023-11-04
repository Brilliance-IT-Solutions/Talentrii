import CustomHeader from "../../customHeader/customHeader"
import TittleHeader from "../../customHeader/tittleHeader"
import { View,Switch,TouchableOpacity ,Text} from "react-native"
import React,{useContext, useEffect, useState} from "react"
import colors from "../../../assets/themes/colors"
import ParagraphContainer from "../Paragraph/paragraph"
import { ToggleContext } from '../../../context/privacy/context';

const PrivacyComponent = ({props}) => {
    const { isToggled, setToggled } = useContext(ToggleContext);
    const [isEnabled, setIsEnabled] = useState(false);
    
  const toggleSwitch =  () => {
   setIsEnabled((prev) => !prev)

    setToggled(!isEnabled)
    
  }

  return(
    <View style={{flex:1}}>
        <CustomHeader showImage showBack/>
        <TittleHeader title={'Challenge Privacy'}/>
        <Switch
        trackColor={{false: colors.grey , true: colors.Green}}
        thumbColor={isEnabled ? colors.Green : colors.Grey}
        onValueChange={toggleSwitch}
        value={isEnabled}
        />
        {isEnabled === true &&<Text>fdgdf</Text> }
      <View style={{margin:10,padding:10}}>
      <View style={{marginBottom:5}}>
        <Text style={{fontSize:16,fontWeight:'700',color:colors.grey}}>Public</Text>
        <Text style={{fontSize:14,fontWeight:'200',color:colors.Grey,paddingVertical:7}}>Public Challenge will appear on home screen which can be accessible to everyone by default it is public</Text>
      </View>
      <View style={{marginTop:5}}>
        <Text style={{fontSize:16,fontWeight:'700',color:colors.grey}}>Private</Text>
        <Text style={{fontSize:14,fontWeight:'200',color:colors.Grey,paddingVertical:7}}>Private Challenge will not appear on home screen which can not  be accessible to anyone by toggle the switch your account will be private</Text>
      </View>
      </View>

    </View>
  )
}

export default PrivacyComponent