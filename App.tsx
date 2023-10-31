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

function App(): JSX.Element {
  return (
    <GlobalProvider>
        <Navigation />
         <FlashMessage position="top" />
    </GlobalProvider>
  );
}



export default App;
