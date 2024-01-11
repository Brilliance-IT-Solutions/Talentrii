import React, { useEffect, useRef, useState } from 'react';
import {
    Animated, Image, Modal, StyleSheet, TouchableOpacity, View,Text
} from 'react-native';
import { moderateScale, moderateScaleVertical } from '../../../style/responsiveSize';
import colors from '../../../assets/themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import fontFamily from '../../../style/fontFamily';

const CustomDialog = ({ visible, children, onPress,headingDate }) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal} onDismiss={() => toggleModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                    style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontFamily:fontFamily.semiBold,color:colors.Black}}>Date {headingDate}</Text>
                    <View>
                        <TouchableOpacity
                            onPress={onPress ? onPress : toggleModal}
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                           
                           <Icon name={'close'} size={18} color={colors.Black} />
                        
                        </TouchableOpacity>
                    </View>
                    </View>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor:colors.backGround,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: colors.White,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScaleVertical(20),
        borderRadius: moderateScale(5),
        elevation: 20,
    },

});

export default CustomDialog;
