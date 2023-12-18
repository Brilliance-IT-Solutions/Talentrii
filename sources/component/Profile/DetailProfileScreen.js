import React, {useRef,useEffect,useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {staticConstant} from '../../constants/staticData/staticConstant';
import TittleHeader from '../customHeader/tittleHeader';
import CustomHeader from '../customHeader/customHeader';
import colors from '../../assets/themes/colors';
import {useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import DoubleTap from '@memrearal/react-native-doubletap';
import axiosManager from '../../helpers/axiosHandler';
import {APIs} from '../../constants/api';
import Share from 'react-native-share';
import {width} from '../../style/responsiveSize';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Comments from '../home/Comments';
import RootContainer from '../rootContainer/rootContainer';
import { IMAGES } from '../../constants/images';
import IconCont from '../common/IconCount/iconCount';

const DetailProfileScreen = () => {
  const route = useRoute();
  const userName = route.params.userName;
  const userProfile = route.params.userProfile;
  const challengeId = route.params.challengeId;

  const [comments , setComments] = useState([])
  const [showComments , setShowComments] = useState(false)
  const [userProfileDetail , setuserProfileDetail] = useState([])
  const [tap, setTap] = useState(false);
  const videoRef = useRef(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 95,
    waitForInteraction: true,
  };

  const onBuffer = e => {
    // setIsLoading(false)
    console.log('buffering....');
  };
  const onError = e => {
    // console.log("error released....", e)
  };
  const onLoad = e => {
    // console.log("play")
    // console.log("error loader....", e)
    /* set loader to true*/
  };

  const onLoadStart = e => {
    //  console.log("..............")
  };

  // Handle visibility changes of videos
  const onViewableItemsChanged = ({index}) => {
    //   setVisibleVideos(index);
  };

  const doubleTap = async challengeId => {
    // setTap(true)
    let param = {
      challengeId: challengeId,
      status: true,
    };
    try {
      const response = await axiosManager.post(
        APIs.BASE_URL + '/likechallenge',
        param,
      );
      if (response.data.message === 'Liked Success') {
        setTap(true);
        getChallenges();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const pressLike = async (challengeId) =>{
    doubleTap(challengeId)
  }


    async function getComments(challengeId) {
      setShowComments(true)
      try {
        const commentsData = await axiosManager.post(
          APIs.BASE_URL + '/getcommentChallenge',
          {challengeId: challengeId},
        );
        setComments(commentsData.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }

  async function getChallenges() {
      try {
        const challenges = await axiosManager.post(
          APIs.BASE_URL + '/getChallengeById',
          {challengeId: challengeId},
        );
         setuserProfileDetail(challenges.data)

      } catch (error) {
        console.log(error.response.data);
      }
    }
    
  useEffect(()=>{
    getChallenges()
  },[route.params.challengeId])

  const onShare = async item => {
    const options = {
      url: item,
    };

    try {
      await Share.open(options).then(res => {
        console.log('dfdg', res);
      });
    } catch (error) {
      console.log('error');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <DoubleTap
          onSingleTap={() => {
            console.log('single tap!');
          }}
          onDoubleTap={() => doubleTap(item.challenge_id)}
          delay={0}>
          {item.type === 'video/mp4' ? (
            <View
              style={{
                width: width,
                height: 300,
                backgroundColor: colors.Black,
              }}>
              {/* <Text>{item.original_url}</Text> */}
              <Video
                source={{uri: item.original_url}}
                ref={videoRef}
                onLoadStart={onLoadStart}
                onBuffer={onBuffer}
                onError={onError}
                onLoad={onLoad}
                preload={'metadata'}
                repeat
                // paused={visibleVideos === index ? false:true}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                muted
                autoplay
                removeClippedSubviews={true}
                progress={true}
              />
            </View>
          ) : (
            <View
              style={{
                width: width,
                height: 300,
                backgroundColor: colors.Black,
              }}>
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                  flex: 1,
                  backgroundColor: colors.Black,
                }}
                source={{
                  uri: item.original_url,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          )}
        </DoubleTap>
      </>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.White}}>
      <CustomHeader showImage showBack />
      <TittleHeader title={staticConstant.DetailProfile.titleHeader} />
      <RootContainer>
      <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:"center"}}>
      <View style={{padding:5}}>
        <Image source={{uri: userProfile}} height={40} width={40} style={{borderRadius:50}}></Image></View>
         <View style={{padding:5}}>
        <Text style={{color:colors.Black}}>{userName}</Text>
        </View>
      </View>
      <View>
        <SwiperFlatList
          data={userProfileDetail[0]?.inner}
          pagingEnabled={true}
          horizontal
          showPagination={userProfileDetail[0]?.inner.length > 1 ? true : false}
          paginationActiveColor={colors.Green}
          viewabilityConfig={viewabilityConfig}
          onChangeIndex={onViewableItemsChanged}
          removeClippedSubviews={true}
          initialScrollIndex={0}
          maxToRenderPerBatch={1}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}></SwiperFlatList>
      </View>
      <View>
        {userProfileDetail[0]?.inner?.map((item, index) => {
          return (
            <View key={item.id}>
              {index === 0 ? (
                <View>
                  <View style={{flexDirection:'row'}}>
                  {tap === true || item.isLiked === 'true' ?  (
                <IconCont
                imageSource={IMAGES.LIKED}
                onIconPress={()=>pressLike(item.challenge_id)}
                width={20}
                height={20}
                marginhorizontal={5}
                marginvertical={5}            
            />):(
              <IconCont
                imageSource={IMAGES.LIKE}
                onIconPress={()=>pressLike(item.challenge_id)}
                width={20}
                height={20}
                marginhorizontal={5}
                marginvertical={5}
            />
            )
           }                
                   <IconCont
                imageSource={IMAGES.COMMENT}
                // onIconPress={()=>pressLike(item.challenge_id)}
                width={20}
                height={20}
                marginhorizontal={5}
                marginvertical={5}
            />     
                <IconCont
                imageSource={IMAGES.SHARE}
                // onIconPress={pressLike}
                width={20}
                height={20}
                marginhorizontal={5}
                marginvertical={5}
            />              
                
                  </View>     
                  <Text>Likes {item.likes_count}</Text>   
                  <Text>comments {item.comment_count}</Text>   
                  <TouchableOpacity onPress={()=>getComments(item.challenge_id)}>
                  <Text>View all comments</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          )
        }
        )}
      </View>
      {showComments && 
      (comments.length > 0  ?(
        comments?.map((item,index) => {
          return (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                marginhorizontal: 10,
                marginvertical: 5,
              }}>
              <View style={{paddingHorizontal: 10, borderRadius: 50}}>
                <Image
                  source={{
                    uri:
                     item.profileImage !== 'undefined'
                        ? item.profileImage
                        : 'https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png',
                  }}
                  height={40}
                  width={40}
                  style={{borderRadius: 50}}></Image>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Text style={{fontWeight:700,color:colors.Black}}>{item.emailId}</Text>
                <Text>{item.comments}</Text>
              </View>
            </View>
          );
        })
      ): (
        <Text style={{textAlign: 'center'}}>No Comments yet</Text>
      ))
      }
      <View>
      </View>
      </RootContainer>
    </View>
  );
};

export default DetailProfileScreen;
