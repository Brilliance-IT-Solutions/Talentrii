import React from 'react';
import { View } from 'react-native';
import colors from '../../../assets/themes/colors';
import Spinner from 'react-native-loading-spinner-overlay';

const CustomLoader = ({isLoading=false}) =>{
    if(isLoading){
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Spinner
          visible={isLoading}
          textContent={'Please Wait...'}
          textStyle={{
            textAlign: 'center',
            color: colors.Grey,
            fontSize: 13,
          }}
        />
      </View> 
    )
}
return null;
}

export default CustomLoader