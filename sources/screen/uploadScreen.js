import react,{useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MultiLineContainer from '../component/common/2LineText/multiLineText';
import colors from '../assets/themes/colors';
import {getTopMargin} from '../utils/GenericFunction';
import {IMAGES} from '../constants/images';
import IconCont from '../component/common/IconCount/iconCount';
import {useForm} from 'react-hook-form';
import CustomInput from '../component/common/TextInput/CustomInput';
import Checkbox from '../component/common/checkbox/Checkbox';
import style from '../style/styles';
import ButtonComponent from '../component/common/Buttons/buttonComponent';
import RootContainer from '../component/rootContainer/rootContainer';
import fontFamily from '../style/fontFamily';
import DocumentPicker from 'react-native-document-picker';

const UploadFile = () => {
    const [selectedFile,setSelectedFile] = useState([]);
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

  const uploadFile = async data => {
    console.log(data);

  };

  const openPicker = async () => {
    try{
    const response = await DocumentPicker.pick({
      type: [DocumentPicker.types.images, DocumentPicker.types.video],
      allowMultiSelection: true,
      copyTo: 'documentDirectory',
    });

    const selectedFiles = response.map(result => result);
    console.log(selectedFiles);
    setSelectedFile(selectedFiles)
  }  catch (error) {
    if (DocumentPicker.isCancel(error)) {
      console.log('closed picker');
    } else {
      // showError(ToastMessage.MEDIA_ERROR);
      // setLoader(false);
    }
  }
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.White}}>
      <RootContainer>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginHorizontal: 18,
            marginTop: getTopMargin(),
            marginBottom: 10,
          }}>
          <MultiLineContainer
            txt1={'Upload your Live Content on daily basis'}
            txt2={
              'It is a long established fact that a reader will be distracted by the readable content, It is a long established fact that a reader.'
            }
            fontSizetxt1={16}
            fontSizetxt2={10}
          />
        </View>

        <TouchableOpacity onPress={openPicker}>
          <View
            style={{
              alignItems: 'center',
              padding: 50,
              marginHorizontal: 18,
              marginVertical: 15,
              borderRadius: 20,
              borderWidth: 1,
              borderStyle: 'dashed',
            }}>
            <IconCont imageSource={IMAGES.GALLERY} width={30} height={30} label={'Upload Live Content'} onIconPress={openPicker}/>
          </View>
        </TouchableOpacity>

        <View>
          <CustomInput
            control={control}
            name={'title'}
            placeholder={'Enter Title'}
            label={'Title'}
            rules={{
                required: 'title is required',
            }}
          />
          <CustomInput
            control={control}
            name={'description'}
            placeholder={'Enter Description'}
            label={'Description'}
            rules={{
                required: 'description is required',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // flex: 1,
            marginHorizontal: 18,
          }}>
          <Checkbox
            control={control}
            name="topper"
            label={'Request to become a topper'}
          />
          <ButtonComponent
            title={'Upload'}
            onPressFunc={handleSubmit(uploadFile)}
            buttonStyle={style.btnStyle}
            textStyle={style.textStyle}
            icon={true}
            iconName={'upload'}
          />
        </View>
      </RootContainer>
    </View>
  );
};

export default UploadFile;
