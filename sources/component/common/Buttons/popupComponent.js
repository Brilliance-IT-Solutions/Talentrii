import React from 'react'
import { Text, View } from 'react-native'
import colors from '../../../assets/themes/colors'
import { StyleSheet } from 'react-native';
import { Menu, MenuItem} from 'react-native-material-menu';
import { useState } from 'react'

const PopupComponent = (props) => {
    const [visible, setVisible] = useState(false);
    
    const handleEvent = (value) => {
    const eventValue = value  
      props.addComponent(eventValue);
      hideMenu()
    };

    const hideMenu = () =>{
        setVisible(false)
    };

    const showMenu = () => setVisible(true);
    return (
        <View style={{alignItems:'center',bottom:15}}>
        <Menu
          visible={visible}
          anchor={<Text onPress={showMenu} style={{backgroundColor:colors.Green,borderRadius:40,height:44,width:44,color:colors.White,textAlign:'center',fontSize:30}}>{props.title}</Text>}
          onRequestClose={hideMenu}
          style={{borderRadius:8,borderWidth:1,borderColor:colors.gray,paddingRight:5}}>
          <MenuItem onPress={()=>handleEvent('add image')} textStyle={{color:'black'}}>{"\u2022"} Add Images/Videos</MenuItem>
          <MenuItem onPress={()=>handleEvent('add location')} textStyle={{color:'black'}}>{"\u2022"} Add Location</MenuItem>
          <MenuItem onPress={()=>handleEvent('add startDate')} textStyle={{color:'black'}}>{"\u2022"} Add Date</MenuItem>
          {/* <MenuItem onPress={()=>handleEvent('add endDate')} textStyle={{color:'black'}}>{"\u2022"} Add End Date</MenuItem> */}
          <MenuItem onPress={()=>handleEvent('add time')} textStyle={{color:'black'}}>{"\u2022"} Add Time</MenuItem>
        </Menu>
      </View>
          );
         };


         const styles = StyleSheet.create({
            menu:{
              backgroundColor:colors.Green,
              borderRadius:40,
              height:44,
              width:44,
              color:colors.White,
              textAlign:'center',
              fontSize:30
            },
            menuItem:{
              borderRadius:8,
              borderWidth:1,
              borderColor:colors.gray
            }
         })
     


export default PopupComponent
