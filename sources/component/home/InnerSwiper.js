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

const InnerSwiper = props => {
  const {signOut} = React.useContext(AuthContext);
  const [visibleVideos, setVisibleVideos] = useState(0);
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

  const renderItem = ({item,index})=>{
    return(
    item.type === 'video/mp4' ? (
      <View>
        <DoubleClick
          singleTap={() => {
            console.log('single tap');
          }}
          doubleTap={() => {
            console.log('double tap');
            signOut();
          }}>
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
        </DoubleClick>

        <HomeComponent item={item} index={index} />
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
        <HomeComponent item={item} index={index} />
      </View>
    )
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
