import React from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IMAGES } from '../../constants/images';
import styles from '../../style/styles';
import { getToken } from '../../utils/GenericFunction';
import { AuthContext } from '../../context/context'

const SplashScreen = ({ navigation }) => {

  const { signIn, signOut } = React.useContext(AuthContext);

  React.useEffect(() => {

    async function getTokenStatus() {
      let token = await getToken()
      if (token == null) {
        signOut()
      } else {
        signIn()
      }
    }
    setTimeout(() => {
      getTokenStatus()
    }, 1500)
  })

  return (

      <SafeAreaView style={styles.screen}>
        <View>
          <Image style={styles.centerLogo}
            source={IMAGES.SPLASH_SCREEN_LOGO}
            resizeMode="contain" />
        </View>
      </SafeAreaView>

  );
};
export default SplashScreen;
