import React, {useEffect} from 'react';
import {AppProvider} from './src/redux/store';
import AppNavigator from './src/navigator';
import {AsyncStorage} from '@react-native-community/async-storage';

function App() {
  useEffect(() => {
    // getMyStringValue();
  }, []);

  getMyStringValue = async () => {
    try {
      const users = await AsyncStorage.getItem('@MyApp_user');
      console.log('users: ', users);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
