import React, {useRef, useState} from 'react';
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
  const url = 'https://bit-aws-s3.s3.ap-south-1.amazonaws.com/'
  const {signOut} = React.useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [visibleVideos, setVisibleVideos] = useState([]);
  const videoRef = useRef(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 95,
    waitForInteraction: true,
  };

  const onBuffer = e => {
    // setIsLoading(false)
    // console.log("buffering....")
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

  // Function to preload the video
  const preloadVideo = () => {
    if (videoRef.current) {
      videoRef.current.seek(0); // Start from the beginning
    }
  };

  // Handle visibility changes of videos
  const onViewableItemsChanged = ({viewableItems}) => {
    setVisibleVideos(viewableItems.map(({index}) => videos[index]));
  };

  return (
    <>
      <View style={{flex: 1}}>
        <SwiperFlatList
          data={props.innerdata.inner || []}
          horizontal
          showPagination={props.innerdata.inner.length > 1 ? true : false}
          paginationActiveColor={colors.Green}
          viewabilityConfig={viewabilityConfig}
          // onViewableItemsChanged={onViewableItemsChanged}
          paginationStyle={{
            bottom: 60,
          }}
          renderItem={({item, index}) =>
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
                    // poster={item.thumbnail_url}
                    // posterResizeMode="cover"
                    source={{uri: item.original_url, type: 'mp4'}}
                    ref={videoRef}
                    onLoadStart={onLoadStart}
                    onBuffer={onBuffer}
                    onError={onError}
                    onLoad={onLoad}
                    preload={'metadata'} // Set preload to true
                    // onLoad={preloadVideo} // Trigger preload when the video is loaded
                    repeat
                    // paused={true}
                    style={styles.bgvideo}
                    resizeMode="cover"
                    // paused={index !== currentRenderVideoIndex}
                    muted
                    autoplay
                    removeClippedSubviews={true}
                  />
                </DoubleClick>

                <HomeComponent item={item} index={index} />
              </View>
            ) : (
              <View>
                <FastImage
                  style={{width: width, height: getHeight(), flex: 1}}
                  source={{
                    uri: item.original_url,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <HomeComponent item={item} index={index} />
              </View>
            )
          }
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </>
  );
};

export default InnerSwiper;
