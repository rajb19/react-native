/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import GoogleSignIn from './src/GoogleSignIn';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    return () => {};
  }, []);

  return (
    <SafeAreaView>
      <GoogleSignIn />
    </SafeAreaView>
  );
};

export default App;
