import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {IMAGES} from '../../constants/images';
import colors from '../../assets/themes/colors';
import IconCont from '../../component/common/IconCount/iconCount';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {staticConstant} from '../../constants/staticData/staticConstant';
import axiosManager from '../../helpers/axiosHandler';
import {APIs} from '../../constants/api';
import {useNavigation} from '@react-navigation/native';
import {RouterNames} from '../../constants/routeNames';

const HomeComponent = props => {
  const navigation = useNavigation();
  // const pressLike = () => {console.log("1111")};
  const [tap, setTap] = useState(false);
  const [likecount, setLikeCount] = useState(props.item.likes_count);

  useEffect(() => {
    setTap(props.Tap);
    setLikeCount(prev => prev + 1);
  }, [props.Tap]);

  useEffect(() => {
    setLikeCount(props.likeCount);
  }, [props.item.likes_count]);

  const pressLike = async () => {
    console.log('clicked');
    props.LikePress();
  };

  const pressShare = async () => {
    console.log('share');
    props.onShare();
  };

  const comments = () => {
    navigation.navigate(RouterNames.COMMENTS, {
      challengeId: props.item.challenge_id,
    });
  };

  const navigateTo = id => {
    navigation.navigate(RouterNames.PROFILE_SCREEN, {
      userId: id,
    });
  };
  return (
    <View style={{position: 'absolute'}}>
      <View>
        <LinearGradient
          colors={[colors.Black, colors.clear, colors.clear]}
          style={styles.topGradiant}></LinearGradient>
      </View>
      <View>
        <LinearGradient
          colors={[colors.clear, colors.Black]}
          style={styles.bottomGradiant}></LinearGradient>
      </View>
      <View>
        <View style={styles.topSection}>
          <Text style={styles.headerFont}>
            {staticConstant.Home.topSection.Accepted} {props.index}
          </Text>
          <Text style={styles.headerFont}>
            {staticConstant.Home.topSection.Talentrii}
          </Text>
          <Text style={styles.headerFont}>
            {staticConstant.Home.topSection.Following}
          </Text>
        </View>
        <View style={styles.topIconRowSection}>
          <View style={styles.topIcon}>
            {tap === true || props.item.isLiked === 'true' ? (
              <IconCont
                imageSource={IMAGES.LIKED}
                onIconPress={pressLike}
                width={35}
                height={35}
              />
            ) : (
              <IconCont
                imageSource={IMAGES.LIKE}
                onIconPress={pressLike}
                width={35}
                height={35}
              />
            )}
            <Text style={styles.topIconText}>{likecount}</Text>
          </View>
          <View style={styles.topIcon}>
            <IconCont
              imageSource={IMAGES.COMMENT}
              onIconPress={comments}
              width={35}
              height={35}
            />
            <Text style={styles.topIconText}>{props.item.comment_count}</Text>
          </View>
          <View style={styles.topIcon}>
            <IconCont
              imageSource={IMAGES.SHARE}
              onIconPress={pressShare}
              width={35}
              height={35}
            />
            <Text style={styles.topIconText}>{props.item.share}</Text>
          </View>
        </View>

        {/* //////////////////////////////    BOTTOM SECTION       /////////////////////// */}

        <View style={styles.bottomSection}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigateTo(props.item.id)}>
              <Image
                style={styles.bottomProfileImage}
                source={{
                  uri:
                    props.item.profileImage !== 'undefined'
                      ? props.item.profileImage
                      : 'https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png',
                }}
                // source={{ uri: props.payload.profileImage }}
                resizeMode="cover"
                defaultSource={IMAGES.BRAND_FULL_LOGO}
              />
            </TouchableOpacity>
            <View style={styles.bottomProfileTextContainer}>
              <Text style={styles.bottomProfileNameText}>
                {props.item.emailId}
              </Text>
              <View style={styles.bottomProfileFollowerSection}>
                <Text style={styles.followerCount}>
                  {staticConstant.Home.bottomSection.Followers}
                </Text>
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
              {+props.item.userId === +props.LoggedInUser ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: colors.White,
                  }}>
                  Challenge Friends
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: colors.White,
                  }}>
                  Accept/Accepted Friends
                </Text>
              )}
            </View>
          </View>
          <View style={styles.challengeTitleContainer}>
            <Text style={styles.challengeTitle}>{props.item.title}</Text>
          </View>
          <View style={styles.challengeSubTitleContainer}>
            <Text style={styles.challengeSubTitle}>
              {staticConstant.Home.bottomSection.Title}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HomeComponent;
