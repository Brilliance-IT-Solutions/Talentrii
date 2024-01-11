import react,{useState,useEffect} from 'react'
import { Text, View } from "react-native";
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

const ShowChallenges = () =>{
  const navigation = useNavigation();
  const [option, setOption] = useState([]);

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

      const navigateTo = () =>{
        navigation.navigate(RouterNames.SHOW_CHALLNEGE_DETAIL)
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
        <CustomRadio control={control} name={"category"} data={option} onSelect={(value) => setOption(value)} defaultValue={"Break"} search={true}/>
        <Text style={{color:colors.Black,marginHorizontal:15,marginVertical:10,fontFamily:fontFamily.semiBold}}>Past Challenges</Text>
        <CardComponent onPressFunc={navigateTo}/>
        <CardComponent/>
        <CardComponent/>

        <Text style={{color:colors.Black,marginHorizontal:15,marginVertical:10,fontFamily:fontFamily.semiBold}}>Upcoming Challenges</Text>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>

        </RootContainer>
    </View>
)
}

export default ShowChallenges;