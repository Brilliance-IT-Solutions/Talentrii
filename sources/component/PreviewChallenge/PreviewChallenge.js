import React, {useRef} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import colors from '../../assets/themes/colors';

import CustomHeader from '../customHeader/customHeader';
import TittleHeader from '../customHeader/tittleHeader';
import RootContainer from '../rootContainer/rootContainer';

import {staticConstant} from '../../constants/staticData/staticConstant';
import {useRoute} from '@react-navigation/native';

import {IMAGES} from '../../constants/images';
import Video from 'react-native-video';
import ButtonComponent from '../common/Buttons/buttonComponent';
import SwiperFlatList from 'react-native-swiper-flatlist';
// import styles from '../home/styles';
import {Dimensions} from 'react-native';
import {getHeight} from '../../utils/GenericFunction';
import {APIs} from '../../constants/api';
import axiosManager from '../../helpers/axiosHandler';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {RouterNames} from '../../constants/routeNames';

const {width} = Dimensions.get('window');

const PreviewChallenge = () => {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const param =
    route.params.data.length > 0 ? JSON.parse(route.params.data) : '';
  const users = param.url;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 95,
    waitForInteraction: true,
  };

  const videoRef = useRef(null);
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

  const publishChallenge = async () => {
    if (param) {
      const url = APIs.BASE_URL + APIs.CREATE_CHALLENGE;
      await axiosManager
        .post(url, param)
        .then(res => {
          toast.show(res.message, {
            type: 'success',
            placement: 'top',
            duration: 3000,
            animationType: 'slide-in',
          });
          navigation.navigate(RouterNames.HOME_SCREEN);
        })
        .catch(error => {
          toast.show(error.response.data.response.message, {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            animationType: 'slide-in',
          });
        });
    } else {
      toast.show('please select atleast one image/video', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
      return;
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={[styles.container, {position: 'relative'}]}>
        <SwiperFlatList
          horizontal={true}
          data={users}
          viewabilityConfig={viewabilityConfig}
          renderItem={({item, index}) =>
            item.type === 'video/mp4' ? (
              <View>
                <Video
                  source={{uri: item.originalurl}}
                  ref={videoRef}
                  onBuffer={onBuffer}
                  onError={onError}
                  repeat
                  style={{flex: 1, height: getHeight(), width: width}}
                  resizeMode="cover"
                  // paused={index !== currentRenderVideoIndex}
                  muted
                  autoplay
                  // paused={false}
                ></Video>
                <Image source={IMAGES.PLAY_ICON} style={styles.playIcon} />
              </View>
            ) : (
              <Image
                source={{uri: item.originalurl}}
                style={{
                  marginHorizontal: 10,
                  marginBottom: 10,
                }}
                resizeMode="contain"
                width={width}
                height={getHeight()}
              />
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={{position: 'absolute', right: 10}}>
          <ButtonComponent title="Publish" onPressFunc={publishChallenge} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  playIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
    top: '50%',
    left: '45%',
  },
});
export default PreviewChallenge;
