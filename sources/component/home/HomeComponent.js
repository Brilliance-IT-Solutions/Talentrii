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
import UserProfile from '../common/profile/profile';
import {height, width} from '../../style/responsiveSize';
import ButtonComponent from '../common/Buttons/buttonComponent';
import ParagraphContainer from '../common/Paragraph/paragraph';
import Icon from '../common/IconCount/Icons'


const HomeComponent = props => {
  const navigation = useNavigation();
  // const pressLike = () => {console.log("1111")};
  const [tap, setTap] = useState(false);
  const [likecount, setLikeCount] = useState(props.item.likes_count);
  const [showDesc, setShowDesc] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [showDesc1, setShowDesc1] = useState(false);
  const [numberOfLines1, setNumberOfLines1] = useState(1);


  useEffect(() => {
    setTap(props.Tap);
    setLikeCount(prev => prev + 1);
  }, [props.Tap]);

  useEffect(() => {
    setLikeCount(props.likeCount);
  }, [props.item.likes_count]);

  const pressLike = async () => {
    props.LikePress();
  };

  const pressShare = async () => {
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

  const onPressIcon= () =>{
    setShowDesc(prev => !prev)
    setNumberOfLines(showDesc ? 0 : 1)
  }

  const onPressIcon1= () =>{
    setShowDesc1(prev => !prev)
    setNumberOfLines1(showDesc1 ? 0 : 1)
  }
  return (
    <View style={{position: 'absolute', width: width, height: height}}>
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
        <View style={styles.topIconRowSection}>
        
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:18,fontWeight:'700',color:colors.White}}>{props.item.title}</Text>
            <Icon name={"sort-desc"} size={18} paddingTop={8}></Icon>
            </View>
            
          <UserProfile
                userName={props.item.userName}
                location={'Noida, India'}
                imageSource={IMAGES.USER_DEFAULT_ICON}
                height={40}
                width={40}
                userNameTextColor={colors.White}
                style={styleUser.container}
                onIconPress={() => navigateTo(props.item.userId)}
              />
          </View>
          <View>
            <ParagraphContainer txt={props.item.description} textstyle={styles.challengeTitle} containerStyle={styles.challengeTitleContainer} onPressFunc={onPressIcon} numberOfLines={numberOfLines}/>
          </View>
        </View>

        {/* //////////////////////////////    BOTTOM SECTION       /////////////////////// */}

        <View style={styles.bottomSection}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              <UserProfile
                userName={props.item.userName}
                location={'Noida, India'}
                imageSource={IMAGES.USER_DEFAULT_ICON}
                height={40}
                width={40}
                userNameTextColor={colors.White}
                style={styleUser.container}
                onIconPress={() => navigateTo(props.item.userId)}
              />
              <ButtonComponent title={'Follow'} buttonStyle={styles.btnStyle} textStyle={styles.textStyle}/>
            </View>
            <View style={[styles.bottomChallengeButton]}>
              <View style={{alignItems: 'center', marginBottom: 10}}>
                {tap === true || props.item.isLiked === 'true' ? (
                  <Icon name={'thumbs-up'} size={20} color={colors.White} onIconPress={pressLike} count={likecount} label={'Likes'}/>
                  
                ) : (
                  <Icon name={'thumbs-o-up'} size={20} color={colors.White} onIconPress={pressLike} count={likecount} label={'Likes'}/>
                )}
              </View>
              <View style={{alignItems: 'center', marginBottom: 10}}>
                 <Icon name={'download'} size={20} color={colors.White} onIconPress={pressShare}  label={'Saved'}/>
              </View>

              <View style={{alignItems: 'center', marginBottom: 10}}>
                <Icon name={'comment-o'} size={20} color={colors.White} onIconPress={comments}  label={'Comments'} count={props.item.comment_count}/>
              </View>

              <View style={{alignItems: 'center', marginBottom: 10}}>
                   <Icon name={'share-alt'} size={20} color={colors.White} onIconPress={pressShare}  label={'Shares'} count={props.item.share}/>

              </View>

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
                  {staticConstant.Home.challengeFriends}
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: colors.White,
                  }}>
                  {staticConstant.Home.acceptedFriends}
                </Text>
              )}
            </View>
          </View>
          <View>
            <ParagraphContainer txt={props.item.description} textstyle={styles.challengeTitle} containerStyle={styles.challengeTitleContainer}onPressFunc={onPressIcon1} numberOfLines={numberOfLines1} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styleUser = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});
export default HomeComponent;
