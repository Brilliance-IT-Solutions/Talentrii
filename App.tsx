/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './sources/navigation/navigator';
import GlobalProvider from './sources/context/Provider';
function App(): JSX.Element {
  return (
    <GlobalProvider>
        <Navigation />
    </GlobalProvider>
  );
}



export default App;
