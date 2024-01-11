import React from "react"
import { View } from "react-native"
import CustomInput from "../TextInput/CustomInput"
const SearchComponent = ({control,name,placeholder,icon,style}) =>{
    return(
        <View>
            <CustomInput
            control={control}
            name={name}
            placeholder={placeholder}
            icon={icon}
            style={style}
          />
        </View>
    )
}
export default SearchComponent