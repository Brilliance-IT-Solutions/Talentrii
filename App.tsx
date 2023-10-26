/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './sources/navigation/navigator';
import GlobalProvider from './sources/context/Provider';
import { ToastProvider } from 'react-native-toast-notifications';
function App(): JSX.Element {
  return (
    <GlobalProvider>
      <ToastProvider>
        <Navigation />
        </ToastProvider>
    </GlobalProvider>
  );
}



export default App;
