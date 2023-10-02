import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../../assets/themes/colors'
import { StyleSheet } from 'react-native';
import { Menu, MenuItem, MenuDivider,MenuTrigger,MenuProvider,MenuOption,MenuOptions } from 'react-native-material-menu';
import { useState } from 'react'

const PopupComponent = ({ title, onPressFunc }) => {
    const [visible, setVisible] = useState(false);

    const hideMenu = () =>{
        setVisible(false)
    };
  
    const showMenu = () => setVisible(true);
    return (
        <View>
        <Menu
          visible={visible}
          anchor={<Text onPress={showMenu} style={{backgroundColor:colors.Green,borderRadius:40,height:44,width:44,color:colors.White,textAlign:'center',fontSize:30}}>{title}</Text>}
          onRequestClose={hideMenu}
          style={{borderRadius:8,borderWidth:1,borderColor:colors.gray}}>
          <MenuItem onPress={hideMenu} >{"\u2022"} Add Images/Video</MenuItem>
          <MenuItem onPress={hideMenu}>{"\u2022"} Add Location</MenuItem>
          <MenuItem onPress={hideMenu}>{"\u2022"} Add Start Date</MenuItem>
          <MenuItem onPress={hideMenu}>{"\u2022"} Add End Date</MenuItem>
          <MenuItem onPress={hideMenu}>{"\u2022"} Add Time</MenuItem>
        </Menu>
      </View>
          );
         };
     


export default PopupComponent
