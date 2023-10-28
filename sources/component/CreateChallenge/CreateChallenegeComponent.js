import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../../assets/themes/colors';
import InputContainer from '../common/TextInput/textInput';
import CustomHeader from '../customHeader/customHeader';
import RootContainer from '../rootContainer/rootContainer';
import CustomFooter from '../customHeader/footer';
import PopupComponent from '../common/Buttons/popupComponent';
import TittleHeader from '../customHeader/tittleHeader';
import {staticConstant} from '../../constants/staticData/staticConstant';
import EndDate from '../common/Date/EndDate';
import Time from '../common/time/Time';
import Images from '../common/images/Images';
import Location from '../common/location/Location';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {APIs} from '../../constants/api';
import axiosManager from '../../helpers/axiosHandler';
import ButtonComponent from '../common/Buttons/buttonComponent';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {RouterNames} from '../../constants/routeNames';
import {Enums} from '../../constants/Enum/enum';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const CreateChallenegeComponent = ({props}) => {
  const toast = useToast();
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

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  }
  const createChallengeApi = async () => {
    const param = {
      title: title,
      description: description,
      url: images,
      latitude: location,
      longitude: location,
      from_date: moment(startdate).utc().format('YYYY-MM-DD'),
      to_date: moment(enddate).utc().format('YYYY-MM-DD'),
      time: moment(time).format('HH:mm:ss'),
    };

    navigation.navigate('previewChallenge', {
      data: JSON.stringify(param),
    });

    // if (param.title !== '') {
    //   if (param.description !== '') {
    //     if (param.url.length > 0) {
    //       navigation.navigate('previewChallenge', {
    //         data: JSON.stringify(param),
    //       });
    //     } else {
    //       toast.show('please select atleast one image/video', {
    //         type: 'danger',
    //         placement: 'top',
    //         duration: 3000, 
    //         animationType: 'slide-in',
    //       });
    //       return;
    //     }
    //   } else {
    //     toast.show("description cann't be empty", {
    //       type: 'danger',
    //       placement: 'top',
    //       duration: 3000,
    //       animationType: 'slide-in',
    //     });
    //     return;
    //   }
    // } else {
    //   toast.show("title cann't be empty", {
    //     type: 'danger',
    //     placement: 'top',
    //     duration: 3000,
    //     animationType: 'slide-in',
    //   });
    //   return;
    // }
  };

  const navigatePage = index => {
    var link = RouterNames.HOME_SCREEN;
    switch (index) {
      case Enums.HomeIconRedirection.HOME:
        link = RouterNames.HOME_SCREEN;
        break;
      case Enums.ChallengeIconRedirection.CREATE_CHALLENGE_SCREEN:
        (link = 'challenge'), {screen: 'createChallengeScreen'};
        break;
      case Enums.HomeIconRedirection.PROFILE:
        link = RouterNames.PROFILE_SCREEN;
        break;
      default:
        break;
    }
    navigation.navigate(link);
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
              title="Preview Challenge"
              onPressFunc={createChallengeApi}
            />
          </View>
        </View>
      </RootContainer>
      <PopupComponent
        title={staticConstant.Popup.icon}
        addComponent={AddComponents}
      />
      {/* <View
        style={{
          position: 'absolute',
          bottom: 0,
        }}>
        <CustomFooter
          didTapped={index => {
            navigatePage(index);
          }}
        />
      </View> */}
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
