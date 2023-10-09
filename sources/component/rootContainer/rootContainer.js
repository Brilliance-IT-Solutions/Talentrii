import React from 'react'
import {View, ScrollView,KeyboardAvoidingView,StyleSheet} from 'react-native'
import colors from '../../assets/themes/colors';



const RootContainer = ({children}) => {
    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
        <ScrollView style={{marginBottom: 20}}>
            <View>{children}</View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
      backgroundColor: colors.White,
      //  height:height,
      flex: 1
    },
  });
export default RootContainer;