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
import {useNavigation} from '@react-navigation/native';
import {RouterNames} from '../../constants/routeNames';
import Spinner from 'react-native-loading-spinner-overlay';
import {getToken} from '../../utils/GenericFunction';
import axios from 'axios';
import { ToastMessage } from '../../constants/toasterConstants';
import { showError, showSuccess } from '../common/toaster/toaster';
import CustomLoader from '../common/loader/loader';


const {width} = Dimensions.get('window');

const PreviewChallenge = () => {
  const videoRef = useRef(null)
  const route = useRoute();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isCurrent, setCurrent] = useState(false);
  const [currentRenderVideoIndex, setCurrentRenderVideoIndex] = useState(0);

  const [control, setControl] = useState(false);

  const data =
    route.params.data.length > 0 ? JSON.parse(route.params.data) : '';
  const users = data.url
  // [{"originalurl": "https://dutchuppblob.s3.amazonaws.com/originals/183271%20%28720p%29.mp4", "thumbnailurl": "https://dutchuppblob.s3.amazonaws.com/thumbnails/183271%20%28720p%29.mp4", "type": "video/mp4"},{"originalurl": "https://dutchuppblob.s3.amazonaws.com/originals/183271%20%28720p%29.mp4", "thumbnailurl": "https://dutchuppblob.s3.amazonaws.com/thumbnails/183271%20%28720p%29.mp4", "type": "video/mp4"},{"originalurl": "https://dutchuppblob.s3.amazonaws.com/originals/183271%20%28720p%29.mp4", "thumbnailurl": "https://dutchuppblob.s3.amazonaws.com/thumbnails/183271%20%28720p%29.mp4", "type": "video/mp4"}];
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
    if (data) {
       const formData = new FormData();
        data.url.forEach((file, index) => {
          formData.append('files', file);
        });
        setLoader(true)
        const url = APIs.BASE_URL + APIs.UPLOAD_IMAGE;

        const token = await getToken();
        await axios
          .post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: token,
            },
          })
          .then( async res => {

            console.log('====================================');
            console.log('Success!', res.data.response.urls);

            const urls = APIs.BASE_URL + APIs.CREATE_CHALLENGE;
            if(res.data.response.urls.length > 0){

            let param = {
              title: data.title,
              description: data.description,
              url: res.data.response.urls,
              latitude: data.location ? data.location : '',
              longitude:  data.location ?data.location :'',
              from_date: data.from_date,
              to_date: data.to_date,
              time: data.time,
            }

            await axiosManager
              .post(urls, param)
              .then(res => {
                setLoader(false)
                showSuccess(res.message)
                navigation.navigate(RouterNames.HOME_SCREEN);
              }).catch(error => {

                setLoader(false)
                showError(error.response.data.response.message)
              });
            }else{
              setLoader(false)
              showError(ToastMessage.REQUIRED_MEDIA)

               return 
            }
      
          })
          .catch(error => {
            // console.log(`The error we're getting from the backend--->${error.response.data.response.message}`),
            showError(error.response.data.response.message)

            setLoader(false);
          });

    } else {
      showError(ToastMessage.REQUIRED_FIELDS)
      return;
    }
  };

  return (
    <>
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
                  source={{uri : item.fileCopyUri}}
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
                source={{uri: item.fileCopyUri}}
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
        <CustomLoader isLoading={loader}/>
    </View>
        </>
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
