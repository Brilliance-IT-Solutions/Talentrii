import react,{useState}from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import colors from '../../assets/themes/colors';
import CustomHeader from '../customHeader/customHeader';
import MultiLineContainer from '../common/2LineText/multiLineText';
import RootContainer from '../rootContainer/rootContainer';
import ButtonComponent from '../common/Buttons/buttonComponent';
import {StyleSheet} from 'react-native';
import UserProfile from '../common/profile/profile';
import {IMAGES} from '../../constants/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileIconCount from '../common/profile/iconCount';
import {width} from '../../style/responsiveSize';
import ParagraphContainer from '../common/Paragraph/paragraph';
import DetailCard from '../CreateChallenge/DetailCard';
import CustomDialog from '../common/dialog/CustomDialog';
import CommentCard from '../CreateChallenge/CommentCard';
import { RouterNames } from '../../constants/routeNames';
import { useNavigation } from '@react-navigation/native';
import fontFamily from '../../style/fontFamily';

const ShowChallengeDetail = () => {
  const navigation = useNavigation()
    const [state, setState] = useState({
        showDialog: false
    });
    const { showDialog } = state;

    const updateState = data => setState(state => ({ ...state, ...data }));
    const data=[
        {key: 'Amandeep requested to become an Topper !!'},
        {key: 'Sandeep commented on challenge'},
        {key: 'Deep uploaded videos'}
      ]

      const navigationPage =()=>{
        navigation.navigate(RouterNames.CHALLENGE_SCREEN)
      }
  return (
    <View style={{flex: 1, backgroundColor: colors.White}}>
      <CustomHeader
        showBack
        title={'Details'}
        showClose
        rightIcon={'plus'}
        colorRightIcon={colors.Green}
        styleBox={true}
        containerStyle={{
          borderWidth: 5,
          borderColor: colors.Green,
          borderRadius: 20,
        }}
        navigationPage={navigationPage}
      />
      <RootContainer>
        <View style={{marginHorizontal: 10}}>
          <View style={{flexDirection: 'row'}}>
            <MultiLineContainer
              txt1={'App Design'}
              txt2={'Task manager ui kit'}
            />
            <ButtonComponent
              title={'Break Challenge'}
              buttonStyle={styles.btnStyle}
              textStyle={styles.textStyle}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <UserProfile
              userName={'Created by'}
              location={'Adom Shaifi'}
              imageSource={IMAGES.USER_DEFAULT_ICON}
              height={50}
              width={50}
              userNameTextStyle={{fontSize: 10, color: colors.Icon}}
              locationTextStyle={{
                fontSize: 14,
                color: colors.Black,
                paddingVertical: 2,
              }}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: colors.Green,
                  padding: 8,
                  borderRadius: 20,
                }}>
                <Icon
                  name={'calendar-month-outline'}
                  size={20}
                  color={colors.White}
                />
              </View>
              <View style={{flexDirection: 'column', paddingLeft: 5}}>
                <Text style={{fontSize: 8, paddingBottom: 2,color:colors.Black,fontFamily:fontFamily.medium}}>
                  Start date: 20 Dec, 2023
                </Text>
                <Text style={{fontSize: 8, paddingTop: 2,color:colors.Black,fontFamily:fontFamily.medium}}>
                  End date: 30 Dec, 2023
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                height: 150,
                borderColor: colors.lightGrey,
                width: '100%',
              }}>
              <Image
                source={IMAGES.RECTANGLE_IMAGE}
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              />
            </View>
            <ProfileIconCount style={{justifyContent: 'space-between'}} />
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View>
                <Text style={{color: colors.Black, fontFamily:fontFamily.medium,fontSize:14}}>
                  Comments:
                </Text>
              </View>
              <TouchableOpacity onPress={()=>updateState({showDialog: true})}>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: 7,
                  textDecorationLine: 'underline',
                  fontFamily:fontFamily.regular
                }}>
                See All
              </Text>
              </TouchableOpacity>
              <CustomDialog
                visible={showDialog}
                headingDate={'21 Dec, 2023'}
                onPress={() => updateState({ showDialog: false })}>
                <View style={{maxHeight:300,marginVertical:10}}>
                <ScrollView>
               <CommentCard title={'Video Title:'} description={'It is a long established fact that a reader will be distracted.'}/>
               <CommentCard title={'Video Title:'} description={'It is a long established fact that a reader will be distracted.'}/>
               <CommentCard title={'Video Title:'} description={'It is a long established fact that a reader will be distracted.'}/>
               <CommentCard title={'Video Title:'} description={'It is a long established fact that a reader will be distracted.'}/>
               </ScrollView>
               </View>
            </CustomDialog>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.commentStyle}>
                It is a long established fact that a reader
              </Text>
              <Text style={styles.commentStyle}>
                It is a long established fact that a reader
              </Text>
              <Text style={styles.commentStyle}>
                It is a long established fact that a reader
              </Text>
              <Text style={styles.commentStyle}>
                It is a long established fact that a reader
              </Text>
            </View>
          </View>

          <View>
            <Text style={{fontFamily:fontFamily.medium, color: colors.Black,paddingVertical:10}}>
              Description
            </Text>
            <ParagraphContainer
              txt={
                'It is a long established fact that a reader will be distracted by the readable content, It is a long established fact that a reader. It is a long established fact that a reader will be distracted by the readable content, It is a long established fact that a reader.'
              }
              numberOfLines={0}
              textstyle={{
                marginLeft: 0,
                marginRight: 0,
                textAlign: 'left',
                fontSize: 10,
                paddingTop: 5,
                paddingBottom: 5,
                color: colors.Icon,
                fontFamily:fontFamily.regular
              }}
            />
          </View>

          <View>
            <View style={{flexDirection:"row",justifyContent:'space-between',paddingVertical:10}}>
            <Text style={{color:colors.Green,fontFamily:fontFamily.medium}}>History/Journey:</Text>
            <View style={{flexDirection:'row',alignItems:'center',borderWidth:1,borderRadius:3,borderColor:colors.Filterborder,padding:3}}>
            <Icon
                  name={'filter-outline'}
                  size={8}
                  color={colors.FilterIcon}
                />
            <Text style={{fontSize:8,color:colors.FilterIcon,fontFamily:fontFamily.medium}}>Filters</Text>
            </View>
            </View>
            <View>
            <DetailCard txt={'It is a long established fact that a reader will be distracted by the readable content, It is a long established fact that a reader.'}/>
            <DetailCard txt={"Join my challenge (weight loss for next 40 days, intermittent fasting etc)"} heading={'Break my challenge (20 pushups in 10 seconds etc) '}/>
            </View>

            <View style={{paddingTop:10,paddingBottom:30}}>
            <Text style={{color:colors.Black,fontFamily:fontFamily.medium,paddingVertical:10}}>Activities</Text>
         {data.map((item,index) =>
         (<View key={index}>
        <Text style={{fontSize:10,color:colors.Black,fontFamily:fontFamily.regular}}>{`\u2022 ${item.key}`}</Text>
        </View>)
         )}
        
            </View>
          </View>
        </View>
      </RootContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.CommentBox,
    borderRadius: 50,
    marginVertical: 0,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginHorizontal: 0,
  },
  textStyle: {
    color: colors.lightBlack,
    fontSize: 10,
    marginVertical: 0,
  },
  commentStyle: {
    backgroundColor: colors.CommentBox,
    color: colors.Black,
    fontSize: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
    paddingVertical: 2,
    fontWeight: '700',
    marginRight: 5,
    marginBottom: 5,
    fontFamily:fontFamily.regular
  },
});
export default ShowChallengeDetail;
