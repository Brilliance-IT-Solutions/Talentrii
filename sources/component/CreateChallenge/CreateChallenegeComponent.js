import React from 'react';
import {StyleSheet, View} from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';


const CreateChallenegeComponent = () => {
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

  const handleChildStateChange = (newValue) => {
    console.log(newValue);
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

  return (
    <View style={styles.rootContainer}>
      <CustomHeader showImage showBack />
      <TittleHeader title={staticConstant.createChallenge.titleHeader} />

      <RootContainer>
        <View style={{marginTop: 20}}>
          <InputContainer placeholder="Title" maxLength={30} />
          <InputContainer
            placeholder="Description"
            maxLength={120}
            needMultilie={true}
            noLines={4}
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

          {addStartDate && (
            <View>
              <EndDate
                title={staticConstant.Date.startDate}
                minimumDate={new Date()}
                updateParent={updateParentVariable}
                onChange={date => setminimumDate(date)}
              />
            </View>
          )}

          {addStartDate && (
            <View>
              <EndDate
                title={staticConstant.Date.endDate}
                minimumDate={minimumDate}
                updateParent={updateParentVariable}
                onChange={date => console.log(date)}
              />
            </View>
          )}
          {addLocation && (
            <View>
              <Location updateParent={updateParentVariable3} />
            </View>
          )}
          {addTime && (
            <View>
              <Time
                title={staticConstant.Time.timer}
                updateParent={updateParentVariable4}
                onChange={date => console.log(date)}
              />
            </View>
          )}
          {addImage && (
            <View>
              <Images onChildStateChange={handleChildStateChange}/>
            </View>
          )}
        </View>
      </RootContainer>
      <PopupComponent
        title={staticConstant.Popup.icon}
        addComponent={AddComponents}
      />
      {/* <View style={{
         position: 'absolute',
    bottom: 0,
      }}> */}
      <CustomFooter/>
      {/* </View>/ */}
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
