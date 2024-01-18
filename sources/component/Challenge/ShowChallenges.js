import react,{useState,useEffect} from 'react'
import { Text, View,Pressable,StyleSheet } from "react-native";
import styles from "../../style/styles";
import CustomHeader from "../customHeader/customHeader";
import colors from "../../assets/themes/colors";
import RootContainer from "../rootContainer/rootContainer";
import CustomRadio from "../common/radio/Radio";
import {useForm} from 'react-hook-form'
import SearchComponent from '../common/search/Search';
import CardComponent from '../common/card/Card';
import { RouterNames } from '../../constants/routeNames';
import { APIs } from '../../constants/api';
import axiosManager from '../../helpers/axiosHandler';
import { useNavigation } from '@react-navigation/native';
import fontFamily from '../../style/fontFamily';
import { getUser } from '../../utils/GenericFunction';

const ShowChallenges = () =>{
  const navigation = useNavigation();
  const [option, setOption] = useState([]);
  const [PastChallenges, setPastChallenges] = useState([]);
  const [UpcomingChallenges, setUpcomingChallenges] = useState([]);
  const [userId,setUserId] = useState(null)
  const [userOption, setUserOption] = useState("Break");

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
 

      useEffect(() => {
        const fetchapi = async () => {
          const url = APIs.BASE_URL + APIs.GET_PURPOSE_CHALLENGE;
          try {
            const response = await axiosManager.post(url);
            if (response.data) {
              setOption(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchapi();
      }, []);

      const getuserDetail = async () => {
        const data = await getUser();
        const userDetailID = data ? JSON.parse(data) : '';
        setUserId(userDetailID.id)
        fetchChallengeApi(userDetailID.id,"Break")
      };

      
        const fetchChallengeApi = async (userId,userOption) => {
          const url = APIs.BASE_URL + APIs.GET_CHALENGE_BY_USERID;
          let param ={userId:userId}
          try {
            const response = await axiosManager.post(url,param);
            if (response.data) {
              if(userOption === "Break"){
                 setPastChallenges(response.data?.Break?.pastChallenge)
                 setUpcomingChallenges(response.data?.Break?.upcomingChallenge)
              }else{
                setPastChallenges(response.data?.Joinees?.pastChallenge)
                setUpcomingChallenges(response.data?.Joinees?.upcomingChallenge)
              }           
            }
          } catch (error) {
            console.log(error);
          }
        };
      
        useEffect(()=>{
          getuserDetail()
        },[])

        const onSelect = (value) => {
          setUserOption(value);
          fetchChallengeApi(userId ,value)
        };


      const navigateTo = (challengeId) =>{
        navigation.navigate(RouterNames.SHOW_CHALLNEGE_DETAIL,{
          challengeId:challengeId
        })
      }

      const navigationPage = () =>{
        navigation.navigate(RouterNames.CHALLENGE_SCREEN)

      }

  

return(
    <View style={{flex:1,backgroundColor:colors.White}}>
        <CustomHeader showBack title={'Challenges'} showClose rightIcon={'plus-circle-outline'} colorRightIcon={colors.White} styleBox={true} containerStyle={{borderRadius:5,padding:3,
        backgroundColor: colors.Green}} navigationPage={navigationPage}/>
            <SearchComponent control={control} name={"search"} icon={'shield-search'} placeholder={'search'} style={{borderColor:colors.searchborder}}/>
        <RootContainer>
        <View style={{flexDirection:'row',marginHorizontal:10}}>
       {option?.map((item,i) => {
           return (
            <View key={i} style={{flex:1}}>
            <Pressable
            style={
                item.label === userOption ? styless.selected : styless.unselected
            }
            onPress={() => onSelect(item.label)}>
                <View style={{flex:1,alignItems:'center'}} >
            <Text style={[styless.option,{color:item.label === userOption ? colors.White : colors.Icon}]}> {item.title}</Text>
          </View>
          </Pressable>
          </View>
           )
       })
      }
      </View>
        {/* <CustomRadio control={control} name={"category"} data={option} onSelect={(value) => setOption(value)} defaultValue={"Break"} search={true}/> */}
        <Text style={{color:colors.Black,marginHorizontal:15,marginVertical:10,fontFamily:fontFamily.semiBold}}>Past Challenges</Text>

        {PastChallenges?.map((item)=>(
          <View key={item.id}>
          <CardComponent onPressFunc={()=>navigateTo(item.id)} title={item.title} description={item.description}/>
          </View>
        ))}
       
        <Text style={{color:colors.Black,marginHorizontal:15,marginVertical:10,fontFamily:fontFamily.semiBold}}>Upcoming Challenges</Text>
        {UpcomingChallenges?.map((item)=>(
          <View key={item.id}>
          <CardComponent onPressFunc={()=>navigateTo(item.id)} title={item.title} description={item.description}/>
          </View>

        ))}
        </RootContainer>
    </View>
)
}
const styless = StyleSheet.create({
  option: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily:fontFamily.regular
  },
  unselected: {
    backgroundColor: colors.InputBox,
    margin: 5,
    padding: 10,
    borderRadius: 6,
    borderWidth:1,
    borderColor:colors.lightGrey,
  },
  selected: {
    backgroundColor: colors.Green,
    margin: 6,
    padding: 10,
    borderRadius: 6,
  },
});

export default ShowChallenges;