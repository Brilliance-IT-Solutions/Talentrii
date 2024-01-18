import react,{useState,useEffect,useRef}from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import fontFamily from '../../style/fontFamily';
import axiosManager from '../../helpers/axiosHandler';
import { APIs } from '../../constants/api';
import SwiperFlatList from 'react-native-swiper-flatlist';
import DoubleTap from 'react-native-double-tap'
import Video from 'react-native-video'
import FastImage from 'react-native-fast-image';

const ShowChallengeDetail = () => {
  const route = useRoute();
  const challengeId = route.params.challengeId
  const navigation = useNavigation()
    const [state, setState] = useState({
        showDialog: false,
        challengeDetail:[]
    });
    const { showDialog,challengeDetail } = state;

    const updateState = data => setState(state => ({ ...state, ...data }));
    const data=[
        {key: 'Amandeep requested to become an Topper !!'},
        {key: 'Sandeep commented on challenge'},
        {key: 'Deep uploaded videos'}
      ]

      const navigationPage =()=>{
        navigation.navigate(RouterNames.CHALLENGE_SCREEN)
      }

      const videoRef = useRef(null);

      const viewabilityConfig = {
        itemVisiblePercentThreshold: 95,
        waitForInteraction: true,
      };
    
      const onBuffer = e => {
        console.log('buffering....');
      };
      const onError = e => {
        // console.log("error released....", e)
      };
      const onLoad = e => {
        // console.log("play")
        // console.log("error loader....", e)
        /* set loader to true*/
      };
    
      const onLoadStart = e => {
        //  console.log("..............")
      };
    
      // Handle visibility changes of videos
      const onViewableItemsChanged = ({index}) => {
          // setVisibleVideos(index);
      };

      async function getChallenges() {
        try {
          const challenges = await axiosManager.post(
            APIs.BASE_URL + APIs.GET_ALL_CHALLENGE_BY_CHALLENGEID,
            {challengeId: challengeId},
          );
          updateState({challengeDetail:challenges.data[0]})
          //  setuserProfileDetail(challenges.data)
  
        } catch (error) {
          console.log(error.response.data);
        }
      }
      
    useEffect(()=>{
      getChallenges()
    },[route.params.challengeId])
  
    const doubleTap = async challengeId => {
      // setTap(true)
      let param = {
        challengeId: challengeId,
        status: true,
      };
      try {
        const response = await axiosManager.post(
          APIs.BASE_URL + APIs.LIKE_CHALLENGE,
          param,
        );
        if (response.data.message === 'Liked Success') {
          // setTap(true);
          // getChallenges();
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
  

    const formatDate = (value) => {
      const date = new Date(value);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' }); // Use short month name
      const year = date.getFullYear();
      
      const formattedDate = `${day} ${month}, ${year}`;
      return formattedDate.toString()
    };
    const renderItem = ({item, index}) => {
      return (
        <>
          <DoubleTap
            onSingleTap={() => {
              console.log('single tap!');
            }}
            onDoubleTap={() => doubleTap(item.challenge_id)}
            delay={0}>
            {item.type === 'video/mp4' ? (
              <View
                style={{
                  width:width/1.07,
                  height: '100%',
                  backgroundColor: colors.Black,
                  borderRadius:20,
                }}>
               
              <Video
                  source={{uri: item.original_url}}
                  ref={videoRef}
                  onLoadStart={onLoadStart}
                  onBuffer={onBuffer}
                  onError={onError}
                  onLoad={onLoad}
                  preload={'metadata'}
                  repeat
                  paused={false}
                  
                  style={{width: '100%', height: '100%',borderRadius:20}}
                  resizeMode="cover"
                  muted
                  autoplay
                  removeClippedSubviews={true}
                  progress={true}
                /> 
              </View>
            ) : (
              <View
                style={{
                  width: width/1.07,
                  height: "100%",
                  backgroundColor: colors.Black,
                  borderRadius:20

                }}>
                <FastImage
                  style={{
                    width: '100%',
                    height: '100%',
                   resizeMode:'contain',
                    backgroundColor: colors.Black,
                  borderRadius:20

                  }}
                  source={{
                    uri: item.original_url,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
             </View>
            )}
          </DoubleTap>
        </>
      );
    };
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
              userName={'Created By'}
              location={challengeDetail?.userDetail?.firstName}
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
                  Start date:  {formatDate(challengeDetail?.challlengeDetail?.startDate)}
                </Text>
                <Text style={{fontSize: 8, paddingTop: 2,color:colors.Black,fontFamily:fontFamily.medium}}>
                  End date: { formatDate(challengeDetail?.challlengeDetail?.endDate)}
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
              {/* <Image
                source={IMAGES.RECTANGLE_IMAGE}
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              /> */}
                  <SwiperFlatList
          data={challengeDetail?.inner}
          pagingEnabled={true}
          horizontal
          showPagination={challengeDetail?.inner?.length > 1 ? true : false}
          paginationActiveColor={colors.White}
          viewabilityConfig={viewabilityConfig}
          onChangeIndex={onViewableItemsChanged}
          removeClippedSubviews={true}
          initialScrollIndex={0}
          maxToRenderPerBatch={1}
          renderItem={renderItem}
          paginationStyle={{
            backgroundColor:colors.grey,
            borderRadius:20,
            alignItems:'center',
            paddingHorizontal:7,
           }}
           paginationStyleItem ={{
             width:5,
             height:5,
             marginHorizontal:1.5,
           }}
           decelerationRate={'fast'}
           disableintervalmomentum={true}   
          keyExtractor={(item, index) => index.toString()}></SwiperFlatList>
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
              {challengeDetail.comments && challengeDetail.comments.length>0 ? (challengeDetail?.comments?.map((item,index)=>{
              <Text style={styles.commentStyle} key={item.id}>
                {item.comments}
              </Text>
              })):(<Text style={{flex:1,textAlign:'center'}}>No comments yet</Text>)}
            </View>
          </View>

          <View>
            <Text style={{fontFamily:fontFamily.medium, color: colors.Black,paddingVertical:10}}>
              Description
            </Text>
            <ParagraphContainer
              txt={
                challengeDetail?.challlengeDetail?.description
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
