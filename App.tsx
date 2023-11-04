/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './sources/navigation/navigator';
import GlobalProvider from './sources/context/Provider';
import FlashMessage from 'react-native-flash-message';
import  ToggleProvider  from './sources/context/privacy/context';
function App(): JSX.Element {
  return (
    <GlobalProvider>
      <ToggleProvider>
        <Navigation />
         <FlashMessage position="top" />
         </ToggleProvider>
    </GlobalProvider>
  );
}



export default App;
