import React,{useEffect, useState} from 'react';
import { Image, View,Text,TouchableOpacity } from 'react-native'
import { IMAGES } from '../../constants/images';
import ButtonComponent from '../common/Buttons/buttonComponent';
import InputContainer from '../common/TextInput/textInput';
import CustomHeader from '../customHeader/customHeader';
import TittleHeader from '../customHeader/tittleHeader';
import RootContainer from '../rootContainer/rootContainer';
import styles from './styles'
import { staticConstant } from '../../constants/staticData/staticConstant';
import CustomInput from '../common/TextInput/CustomInput';
import {useFieldArray,useForm} from 'react-hook-form';
import DatePickerComponent from '../common/Date/Datepicker';
import { useRoute } from '@react-navigation/native';
import axiosManager from '../../helpers/axiosHandler';
import { APIs } from '../../constants/api';
import moment from 'moment';
import { getUser } from '../../utils/GenericFunction';
import { showError, showSuccess } from '../common/toaster/toaster';
import DocumentPicker from 'react-native-document-picker';
import { ToastMessage } from '../../constants/toasterConstants';
import { getToken } from '../../utils/GenericFunction';
import axios from 'axios';

const UpdateProfileComponent = () => {
    const [selectedImage, setSelectedImage] = useState([]);
    const [userProfileImage,setUserProfileImage]= useState('')
    const [state, setState] = useState({
        showDatePicker: false,
      });
      const {showDatePicker} = state;
    
      const updateState = data => setState(state => ({...state, ...data}));
    const {
        control,
        register,
        resetField,
        getValues,
        setValue,
        handleSubmit,
        formState: {errors},
      } = useForm({
        mode: 'onChange',
        defaultValues: {
            // fields:[]
        },
      });

      const getuserDetail = async () => {
          try {              
        const data = await getUser();
        const userDetailID = data ? JSON.parse(data) : '';
        if(userDetailID.id){
            const response = await axiosManager.post(
              APIs.BASE_URL + '/getUserDetailById',
              {userId:+userDetailID.id},
            );
            setInputValues(response.data);
            setUserProfileImage(response.data.profileImage)
        }else{
            return
        }
          } catch (error) {
            console.log(error);
          }
        
      };
    
      useEffect(() => {
        getuserDetail();
      }, []);


      const setInputValues = data => {
        const { firstName, lastName, userName , emailId, contact,DOB } = data;
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('userName', userName);
        setValue('emailId', emailId);
        setValue('contact', contact);
        setValue('DOB', DOB);
    };

      
      const updateProfile = async (data) => {
        if (data) {
            const formData = new FormData();
            selectedImage.forEach((file, index) => {
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
               .then( async res => {
     
                 console.log('====================================');
                 console.log('Success!', res.data.response.urls);
                //  const profileUrl = res.data.response.urls.reduce((result, currentObject) => ({
                //     ...result,
                //     ...currentObject
                //   }), {});
        const profileUrl = { ...res.data.response.urls[0]};
        const url = APIs.BASE_URL + '/updateProfile'
        const DOB = data.DOB
        let param = {
            firstName : data.firstName,
            lastName : data.lastName,
            userName : data.userName,
            emailId : data.emailId,
            profileImage : profileUrl.originalurl,
            contact : data.contact,
            DOB : moment(DOB).utc().format('YYYY-MM-DD'),
        }
           await axiosManager.patch(url, param).then((response)=>{
               showSuccess(response.data.message)

           }).catch(error =>
               showError(error.response.data.response.message)
           )
           })
      }
    }

      const openImagePicker = async () => {
        try {
          const response = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
            allowMultiSelection: true,
            copyTo: 'documentDirectory',
          });
    
          const selectedFiles = response.map(result => result);
        //   setLoader(true);
          const maxImageCount = 1;
          const maxImageSize = 2 * 1024 * 1024;
    
          let imageCount = 0;
          let invalidFiles = [];
    
          for (const file of selectedFiles) {
              imageCount++;
              if (imageCount > maxImageCount || file.size > maxImageSize) {
                invalidFiles.push(file);
              }
          }
    
          if (invalidFiles.length > 0) {
            // setLoader(false);
            showError(ToastMessage.UNSUPPORTED_FILE)
          } else {
            // setLoader(false);
            setSelectedImage(response)
            setUserProfileImage('')
          }
        } catch (error) {
          console.log(error);
          if (DocumentPicker.isCancel(error)) {
            console.log('closed picker');
          } else {
            showError(ToastMessage.MEDIA_ERROR)
            // setLoader(false);
          };
          }
        
        }
    return (
        <View style={styles.rootContainer}>
            <CustomHeader showImage showBack/>
            <TittleHeader title={staticConstant.UpdateProfile.btnTitle}/>
            <RootContainer>
                <View style={styles.rootContainer}>
                    <View style={styles.imageViewContainer}>
                        {selectedImage.map((item,index)=>(
                        <View key={index} >
                        <Image 
                        style={styles.imgaeView}
                        source={{uri : item.fileCopyUri }} 
                        resizeMode='contain'
                       />
                        </View>
                        ))
                    }

                    {userProfileImage && (
                    <View>
                    <Image 
                     style={styles.imgaeView}
                    source={{uri : userProfileImage }} 
                    resizeMode='contain'
                    />
                    </View>)
                    }

                  {userProfileImage === '' && selectedImage.length < 0 && (
                    <View>
                    <Image 
                     style={styles.imgaeView}
                    source={{uri : 'https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png' }} 
                    resizeMode='contain'
                    />
                    </View>)
                    }


             <TouchableOpacity onPress={()=>openImagePicker()}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 10, width: 10, marginHorizontal: 5}}
                source={IMAGES.EDIT_ICON}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: 'blue',
                  textDecorationLine: 'underline',
                  fontSize: 10,
                }}>
                Edit
              </Text>
            </View>
          </TouchableOpacity>
                    </View>
                <View style={{marginTop: 40}}>
                <CustomInput control={control} name="firstName" placeholder="Enter First Name" rules={{required: 'First Name is required',}}/>
                <CustomInput control={control} name="lastName" placeholder="Enter Last Name" rules={{required: 'Last Name is required',}}/>
                <CustomInput control={control} name="userName" placeholder="Enter username" rules={{required: 'Username is required',}}/>
                <CustomInput control={control} name="emailId" placeholder="example@email.com" rules={{ required: 'email is required',pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid Email'}}}/>
                <CustomInput control={control} name="contact" placeholder="Enter Mobile No" rules={{ required: 'Mobile No. is required'}}/>
                <DatePickerComponent control={control} name={'DOB'} isVisible={showDatePicker} 
                onPress={setVisible => updateState({showDatePicker: setVisible})} rules={{required: 'DOB is required'}}/>

                <ButtonComponent title="Update Profile" onPressFunc={handleSubmit(updateProfile)} width="70%"/>
                </View>
                </View>
            </RootContainer>
        </View>
    );
};

export default UpdateProfileComponent;