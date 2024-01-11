import { View ,TextInput,Image,ScrollView,TouchableOpacity, SafeAreaView,Text} from "react-native";
import { IMAGES } from '../../../constants/images';
import react,{useState,useEffect,useRef} from 'react';
import colors from '../../../assets/themes/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Controller } from "react-hook-form";
import { Dropdown } from 'react-native-element-dropdown'
import styles from "../../../style/styles";
import Label from "../label/label";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import fontFamily from "../../../style/fontFamily";
const Location = ({control,name,placeholder,dropdowndata,label,rules}) =>{
    const _renderItem = item => {
      return (
        <View >
          <Text>{item.title}</Text>
        </View>
      );
    };
    const renderAccessory = (visible) => (
      <Icon name="location-pin" size={15} color={colors.Icon} />
    );
    return(
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
    <View>
    <Label title={label}></Label>
      <View style={[styles.textBoxes]}>
      <Dropdown
          control={control}
          name={name}
          data={dropdowndata}
          labelField="title"
          valueField="id"
          placeholder={placeholder}
          value={value}
          onChange={item => onChange(item.id)}
          renderItem={item => _renderItem(item)}
          style={[{height:45,fontSize:12,fontFamily:fontFamily.regular},styles.leftStandardPadding]}
          placeholderStyle={{fontSize:12,fontFamily:fontFamily.regular}}
          selectedTextStyle={{fontSize:12,fontFamily:fontFamily.regular}}
          inputSearchStyle={{fontSize:10,fontFamily:fontFamily.regular}}
          renderRightIcon={renderAccessory}
          itemContainerStyle={[styles.leftStandardPadding,{paddingVertical:10}]}
        />
      </View>
      {error && (
            <Text style={[ styles.leftStandardPadding,{
                color: 'red',
                alignSelf: 'stretch',
                marginHorizontal: 18,
                fontSize:11,
                fontFamily:fontFamily.medium
              } ,]}>
              {error.message || STRINGS.ERROR}
            </Text>
          )}  
    </View>
        )}
        />
    )
}


export default Location;