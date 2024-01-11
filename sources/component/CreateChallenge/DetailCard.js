import react from 'react';
import { View,Text, Image,StyleSheet } from 'react-native';
import { IMAGES } from '../../constants/images';
import ParagraphContainer from '../common/Paragraph/paragraph';
import colors from '../../assets/themes/colors';
import ButtonComponent from '../common/Buttons/buttonComponent';
import fontFamily from '../../style/fontFamily';
const DetailCard = ({txt,heading}) =>{
    return(
        <View style={{flex:1,backgroundColor:colors.White,padding:10,elevation:1}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
           <Text style={{color:colors.Black,fontFamily:fontFamily.medium}}>Date:21 dec</Text>
           <View style={{flexDirection:'row'}}>
           <Image source={IMAGES.ELLIPSE_IMAGE1} style={{width:20,height:20,resizeMode:"contain"}}/>
           <Image source={IMAGES.ELLIPSE_IMAGE2} style={{width:20,height:20,resizeMode:"contain"}}/>
           <Image source={IMAGES.ELLIPSE_IMAGE3} style={{width:20,height:20,resizeMode:"contain"}}/>
           <Image source={IMAGES.ELLIPSE_IMAGE4} style={{width:20,height:20,resizeMode:"contain"}}/>
           </View>
           </View>
          {heading && <Text style={{
                marginLeft: 0,
                marginRight: 0,
                textAlign: 'left',
                fontSize: 10,
                paddingTop: 5,
                color: colors.Icon,
                fontFamily:fontFamily.regular
              }}>{heading}</Text>}
           <ParagraphContainer txt={txt}  numberOfLines={0}
              textstyle={{
                marginLeft: 0,
                marginRight: 0,
                textAlign: 'left',
                fontSize: 10,
                paddingTop: 0,
                paddingBottom: 5,
                color: colors.Icon
              }}/>
            <View style={{flexDirection:'row'}}>
            <ButtonComponent
              title={'2 Video'}
              buttonStyle={styles.btnStyle}
              textStyle={styles.textStyle}
            />
            <ButtonComponent
              title={'1 Image'}
              buttonStyle={styles.btnStyle}
              textStyle={styles.textStyle}
            /><ButtonComponent
            title={'3 files'}
            buttonStyle={styles.btnStyle}
            textStyle={styles.textStyle}
          />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle:{
        backgroundColor:colors.Green,
        borderRadius:50,
          marginVertical:0,
          paddingHorizontal:6,
          paddingVertical:3,
          marginHorizontal:5
         },
         textStyle:{
     color:colors.White,
     fontSize:10,
     marginTop:1,
     marginBottom:0
         }
  });
export default DetailCard;