import React from 'react';
import {StyleSheet, View} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import {RouterNames} from '../../constants/routeNames';
import {Dimensions} from 'react-native';
import { ToastMessage } from '../../constants/toasterConstants';
import { width } from '../../style/responsiveSize';
import {showSuccess,showError} from '../common/toaster/toaster';
const CreateChallenegeComponent = ({props}) => {
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
    };

    if (param.title !== '') {
      if (param.description !== '') {
        if (param.url.length > 0) {
          navigation.navigate(RouterNames.PREVIEW_CHALLENGE_SCREEN, {
            data: JSON.stringify(param),
          });
        } else {
        
          showError(ToastMessage.REQUIRED_MEDIA)
          return;
        }
      } else {
        showError(ToastMessage.REQUIRED_DESCRIPTION)
        return;
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
          {/*<InputContainer
                        placeholder='Video Link'
                        maxLength={100}
                    />
                    <InputContainer
                        placeholder='Location'
                        maxLength={100}
                    />
    */}

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
