import React from 'react';
import AppNavigator from './navigator';
import {SafeAreaView} from 'react-native';

function AppRoot() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppNavigator />
    </SafeAreaView>
  );
}

export default AppRoot;
