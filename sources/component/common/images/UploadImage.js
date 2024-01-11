import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {useState} from 'react';
import colors from '../../../assets/themes/colors';
import DocumentPicker from 'react-native-document-picker';
import {showError} from '../toaster/toaster';
import {ToastMessage} from '../../../constants/toasterConstants';
import {Controller} from 'react-hook-form';
import Label from '../label/label';
import Icon from 'react-native-vector-icons/AntDesign';
import style from '../../../style/styles';

const UploadImage = ({
  control,
  name,
  placeholder,
  label,
  onChildStateChange,
  rules
}) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);

  const [loader, setLoader] = useState(false);

  const videoPlayer = useRef(null);

  useEffect(() => {
    onChildStateChange(selectedFile);
  }, [selectedFile,onChildStateChange]);

  // const onPress = ()=>{
  //   if(!!onPressIcon()){
  //     openImagePicker()

  //   }
  // }
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
      const maxVideoCount = 5;
      const maxImageSize = 2 * 1024 * 1024;
      const maxVideoSize = 5 * 1024 * 1024;

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
        showError(ToastMessage.UNSUPPORTED_FILE);
      } else {
        setLoader(false);
        setSelectedImage(response.map((file) => file.name));
        setSelectedFile(response)
      }
    } catch (error) {
      console.log(error);
      if (DocumentPicker.isCancel(error)) {
        console.log('closed picker');
      } else {
        showError(ToastMessage.MEDIA_ERROR);
        setLoader(false);
      }
    }
  };

  // const handleEvent = i => {
  //   const newItems = [...selectedImage];
  //   newItems.splice(i, 1);
  //   setSelectedImage(newItems);
  // };

  const files = ()=>{
    if(selectedImage.length > 0){
    return selectedImage?.map(obj => obj.name).join(", ");
    }
   
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View>
          {label && <Label title={label}></Label>}
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <TextInput
              style={[
                style.textBoxes,
                style.leftStandardPadding,
                {flex: 1, position: 'relative', paddingLeft: 20,paddingRight:30,height: 50,borderColor:colors.White},
              ]}
              value={selectedImage.join(', ')}
              onBlur={onBlur}
             
              placeholder={placeholder} inputMode='none' ></TextInput>

            <TouchableOpacity
              style={{marginBottom: 20}}
              onPress={openImagePicker}
              hitSlop={{top: 20, bottom: 20, left: 30, right: 20}}>
              <View style={{position: 'absolute', right: 30}}>
                <Icon name={'upload'} size={15} color={colors.Green} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
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
export default UploadImage;
