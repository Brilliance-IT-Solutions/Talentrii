import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Enums } from '../../constants/Enum/enum';
import { IMAGES } from '../../constants/images';
import { getFooterBottomMargin } from '../../utils/GenericFunction';
import IconCont from '../common/IconCount/iconCount';
import colors from '../../assets/themes/colors';
import { ScrollView } from 'react-native-gesture-handler';

const bottomIconSize = 30

const CustomFooter = props => {
    return (
        <View style={styles.footer}>
            <IconCont
                imageSource={IMAGES.HOME}
                width={bottomIconSize}
                height={bottomIconSize}
                onIconPress={() => props.didTapped(Enums.HomeIconRedirection.HOME)}
            />
              <IconCont
                imageSource={IMAGES.WARNING}
                width={bottomIconSize}
                height={bottomIconSize}
            />
             <IconCont
                imageSource={IMAGES.FLAGS}
                width={bottomIconSize}
                height={bottomIconSize}
            />
            
             <IconCont
                imageSource={IMAGES.FLAG}
                width={bottomIconSize}
                height={bottomIconSize}
            />
            
            {/* <IconCont
                imageSource={IMAGES.CREATE_CHALLENGE}
                width={bottomIconSize}
                height={bottomIconSize}
                onIconPress={() => props.didTapped(Enums.HomeIconRedirection.CREATE_CHALLENGE)}
            />
            <IconCont
                imageSource={IMAGES.USER_PROFILE_ICON}
                width={bottomIconSize}
                height={bottomIconSize}
                onIconPress={() =>props.didTapped(Enums.HomeIconRedirection.PROFILE)}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute', 
        bottom: getFooterBottomMargin(), 
        width: '100%',
         flexDirection: 'row',
          justifyContent: 'space-around',
          borderTopWidth:1,
          borderColor:colors.lightGrey,
          paddingVertical:10
    }    
})
export default CustomFooter;