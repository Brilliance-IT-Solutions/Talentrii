import react from 'react';
import {View ,Text} from 'react-native'
import colors from '../../assets/themes/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'
import fontFamily from '../../style/fontFamily';
const NotificationComponent = ({notification}) =>{
    return(
        <View style={{marginVertical:7}}>
        <View style={{marginHorizontal:10,flexDirection:'row',alignItems:'center'}}>
        <View style={{backgroundColor:colors.Green,borderRadius:10,padding:2}}>
         <Icon name={"bar-chart"} size={25} color={colors.White}></Icon>
         </View>
         <View style={{flex:1,marginLeft:10}}>
         <Text style={{fontSize:10,flexWrap:'wrap',color:colors.Black,fontFamily:fontFamily.medium}}>{notification}</Text>
         </View>
        </View>
        </View>
    )
}

export default NotificationComponent