import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {useState} from 'react';
import colors from '../../../assets/themes/colors';
import {IMAGES} from '../../../constants/images';
import Video from 'react-native-video';
import DocumentPicker from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { showError } from '../toaster/toaster';
import { ToastMessage } from '../../../constants/toasterConstants';
import CustomLoader from '../loader/loader';

const Images = ({onChildStateChange}) => {
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
        setLoader(false);
        showError(ToastMessage.UNSUPPORTED_FILE)
      } else {
        setLoader(false);
        setSelectedImage(response)
      }
    } catch (error) {
      console.log(error);
      if (DocumentPicker.isCancel(error)) {
        console.log('closed picker');
      } else {
        showError(ToastMessage.MEDIA_ERROR)
        setLoader(false);
      };
      }
    
    }
  

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
                      source={{uri: image.fileCopyUri}}
                      controls={false}
                      style={styles.backgroundVideo}
                      ref={videoPlayer}
                      poster={image.fileCopyUri}
                      posterResizeMode="cover"
                      paused={true}
                      resizeMode={'cover'}
                    />
                    <Image source={IMAGES.PLAY_BUTTON_ICON} style={styles.playIcon} />
                  </View>
                ) : (
                  <Image
                    source={{uri: image.fileCopyUri}}
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
      </View>
        <CustomLoader isLoading={loader}/>
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
