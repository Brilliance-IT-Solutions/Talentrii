import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {useState} from 'react';
import colors from '../../../assets/themes/colors';
import {IMAGES} from '../../../constants/images';
import {openPicker} from '@baronha/react-native-multiple-image-picker';
import Video from 'react-native-video';

const Images = ({onChildStateChange}) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const videoPlayer = useRef(null);

  useEffect(() => {
    onChildStateChange(selectedImage);
  }, [selectedImage, onChildStateChange]);

  const openImagePicker = async () => {
    const options = {
      mediaType: 'all',
      isPreview: true,
      isExportThumbnail: true,
      allowedVideo: true,
      multiple: true,
    };

    const response = await openPicker(options);
    console.log(response);

    if (response.length > 0) {
      setSelectedImage(response);
    }
  };

  const handleEvent = i => {
    const newItems = [...selectedImage];
    newItems.splice(i, 1);
    setSelectedImage(newItems);
  };

  return (
    <View
      style={styles.container}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {selectedImage &&
          selectedImage.map((image, i) => {
            return (
              <View style={{position: 'relative'}} key={image.position}>
                {image?.mime === 'video/mp4' ? (
                  <View style={{height: 100, width: 115, borderRadius: 10}}>
                    <Video
                      source={{uri: image.path}}
                      controls={false}
                      style={styles.backgroundVideo}
                      ref={videoPlayer}
                      pause={true}
                    />
                    <Image
                      source={IMAGES.PLAY_ICON}
                      style={styles.playIcon}
                    />
                  </View>
                ) : (
                  <Image
                    source={{uri: image.path}}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row', 
    marginVertical: 20,
     marginHorizontal: 20
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
  deleteIcon:{
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  playIcon:{
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
