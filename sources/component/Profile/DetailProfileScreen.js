import React, {useRef} from 'react';
import {View, Text} from 'react-native';
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

const DetailProfileScreen = () => {
  const route = useRoute();
  const userProfileDetail = route.params.detail;
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
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

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
      <View>
        <SwiperFlatList
          data={userProfileDetail.inner}
          pagingEnabled={true}
          horizontal
          showPagination={userProfileDetail.inner.length > 1 ? true : false}
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
        {userProfileDetail.inner.map((item, index) => {
          return (
            <>
              {index === 0 ? (
                <View key={index}>
                  <Text>Likes:{item.likes_count}</Text>
                  <Text>comment:{item.comment_count}</Text>
                </View>
              ) : null}
            </>
          );
        })}
      </View>
    </View>
  );
};

export default DetailProfileScreen;
