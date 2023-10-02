import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IMAGES } from '../../constants/images';
import colors from '../../assets/themes/colors';
import IconCont from '../../component/common/IconCount/iconCount';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const HomeComponent = (props) => {
    // const pressLike = () => {console.log("1111")};

    const pressLike = () => setCount(prevCount => prevCount + 1);
    return (
        <View style={{ position: 'absolute' }}>
            <View>
                <LinearGradient colors={[colors.Black, colors.clear, colors.clear]}
                    style={styles.topGradiant}>
                </LinearGradient>
            </View>
            <View>
                <LinearGradient colors={[ colors.clear, colors.Black]}
                    style={styles.bottomGradiant}>
                </LinearGradient>
            </View>
            <View >
                <View style={styles.topSection}>
                    <Text style={styles.headerFont}>Accepted {props.index}</Text>
                    <Text style={styles.headerFont} >Talentrii</Text>
                    <Text style={styles.headerFont}>Following</Text>
                </View>
                <View style={styles.topIconRowSection}>
                    <View style={styles.topIcon}>
                        <IconCont
                            imageSource={IMAGES.LIKE}
                            onIconPress={pressLike}
                        />
                        <Text style={styles.topIconText}>{props.item.like}</Text>
                    </View>
                    <View style={styles.topIcon}>
                        <IconCont
                            imageSource={IMAGES.COMMENT}
                            onIconPress={pressLike}
                        />
                        <Text style={styles.topIconText}>{props.item.comment}</Text>
                    </View>
                    <View style={styles.topIcon}>
                        <IconCont
                            imageSource={IMAGES.SHARE}
                            onIconPress={pressLike}
                        />
                        <Text style={styles.topIconText}>{props.item.share}</Text>
                    </View>
                </View>


                {/* //////////////////////////////    BOTTOM SECTION       /////////////////////// */}
                
                
                <View style={styles.bottomSection}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.bottomProfileImage}
                            // source={{ uri: props.item.url }}
                            // source={{ uri: props.payload.profileImage }}
                            resizeMode='cover'
                            defaultSource={IMAGES.BRAND_FULL_LOGO}
                        />
                        <View style={styles.bottomProfileTextContainer}>
                            <Text style={styles.bottomProfileNameText}>{"Static Name"}</Text>
                            <View style={styles.bottomProfileFollowerSection}>
                                <Text style={styles.followerCount}>{"Static Followers"}</Text>
                                <Text style={styles.bottomFollowerText}>Followers</Text>
                            </View>
                        </View>
                        <View style={styles.bottomChallengeButton}>
                            <IconCont
                                imageSource={IMAGES.CHALLENEGE_ICON}
                                onIconPress={pressLike}
                                width={50}
                                height={50}
                            />
                            <Text style={{textAlign: 'center', fontSize: 12, color: colors.White}} >Challenge Friends</Text>
                        </View>
                    </View>
                    <View style={styles.challengeTitleContainer}>
                        <Text style={styles.challengeTitle}>
                            {props.item.title}
                        </Text>
                    </View>
                    <View style={styles.challengeSubTitleContainer}>
                        <Text style={styles.challengeSubTitle}>
                            {"Static Sub Title"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default HomeComponent;
