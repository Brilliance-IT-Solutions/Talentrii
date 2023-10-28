import React, {useRef,useState} from 'react';
import {StyleSheet, View, Image,TouchableOpacity} from 'react-native';
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
import Spinner from 'react-native-loading-spinner-overlay';
const {width} = Dimensions.get('window');

const PreviewChallenge = () => {
  const videoRef = useRef(null)
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isCurrent, setCurrent] = useState(false);
  const [currentRenderVideoIndex, setCurrentRenderVideoIndex] = useState(0);

  const [control, setControl] = useState(false);

  const param =
    route.params.data.length > 0 ? JSON.parse(route.params.data) : '';
    // param.url
  const users = [{"originalurl": "https://dutchuppblob.s3.amazonaws.com/originals/183271%20%28720p%29.mp4", "thumbnailurl": "https://dutchuppblob.s3.amazonaws.com/thumbnails/183271%20%28720p%29.mp4", "type": "video/mp4"},{"originalurl": "https://dutchuppblob.s3.amazonaws.com/originals/183271%20%28720p%29.mp4", "thumbnailurl": "https://dutchuppblob.s3.amazonaws.com/thumbnails/183271%20%28720p%29.mp4", "type": "video/mp4"},{"originalurl": "https://dutchuppblob.s3.amazonaws.com/originals/183271%20%28720p%29.mp4", "thumbnailurl": "https://dutchuppblob.s3.amazonaws.com/thumbnails/183271%20%28720p%29.mp4", "type": "video/mp4"}];

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 95,
    waitForInteraction: true,
  };

  const onBuffer = e => {
    setLoader(true)
    //    buffering: true
    // console.log("buffering....", e)
  };
  const onError = e => {
    // console.log("error released....", e)
  };
  const onLoad = e => {
    setLoader(false); 
   setPlaying(true)
    // console.log("error loader....", e)
    /* set loader to true*/
  };
  
  const onVideoLoadStart = () => {
    setLoader(true); // Video loading has started, show loader
  };

  const togglePlayback = () => {
    setPlaying(!isPlaying);
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
    <View style={styles.rootContainer}>
    <View style={{flex: 1}}>
       <CustomHeader showImage showBack />
      <View style={[styles.container, {position: 'relative'}]}>
        <SwiperFlatList
          horizontal={true}
          data={users}
          showPagination={true}
          paginationActiveColor={colors.Green}
       
          viewabilityConfig={viewabilityConfig}
          renderItem={({item, index}) =>
            item.type === 'video/mp4' ? (              
              <View>
                <TouchableOpacity onPress={togglePlayback}>
                <Video
                  source={{uri : item.originalurl}}
                  ref={videoRef}
                  onBuffer={onBuffer}
                  onError={onError}
                  style={{height: getHeight(), width: width}}
                  resizeMode="contain"
                  muted
                  paused={!isPlaying}
                  onLoadStart={onVideoLoadStart}
                  onLoad={onLoad}
                  
                ></Video>
                {!isPlaying && <View style={{position:'absolute',top:"48%",left:"44%"}}>                 
                <Image source={IMAGES.PLAY_ICON} style={styles.playIcon} />
                </View>}
                </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.White,
    //  height:height,
    flex: 1,
  },
  container: {
    flex: 1
  },
  playIcon: {
    // position: 'absolute',
    width:50,
    height:50,
    resizeMode:'contain',
    // top: '52%',
    // left: '45%',
  },
});
export default PreviewChallenge;
