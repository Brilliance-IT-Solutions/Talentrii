import {Text, View} from 'react-native';
import CustomHeader from '../../component/customHeader/customHeader';
import colors from '../../assets/themes/colors';
import RootContainer from '../../component/rootContainer/rootContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NotificationComponent from '../../component/Notification/Notification';
const NotificationScreen = () => {
  return (
    <View style={{backgroundColor: colors.White, flex: 1}}>
      <CustomHeader showBack title={'Alerts'} />
      <RootContainer>
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
        <NotificationComponent
          notification={
            'It is a long established fact that a reader will be distracted by the readable content of a page'
          }
        />
      </RootContainer>
    </View>
  );
};
export default NotificationScreen;
