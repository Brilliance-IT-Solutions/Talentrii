import React, {useRef, useState,useEffect} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {View, Image, FlatList, Text} from 'react-native';
import Video from 'react-native-video';
import {getHeight} from '../../utils/GenericFunction';
import HomeComponent from './HomeComponent';
import styles from '../../screen/home/styles';
import DoubleClick from 'react-native-double-tap';
import colors from '../../assets/themes/colors';
import {height, width} from '../../style/responsiveSize';
import {AuthContext} from '../../context/context';
import FastImage from 'react-native-fast-image';
import DoubleTap from "@memrearal/react-native-doubletap";
import axiosManager from '../../helpers/axiosHandler';
import { APIs } from '../../constants/api';
import Share from 'react-native-share';
const InnerSwiper = props => {
  const [tap,setTap] = useState(false)
  const {signOut} = React.useContext(AuthContext);
  const [visibleVideos, setVisibleVideos] = useState(0);
  const [likeChallenge, setLikeChallenge] = useState(0);

  const videoRef = useRef(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 95,
    waitForInteraction: true,
  };

  const onBuffer = e => {
    // setIsLoading(false)
    console.log("buffering....")
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
      setVisibleVideos(index);  
  };


  const doubleTap = async (challengeId) =>{
      // setTap(true)
      let param = {
        challengeId : challengeId,
        status : true
      }
      try{
        const response = await axiosManager.post(APIs.BASE_URL + '/likechallenge', param)
         if(response.data.message === 'Liked Success'){
          setTap(true)         
         }
      }
      catch(error){
        console.log(error.response.data)
      }      
  }

  const onShare = async (item) => {
    const options ={
      url : item
    }

    try {
     await Share.open(options).then((res)=>{
       console.log("dfdg",res)

     })
    } catch (error) {
      console.log("error")
    }
  };


  const renderItem = ({item,index})=>{
    return(
      <>
        <DoubleTap
          onSingleTap={() => {
            console.log("single tap!");
          }}
          onDoubleTap={()=>doubleTap(item.challenge_id)}
          delay={0}
        >
      {
       item.type === 'video/mp4' ? (
      <View>
          <Video
            source={{uri: item.original_url, type: 'mp4',cache: true}}
            ref={videoRef}
            onLoadStart={onLoadStart}
            onBuffer={onBuffer}
            onError={onError}
            onLoad={onLoad}
            preload={'metadata'} 
            repeat
            paused={visibleVideos === index ? false:true}
            style={styles.bgvideo}
            resizeMode="cover"
            muted
            autoplay
            removeClippedSubviews={true}
            progress={true}
          />
       
      </View>
    ) : (
      <View>
        <FastImage
          style={{width: width, height: getHeight(), flex: 1 ,backgroundColor:colors.Black}}
          source={{
            uri: item.original_url,
            priority: FastImage.priority.high,
            cache:FastImage.cacheControl.immutable
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    )
    }
    <HomeComponent item={item} index={index} Tap={tap} LikePress={()=>doubleTap(item.challenge_id)} likeCount={item.likes_count} onShare={()=>onShare(item.original_url)}/>
    </DoubleTap>
    </>
    )
  }

  return (
    <>
      <View style={{flex: 1}}>
        <SwiperFlatList
          data={props.innerdata.inner || []}
          horizontal
          showPagination={props.innerdata.inner.length > 1 ? true : false}
          paginationActiveColor={colors.Green}
          viewabilityConfig={viewabilityConfig}
          onChangeIndex={onViewableItemsChanged}
          removeClippedSubviews={true}
          initialScrollIndex={0}
          maxToRenderPerBatch={1}         
          paginationStyle={{
            bottom: 60,
          }}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default InnerSwiper;
