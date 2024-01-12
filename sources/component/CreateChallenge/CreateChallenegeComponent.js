import React, {useEffect, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../../assets/themes/colors';
import CustomHeader from '../customHeader/customHeader';
import RootContainer from '../rootContainer/rootContainer';
import UploadImage from '../common/images/UploadImage';
import Location from '../common/location/Location';
import {useState} from 'react';
import ButtonComponent from '../common/Buttons/buttonComponent';
import {useNavigation} from '@react-navigation/native';
import {ToastMessage} from '../../constants/toasterConstants';
import {showError,showSuccess} from '../common/toaster/toaster';
import style from '../../style/styles';
import {ToggleContext} from '../../context/privacy/context';
import {APIs} from '../../constants/api';
import axiosManager from '../../helpers/axiosHandler';
import PrivacyComponent from '../common/privacy/Privacy';
import {useForm} from 'react-hook-form';
import CustomInput from '../common/TextInput/CustomInput';
import DatePickerComponent from '../common/Date/Datepicker';
import TimePicker from '../common/time/Time';
import CustomRadio from '../common/radio/Radio';
import fontFamily from '../../style/fontFamily';
import { getToken } from '../../utils/GenericFunction';
import axios from 'axios';
import moment from 'moment';
import { RouterNames } from '../../constants/routeNames';

const CreateChallenegeComponent = ({props}) => {
  const {isToggled} = useContext(ToggleContext);
  const navigation = useNavigation();

  // const [form, setForm] = React.useState({})
  // const [errors, setErrors] = React.useState({})

  // const onChange = ({ name, value }) => {

  //     setForm({ ...form, [name]: value });
  //     if (value !== '') {
  //         setErrors(prev => {
  //             return { ...prev, [name]: null }
  //         })
  //     } else {
  //         setErrors(prev => {
  //             return { ...prev, [name]: name + ' is required' }
  //         })
  //     }
  // };
  const [images, AddImages] = useState([]);
  const [startdate, setStartDateValue] = useState(new Date());
  const [enddate, setEndDateValue] = useState(startdate);
  const [dropdownData, setDropdownData] = useState([]);
  const [showDatepicker, setShowDatePicker] = useState(false);
  const [showEndDatepicker, setShowEndDatePicker] = useState(false);
  const [setStartTime, setStartTimeValue] = useState(new Date());
  const [setEndTime, setEndTimeValue] = useState(new Date());
  const [showStartTimepicker, setShowStartTimePicker] = useState(false);
  const [showEndTimepicker, setShowEndTimePicker] = useState(false);
  const [error, setError] = useState(false);

  const data = [{value: 'Break'}, {value: 'Joinees'}];
  const dropdownelement = [
    {id: 1, title: 'test'},
    {id: 2, title: 'testds'},
    {id: 3, title: 'testdsvv'},
  ];

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
    defaultValues: {},
  });

  const updateState = data => setShowDatePicker(data);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     callApi();
  //   }, []),
  // );

  // const callApi = async () => {
  //   const url = APIs.BASE_URL + APIs.CHALLENGE_PRIVACY;
  //   let param = {};
  //   try {
  //     await axiosManager.get(url, param).then(res => {
  //       const privacy = res.data[0].privacy;
  //       setIPrivacyVal(privacy);
  //       if (privacy === '1') {
  //         setIsPrivate(true);
  //       } else {
  //         setIsPrivate(false);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  useEffect(() => {
    const fetchapi = async () => {
      const url = APIs.BASE_URL + APIs.GET_PURPOSE_CHALLENGE;
      try {
        const response = await axiosManager.post(url);
        if (response.data) {
          setDropdownData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchapi();
  }, []);

  const handleChildStateChange = newValue => {
    AddImages(newValue);
  };

  const CreateChallenge = async data => {
    if (images.length < 1) {
      setError(true);
      return;
    }
    if (data) {
      const formData = new FormData();
       images.forEach((file, index) => {
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
           const urls = APIs.BASE_URL + APIs.CREATE_CHALLENGE;
           if(res?.data?.response?.urls?.length > 0){
           let param = {
             title: data?.title,
             description: data?.description,
             url: res?.data?.response.urls,
             latitude: '',
             longitude: '',
             startDate: moment(data?.startDate).utc().format('YYYY-MM-DD'),
             endDate:  moment(data?.endDate).utc().format('YYYY-MM-DD'),
             startTime:  moment(data?.startTime).format('HH:mm:ss'),
             category:data?.category,
             endTime:  moment(data?.endTime).format('HH:mm:ss'),
             location:data?.location.toString(),
             privacy:data?.privacy.toString()
            //  privacy:data?.privacy !== undefined && data?.privacy === true ? "public" : "private"
           }

           await axiosManager
             .post(urls, param)
             .then(res => {
               showSuccess(res.message)
               navigation.navigate(RouterNames.HOME_SCREEN);
             }).catch(error => {

               showError(error.response.data.response.message)
             });
           }else{
             showError(ToastMessage.REQUIRED_MEDIA)

              return
           }

         })
         .catch(error => {
           showError(error.response.data.response.message)
         });
    } else {
      showError(ToastMessage.REQUIRED_FIELDS);
      return;
    }
  };

  return (
    <View style={styles.rootContainer}>
      <CustomHeader showBack title={'Create Challenge'} />

      <RootContainer>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 18,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: colors.Black,
              fontFamily: fontFamily.semiBold,
              paddingVertical: 5,
            }}>
            Mandatory Information
          </Text>
          <View>
            <PrivacyComponent control={control} name={'privacy'} />
          </View>
        </View>

        <View>
          <CustomInput
            control={control}
            name={'title'}
            placeholder={'Enter Title'}
            label={'Title'}
            rules={{
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title should have atleast 3 characters',
              },
            }}
          />
        </View>
        <View>
          <UploadImage
            onChildStateChange={handleChildStateChange}
            control={control}
            name={'url'}
            label={'Upload'}
            placeholder={
              'You Can Upload 1 Media Atleast (5 Max Images, Max Videos)'
            }
          />
          {error && (
            <Text
              style={[
                styles.leftStandardPadding,
                {
                  color: 'red',
                  alignSelf: 'stretch',
                  marginHorizontal: 36,
                  fontSize: 11,
                  fontFamily: fontFamily.medium,
                },
              ]}>
              {'Please upload atleast 1 image/video'}
              {error}
            </Text>
          )}
        </View>
        <View>
          <CustomRadio
            control={control}
            name={'category'}
            data={dropdownData}
            label={'Category'}
            defaultValue={'Break'}
          />
        </View>
        <View>
          <CustomInput
            control={control}
            name={'description'}
            placeholder={'Enter Description'}
            label={'Description'}
            multiline={true}
            rules={{
              required: 'Description is required',
              minLength: {
                value: 4,
                message: 'Description should have atleast 4 characters',
              },
            }}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 18,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: colors.Black,
              fontFamily: fontFamily.semiBold,
              paddingVertical: 5,
            }}>
            Optional Information
          </Text>
          <View>
            <PrivacyComponent control={control} name={'privacy'} />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 18}}>
          <View style={{flex: 1, marginRight: 20}}>
            <DatePickerComponent
              control={control}
              name={'startDate'}
              value={startdate}
              onChange={setStartDateValue}
              minimumDate={new Date()}
              isVisible={showDatepicker}
              onPress={() => setShowDatePicker(prev => !prev)}
              label={'Start Date'}
              style={{backgroundColor: colors.White}}
              styleIcon={colors.Icon}
              iconColor={colors.Green}
            />
          </View>
          <View style={{flex: 1, marginLeft: 20}}>
            <DatePickerComponent
              control={control}
              name={'endDate'}
              value={enddate}
              onChange={setEndDateValue}
              minimumDate={new Date()}
              isVisible={showEndDatepicker}
              onPress={() => setShowEndDatePicker(prev => !prev)}
              label={'End Date'}
              style={{backgroundColor: colors.Green}}
              styleIcon={colors.White}
              iconColor={colors.White}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 18}}>
          <View style={{flex: 1, marginRight: 20}}>
            <TimePicker
              control={control}
              name={'startTime'}
              value={setStartTime}
              onChange={setStartTimeValue}
              minimumDate={new Date()}
              isVisible={showStartTimepicker}
              onPress={() => setShowStartTimePicker(prev => !prev)}
              label={'Start Time'}
              style={{backgroundColor: colors.White}}
              styleIcon={colors.Icon}
              iconColor={colors.Green}
            />
          </View>
          <View style={{flex: 1, marginLeft: 20}}>
            <TimePicker
              control={control}
              name={'endTime'}
              value={setEndTimeValue}
              onChange={setEndTimeValue}
              minimumDate={new Date()}
              isVisible={showEndTimepicker}
              onPress={() => setShowEndTimePicker(prev => !prev)}
              label={'End Time'}
              style={{backgroundColor: colors.Green}}
              styleIcon={colors.White}
              iconColor={colors.White}
            />
          </View>
        </View>

        <View>
          <Location
            control={control}
            name={'location'}
            placeholder={'select location'}
            dropdowndata={dropdownelement}
            label={'Location'}
            rules={{
              required: 'location is required',
            }}
          />
        </View>
        <ButtonComponent
          title={'submit'}
          onPressFunc={handleSubmit(CreateChallenge)}
          buttonStyle={style.btnStyle}
          textStyle={style.textStyle}
          width={'90%'}
        />
      </RootContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.White,
    //  height:height,
    flex: 1,
  },
});

export default CreateChallenegeComponent;
