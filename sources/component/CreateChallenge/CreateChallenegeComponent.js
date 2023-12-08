import React, { useEffect,useContext } from 'react';
import {StyleSheet, View,TextInput,Text} from 'react-native';
import colors from '../../assets/themes/colors';
import InputContainer from '../common/TextInput/textInput';
import CustomHeader from '../customHeader/customHeader';
import RootContainer from '../rootContainer/rootContainer';
import PopupComponent from '../common/Buttons/popupComponent';
import TittleHeader from '../customHeader/tittleHeader';
import {staticConstant} from '../../constants/staticData/staticConstant';
import EndDate from '../common/Date/EndDate';
import Time from '../common/time/Time';
import Images from '../common/images/Images';
import Location from '../common/location/Location';
import {useState} from 'react';
import ButtonComponent from '../common/Buttons/buttonComponent';
import moment from 'moment';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RouterNames} from '../../constants/routeNames';
import {Dimensions} from 'react-native';
import { ToastMessage } from '../../constants/toasterConstants';
import { width } from '../../style/responsiveSize';
import {showSuccess,showError} from '../common/toaster/toaster';
import style from '../../style/styles';
import { ToggleContext } from '../../context/privacy/context';
import { APIs } from '../../constants/api';
import axiosManager from '../../helpers/axiosHandler';

const CreateChallenegeComponent = ({props}) => {
  const { isToggled } = useContext(ToggleContext);
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
  const [addImage, setAddImage] = useState(false);
  const [addStartDate, setStartDate] = useState(false);
  const [addEndDate, setEndDate] = useState(false);
  const [addLocation, setLocation] = useState(false);
  const [addTime, setTime] = useState(false);
  const [minimumDate, setminimumDate] = useState(false);
  const [images, AddImages] = useState([]);
  const [title, addTitle] = useState('');
  const [description, addDescription] = useState('');
  const [location, setLocationValue] = useState('');
  const [startdate, setStartDateValue] = useState(new Date());
  const [enddate, setEndDateValue] = useState(startdate);
  const [time, setTimeValue] = useState(new Date());
  const [privacy , setIsPrivate] = useState(false)
  const [privacyVal, setIPrivacyVal] = useState(false)

  useFocusEffect(
    React.useCallback(()=>{
      callApi()
  },[]),
  )

  const callApi = async () =>{
    const url = APIs.BASE_URL + '/privacy'
    let param = {
    }
    try{
    await axiosManager.get(url, param).then((res)=>{
      const privacy = res.data[0].privacy
      setIPrivacyVal(privacy)
      if(privacy === "1"){
        setIsPrivate(true)
      }else{
        setIsPrivate(false)
      }
    })
  }
  catch(error){
    console.log(error.response.data)
  }
  }


  const updateParentVariable = value => {
    setStartDate(value);
    setEndDate(value);
  };

  // const updateParentVariable2 = value => {
  //   setEndDate(value);
  // };

  const updateParentVariable3 = value => {
    setLocation(value);
  };

  const updateParentVariable4 = value => {
    setTime(value);
  };

  const handleChildStateChange = newValue => {
    AddImages(newValue);
  };

  const AddComponents = item => {
    if (item === 'add image') {
      setAddImage(true);
    } else if (item === 'add startDate') {
      setStartDate(true);
      setEndDate(true);
    }
    //  else if (item === 'add endDate' && addStartDate) {
    //   setEndDate(true);
    // }
    else if (item === 'add time') {
      setTime(true);
    } else if (item === 'add location') {
      setLocation(true);
    } else {
      return;
    }
  };

  const privacyChallenge = () =>{
    navigation.navigate(RouterNames.PRIVACY)
  }

  const previewChallenge = async () => {
    const param = {
      title: title,
      description: description,
      url: images,
      latitude: location ? location : '',
      longitude: location? location : '',
      from_date: moment(startdate).utc().format('YYYY-MM-DD'),
      to_date: moment(enddate).utc().format('YYYY-MM-DD'),
      time: moment(time).format('HH:mm:ss'),
      // privacy:privacyVal
   
    };

    if (param.title !== '') {
       if(param.title.length >= 4){
      if (param.description !== '') {
        if(param.description.length >= 5){
        if (param.url.length > 0) {
          navigation.navigate(RouterNames.PREVIEW_CHALLENGE_SCREEN, {
            data: JSON.stringify(param),
          });
        } else {
          showError(ToastMessage.REQUIRED_MEDIA)
          return;
        }
      }else{
        showError('Description should of 5 characters')
        return
      }
      }else {
        showError(ToastMessage.REQUIRED_DESCRIPTION)
        return;
      }
    }else{
      showError('Title should of 4 characters')
      return
    }
    } else {
      showError(ToastMessage.REQUIRED_TITLE)
      return;
    }
  };

  if (!props.data && !addStartDate) return null;

  return (
    <View style={styles.rootContainer}>
      <CustomHeader showImage showBack />
      <TittleHeader title={staticConstant.createChallenge.titleHeader} />

      <RootContainer>
        <View style={{marginTop: 20}}>
          <InputContainer
            placeholder="Title"
            maxLength={30}
            onChangeText={title => addTitle(title)}
          />
          <InputContainer
            placeholder="Description"
            maxLength={120}
            needMultilie={true}
            noLines={4}
            onChangeText={description => addDescription(description)}
          />
          <View style={{position:'relative'}}>
             <TextInput 
             inputMode='none'
            placeholder="Challenge Privacy"
            style={[style.textBoxes, style.leftStandardPadding, {height:50}
             ]}
           onPressOut={privacyChallenge}
           
          />
          <View  style={{position:'absolute', right:40, marginVertical:25}}>
            <Text>{privacy === false ? 'public' : 'private'}</Text>
          </View>
          </View>

{/* ///////////////  START DATE ////////////////////////////////// */}
          {addStartDate && props.data === 'upcoming' && (
            <View>
              <EndDate
                title={staticConstant.Date.startDate}
                minimumDate={new Date()}
                updateParent={updateParentVariable}
                onChange={date => {
                  setminimumDate(date);
                  setStartDateValue(date);
                }}
              />
            </View>
          )}

          {addStartDate && props.data === 'past' && (
            <View>
              <EndDate
                title={staticConstant.Date.startDate}
                updateParent={updateParentVariable}
                onChange={date => {
                  setminimumDate(date)
                  setStartDateValue(date);
                }}
              />
            </View>
          )}
          
{/* ///////////////  END DATE ////////////////////////////////// */}

          {addStartDate && props.data === 'upcoming' && (
            <View>
              <EndDate
                title={staticConstant.Date.endDate}
                minimumDate={minimumDate}
                updateParent={updateParentVariable}
                onChange={date => setEndDateValue(date)}
              />
            </View>
          )}

          {addStartDate && props.data === 'past' && (
            <View>
              <EndDate
                title={staticConstant.Date.endDate}
                minimumDate={minimumDate}
                updateParent={updateParentVariable}
                onChange={date => setEndDateValue(date)}
              />
            </View>
          )}

          {addLocation && (
            <View>
              <Location
                updateParent={updateParentVariable3}
                onChangeText={location => setLocationValue(location)}
              />
            </View>
          )}
          {addTime && (
            <View>
              <Time
                title={staticConstant.Time.timer}
                updateParent={updateParentVariable4}
                onChange={time => setTimeValue(time)}
              />
            </View>
          )}
          {addImage && (
            <View style={{width: width}}>
              <Images onChildStateChange={handleChildStateChange} />
            </View>
          )}
          <View style={{paddingBottom: 10}}>
            <ButtonComponent
              title={staticConstant.Button.title}
              onPressFunc={previewChallenge}
            />
          </View>
        </View>
      </RootContainer>
        <View style={{position:'absolute',bottom:0,right:0,padding:15}}>
      <PopupComponent
        title={staticConstant.Popup.icon}
        addComponent={AddComponents}
      />
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
});

export default CreateChallenegeComponent;
