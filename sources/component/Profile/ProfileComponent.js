import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { IMAGES } from '../../constants/images';
import MultiLineContainer from '../common/2LineText/multiLineText';
import styles from './styles'
import { Constants } from '../../constants/constants';
import colors from '../../assets/themes/colors';
import { RouterNames } from '../../constants/routeNames';

import { useNavigation } from '@react-navigation/native';

const ProfileComponent = () => {

    const navigation = useNavigation();

    const data = [
        { id: 'a', value: 'A' },
        { id: 'b', value: 'B' },
        { id: 'c', value: 'C' },
        { id: 'd', value: 'D' },
        { id: 'e', value: 'E' },
        { id: 'f', value: 'F' },
        { id: 'g', value: 'F' },
        { id: 'h', value: 'F' },
        { id: 'i', value: 'F' },

    ];
    const numColumns = Constants.PROFILE_PAGE_NUMBER_OF_COLUMNS;

    const test = () => {
        navigation.navigate(RouterNames.UPDATE_PROFILE_SCREEN)
    }
    return (
        <View style={styles.rootContainer}>            
            <View style={styles.bioDataSection}>
                <View style={styles.bioDataImageView}>
                    <Image
                        style={styles.bioDataImage}
                        source={IMAGES.USER_PIC}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.bioDataTextView}>
                    <Text style={styles.bioDataText}>Amandeep Singh</Text>
                </View>
                <TouchableOpacity onPress={test} style={{position:'absolute', borderRadius: 17, 
                height: 34, width: 34, right: -10, top: -10,  backgroundColor: colors.Green,  alignItems:'center', justifyContent:'center'}}>
                    <Image 
                    style={{ height: 20, width:20}}
                    source={IMAGES.EDIT_ICON}
                    resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.multiLineContainerSection}>
                <MultiLineContainer txt1='20K' txt2='Followers' />
                <View style={styles.multiLineContainerCenterLine} />
                <MultiLineContainer txt1='20K' txt2='Followings' />
            </View>
            <View style={styles.bottomHistorySection}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.bottomHistoryView}>
                            <View style={styles.bottomHistoryImageView}>
                                <Image
                                    source={IMAGES.SPLASH_SCREEN_LOGO}
                                    resizeMode='contain'
                                    style={styles.bottomHistoryImage}
                                />
                                <View style={styles.bottomHistoryTextContainer}>
                                    <Text style={styles.bottomHistoryText}>305K</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item?.id}
                    numColumns={numColumns} />
            </View>
        </View>
    );
};
export default ProfileComponent;