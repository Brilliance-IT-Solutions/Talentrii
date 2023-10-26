import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {useState} from 'react';
import colors from '../../../assets/themes/colors';
import {IMAGES} from '../../../constants/images';
import Video from 'react-native-video';
import {APIs} from '../../../constants/api';
import axios from 'axios';
import {getToken} from '../../../../sources/utils/GenericFunction';
import DocumentPicker from 'react-native-document-picker';
import {useToast} from 'react-native-toast-notifications';
import Spinner from 'react-native-loading-spinner-overlay';

const Images = ({onChildStateChange}) => {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState([]);
  const [loader, setLoader] = useState(false);

  const videoPlayer = useRef(null);

  useEffect(() => {
    onChildStateChange(selectedImage);
  }, [selectedImage, onChildStateChange]);

  const openImagePicker = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
        allowMultiSelection: true,
        copyTo: 'documentDirectory',
      });

      const selectedFiles = response.map(result => result);
      setLoader(true);
      const maxImageCount = 5;
      const maxVideoCount = 2;
      const maxImageSize = 2 * 1024 * 1024;
      const maxVideoSize = 10 * 1024 * 1024;

      let imageCount = 0;
      let videoCount = 0;
      let invalidFiles = [];

      for (const file of selectedFiles) {
        if (file.type.startsWith('image/')) {
          imageCount++;
          if (imageCount > maxImageCount || file.size > maxImageSize) {
            invalidFiles.push(file);
          }
        } else if (file.type.startsWith('video/')) {
          videoCount++;
          if (videoCount > maxVideoCount || file.size > maxVideoSize) {
            invalidFiles.push(file);
          }
        }
      }

      if (invalidFiles.length > 0) {
        const messgae = `File count exceeds allowed limits is upto 5 images and 2 videos and File size of image upto 2mb and for videos 10mb`;
        toast.show(messgae, {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          animationType: 'slide-in',
        });
        setLoader(false);
      } else {
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
          formData.append('files', file);
        });
        const url = APIs.BASE_URL + APIs.UPLOAD_IMAGE;

        const token = await getToken();
        await axios
          .post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: token,
            },
          })
          .then(res => {
            console.log('====================================');
            console.log('Success!', res.data.response.urls);
            // console.log('Success!', res.data.response.message);
            toast.show(res.data.response.message, {
              type: 'success',
              placement: 'top',
              duration: 3000,
              animationType: 'slide-in',
            });
            // console.log(res.data.response.urls)
            setSelectedImage(res.data.response.urls);
            setLoader(false);

            console.log('====================================');
          })
          .catch(error => {
            // console.log(`The error we're getting from the backend--->${error.response.data.response.message}`),
            toast.show(error.response.data.response.message, {
              type: 'success',
              placement: 'top',
              duration: 3000,
              animationType: 'slide-in',
            });
            setLoader(false);
          });
      }
    } catch (error) {
      console.log(error);
      if (DocumentPicker.isCancel(error)) {
        console.log('closed picker');
      } else {
        console.log('some error occured while uploading media files ');
      }
    }
  };

  const handleEvent = i => {
    const newItems = [...selectedImage];
    newItems.splice(i, 1);
    setSelectedImage(newItems);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {selectedImage &&
          selectedImage?.map((image, i) => {
            return (
              <View style={{position: 'relative'}} key={i}>
                {image?.type === 'video/mp4' ? (
                  <View style={{borderRadius: 10, height: 100}}>
                    <Video
                      source={{uri: image.thumbnailurl}}
                      controls={false}
                      style={styles.backgroundVideo}
                      ref={videoPlayer}
                      pause={true}
                      resizeMode={'cover'}
                    />
                    <Image source={IMAGES.PLAY_ICON} style={styles.playIcon} />
                  </View>
                ) : (
                  <Image
                    source={{uri: image.thumbnailurl}}
                    style={{
                      borderRadius: 10,
                      marginHorizontal: 10,
                      marginBottom: 10,
                    }}
                    resizeMode="contain"
                    width={100}
                    height={100}
                  />
                )}
                <TouchableOpacity
                  onPress={() => handleEvent(i)}
                  style={styles.deleteContainer}>
                  <Image
                    source={IMAGES.DELETE_ICON}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            );
          })}

        <View style={{marginHorizontal: 10}}>
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.imageContainer}>
            <View style={[{alignItems: 'center', marginVertical: 18}]}>
              <Text style={{fontSize: 40, color: colors.Black}}>{'+'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner
            visible={loader}
            textContent={'Please Wait Media Uploading...'}
            textStyle={{
              textAlign: 'center',
              color: colors.Grey,
              fontSize: 13,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  deleteContainer: {
    position: 'absolute',
    zIndex: 999,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 35 / 2,
    alignItems: 'center',
    flex: 1,
    padding: 4,
  },
  deleteIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  playIcon: {
    marginVertical: 35,
    marginHorizontal: 50,
    flex: 1,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
export default Images;
