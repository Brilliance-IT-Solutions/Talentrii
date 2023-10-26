import { View ,TextInput,Image,ScrollView,TouchableOpacity, SafeAreaView,Text} from "react-native";
import { IMAGES } from '../../../constants/images';
import react,{useState,useEffect,useRef} from 'react';
import colors from '../../../assets/themes/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Location = (props) =>{
    const [value,setValue] = useState('')

    const handleEvent = () => {
      const eventValue = false;   
      props.updateParent(eventValue);
    };

  
    return(
  <View style={{flexDirection:'row',marginHorizontal:30, marginVertical: 10}}>
      <Image source={IMAGES.LOCATION_ICON} style={{marginVertical:6,resizeMode:'contain'}} /> 
      <View style={{flex:6,marginLeft:11,marginRight:9}} >
      <TextInput  placeholder='Choose Location'  style={{borderWidth: 0.8,borderColor: colors.lightGrey,borderRadius:10,height:50,fontSize:16,paddingHorizontal:16}} maxLength={200}  onChangeText={props.onChangeText}/>
      </View>
    <TouchableOpacity onPress={handleEvent}><Image source={IMAGES.DELETE_ICON} style={{marginVertical:12}}/></TouchableOpacity>
    </View>
    )
}


export default Location;