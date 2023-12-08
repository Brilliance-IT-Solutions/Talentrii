import react, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image,ScrollView} from 'react-native';
import colors from '../../assets/themes/colors';
import CustomInput from '../common/TextInput/CustomInput';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import axiosManager from '../../helpers/axiosHandler';
import {APIs} from '../../constants/api';
import CustomHeader from '../customHeader/customHeader';
import RootContainer from '../rootContainer/rootContainer';
const Comments = () => {
  const route = useRoute();
  const [comments, setComments] = useState([]);
  const challengeId = route.params.challengeId;
  const {
    control,
    register,
    resetField,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    async function getComments() {
      try {
        const commentsData = await axiosManager.post(
          APIs.BASE_URL + '/getcommentChallenge',
          {challengeId: challengeId},
        );

        setComments(commentsData.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    getComments();
  }, [route.params.challengeId]);

  const onSignUpClick = async data => {
    let param = {
      challengeId: challengeId,
      comments: data.comment,
    };
    try {
      const response = await axiosManager.post(
        APIs.BASE_URL + '/commentChallenge',
        param,
      );
      if (response.data) {
        setComments(prev => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const cancel = () => {
    resetField('comment', {
      keepTouched: false,
      keepDirty: false,
      keepError: false,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.White,paddingBottom:5}}>
      <CustomHeader showImage showBack />
      <RootContainer>
      <Text
        style={{
          color: colors.Black,
          fontWeight: '700',
          fontSize: 18,
          marginHorizontal: 30,
        }}>
        Comments
      </Text>
      <CustomInput
        control={control}
        name={'comment'}
        placeholder="Enter your comment......"
        multiline={true}
        rules={{
          required: 'comments can not be empty',
        }}></CustomInput>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <TouchableOpacity onPress={handleSubmit(onSignUpClick)}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.White,
                backgroundColor: colors.Green,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}>
              submit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <TouchableOpacity onPress={cancel}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.White,
                backgroundColor: colors.Grey,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}>
              cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     {comments.length > 0 ? (
        comments?.map((item,index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 5,
              }}>
              <View style={{paddingHorizontal: 10, borderRadius: 50}}>
                <Image
                  source={{
                    uri:
                     item.profileImage !== 'undefined'
                        ? item.profileImage
                        : 'https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png',
                  }}
                  height={40}
                  width={40}
                  style={{borderRadius: 50}}></Image>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Text>{item.emailId}</Text>
                <Text>{item.comments}</Text>
              </View>
            </View>
          );
        })
      ) : (
        <Text style={{textAlign: 'center'}}>No Comments yet</Text>
      )}

    </RootContainer>
    </View>
  );
};

export default Comments;
