import React, {useRef} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {View, Image,FlatList, Text} from 'react-native';
import Video from 'react-native-video';
import {getHeight} from '../../utils/GenericFunction';
import HomeComponent from './HomeComponent';
import styles from '../../screen/home/styles';
import DoubleClick from 'react-native-double-tap';
import colors from '../../assets/themes/colors';
import { width } from '../../style/responsiveSize';



const InnerSwiper = props => {
  const videoRef = useRef(null);
  // console.log('fdgfd', props.innerdata.inner);
  
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 95,
    waitForInteraction: true,
  };
  
const onBuffer = e => {
  // setIsLoading(false)
  //    buffering: true
  // console.log("buffering....", e)
};
const onError = e => {
  // console.log("error released....", e)
};
const onLoad = e => {
  // console.log("error loader....", e)
  /* set loader to true*/
};

  return (
    <>
      <View style={{flex:1}}>
        <SwiperFlatList
          data={props.innerdata.inner || []}
          horizontal
          showPagination={props.innerdata.inner.length > 1 ? true : false}
          paginationActiveColor={colors.Green}
          viewabilityConfig={viewabilityConfig}
          // onViewableItemsChanged={onViewableItemsChanged}
          paginationStyle={{
            bottom:60
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
                    source={{uri: item.original_url}}
                    ref={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    // onLoad={onLoad}
                    repeat
                    // paused={true}
                    style={styles.bgvideo}
                    resizeMode="cover"
                    // paused={index !== currentRenderVideoIndex}
                    muted
                    autoplay
                  />
                </DoubleClick>

                <HomeComponent item={item} index={index} />
              </View>
            ) : (
              <View>
                <Image
                  source={{uri: item.original_url}}
                  style={{
                    flex: 1,
                    width: width,
                    height: getHeight(),
                    resizeMode: 'cover',
                  }}
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
