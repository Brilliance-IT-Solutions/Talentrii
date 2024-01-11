import React,{useState} from 'react'
import { Controller } from "react-hook-form"
import { StyleSheet ,View,Pressable,Text} from 'react-native';
import colors from '../../../assets/themes/colors';
import Label from '../label/label';
import fontFamily from '../../../style/fontFamily';

const CustomRadio = ({control,name,data,label,defaultValue,search}) =>{
   return(
 <Controller
 control={control}
 name={name}
 defaultValue={defaultValue}
 render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
    <View>
       {label && <Label title={label}></Label>}
    <View style={{flexDirection:'row',marginHorizontal:10}}>
       {data.map((item,i) => {
           return (
            <View key={i} style={{flex:1}}>
            <Pressable
            style={
                item.label === value ? styles.selected : styles.unselected
            }
            onPress={() => onChange(item.label)}>
                <View style={{flex:1,alignItems:'center'}} >
            <Text style={[styles.option,{color:item.label === value ? colors.White : colors.Icon}]}> {search ? item.title :item.label}</Text>
          </View>
          </Pressable>
          </View>
        );
      })}  
    </View>
    </View>
 )}
 />
   ) 
}

const styles = StyleSheet.create({
  option: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily:fontFamily.regular
  },
  unselected: {
    backgroundColor: colors.InputBox,
    margin: 5,
    padding: 10,
    borderRadius: 6,
    borderWidth:1,
    borderColor:colors.lightGrey,
  },
  selected: {
    backgroundColor: colors.Green,
    margin: 6,
    padding: 10,
    borderRadius: 6,
  },
});
export default CustomRadio