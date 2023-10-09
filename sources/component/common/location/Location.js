import { View ,TextInput,Image,ScrollView,TouchableOpacity, SafeAreaView,Text} from "react-native";
import { IMAGES } from '../../../constants/images';
import react,{useState,useEffect,useRef} from 'react';
import colors from '../../../assets/themes/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Location = (props) =>{
  const ref = useRef();
    const [value,setValue] = useState('')

    const handleEvent = () => {
      const eventValue = false;   
      props.updateParent(eventValue);
    };

    
      useEffect(() => {
        ref.current?.setAddressText('Gill Chowk');
      }, []);

    return(
  <View style={{flexDirection:'row',marginHorizontal:30, marginVertical: 10}}>
      <Image source={IMAGES.LOCATION_ICON} style={{marginVertical:6,resizeMode:'contain'}} /> 
      {/* <TextInput  placeholder='Choose Location'  style={{borderWidth: 0.8,borderColor: colors.lightGrey,borderRadius:10,marginHorizontal:15,height:50,width:280,fontSize:18}} maxLength={200}/> */}
      <SafeAreaView style={{flex:6,marginLeft:11,marginRight:9}}  nestedScrollEnabled={true}>
      <GooglePlacesAutocomplete
       ref={ref}
      styles={{textInput: {
        borderWidth: 0.8,borderColor: colors.lightGrey,borderRadius:10,height:50,fontSize:16,
      paddingHorizontal:16
      }
      }} 
      placeholder='Choose Location'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyAi3jmbXmkVz08rkgpApv230c7KDkecETA',
        language: 'en',
      }}
      onFail={error => console.log(error)}
      onNotFound={() => console.log('no results')}
      disableScroll={true}
      fetchDetails={true}
      listEmptyComponent={() => (
        <View style={{flex: 1}}>
          <Text>No results were found</Text>
        </View>
      )}
    />
    </SafeAreaView>
    <TouchableOpacity onPress={handleEvent}><Image source={IMAGES.DELETE_ICON} style={{marginVertical:12}}/></TouchableOpacity>
    </View>
    )
}


export default Location;