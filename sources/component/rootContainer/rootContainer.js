import React from 'react'
import {View, ScrollView,KeyboardAvoidingView,StyleSheet} from 'react-native'



const RootContainer = ({children}) => {
    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
        <ScrollView>
            <View>{children}</View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1
    },
  });
export default RootContainer;