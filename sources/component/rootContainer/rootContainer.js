import React from 'react'
import {View, ScrollView} from 'react-native'


const RootContainer = ({children}) => {
    return (
        <ScrollView>
            <View>{children}</View>
        </ScrollView>
    );
}
export default RootContainer;